from datetime import datetime
import json
from sqlalchemy.sql import func
from sqlalchemy import Integer, String

from server import db


# User model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(Integer, primary_key=True)
    name = db.Column(String(50), nullable=False)
    email = db.Column(String(100), unique=True, nullable=False)
    mobile_number = db.Column(String(10), unique=True, nullable=False)
    password = db.Column(String(100), nullable=False)

    def __repr__(self):
        return f"<User {self.name}>"

    def save(self):
        db.session.add(self)
        db.session.commit()

# Incremental ids table
class IdsSequences(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    id_name = db.Column(db.String(20), unique=True, nullable=False)
    last_value = db.Column(db.Integer, nullable=False)

    @classmethod
    def get_incremented_id(cls, table):
        ret_value = 1
        res = db.session.query(IdsSequences).filter(IdsSequences.id_name == table.__table__.name).first()
        if res is None:
            res = db.session.query(table).order_by(table.id.desc()).first()
            if not res is None:
                ret_value = res.id + 1
            db.session.add(IdsSequences(id_name=table.__table__.name, last_value=ret_value))
            db.session.commit()
        else:
            res.last_value += 1
            db.session.commit()
            ret_value = res.last_value
        return ret_value

# Gcode files table
class UploadedFiles(db.Model):
    id = db.Column(db.Integer, db.Sequence("uploaded_id"), primary_key=True, autoincrement=True)
    filename = db.Column(db.String(80), unique=False, nullable=False)
    up_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    edit_date = db.Column(db.DateTime, default=datetime.utcnow)
    last_drawn_date = db.Column(db.DateTime)
    path_length = db.Column(db.Float)
    dimensions_info = db.Column(db.String(150), unique=False)

    def __repr__(self):
        return '<Uploaded file %r>' % self.filename

    def save(self):
        return db.session.commit()

    @classmethod
    def get_full_drawings_list(cls):
        return db.session.query(UploadedFiles).order_by(UploadedFiles.edit_date.desc()).all()

    @classmethod
    def get_random_drawing(cls):
        return db.session.query(UploadedFiles).order_by(func.random()).first()

    @classmethod
    def get_drawing(cls, id):
        return db.session.query(UploadedFiles).filter(UploadedFiles.id == id).first()

# move these imports here to avoid circular import in the GenericPlaylistElement
from server.database.playlist_elements_tables import create_playlist_table, delete_playlist_table, get_playlist_table_class
from server.database.elements_factory import ElementsFactory
from server.database.generic_playlist_element import GenericPlaylistElement

# Playlist table
class Playlists(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False, default="New playlist")
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    edit_date = db.Column(db.DateTime, default=datetime.utcnow)
    # Last time the playlist was edited (to update: datetime.datetime.utcnow())
    version = db.Column(db.Integer, default=0)
    # Incremental version number: +1 every time the playlist is saved

    def save(self):
        self.edit_date = datetime.utcnow()
        self.version += 1
        db.session.commit()

    def add_element(self, elements):
        if isinstance(elements, str):
            elements = json.loads(elements)
        if not isinstance(elements, list):
            elements = [elements]
        for i in elements:
            if "id" in i: 
                # delete old ids to mantain the new sorting scheme (the elements list should be already ordered, for this reason we clear the elements and add them in the right order)
                del i["id"]
            if not isinstance(i, GenericPlaylistElement):
                i = ElementsFactory.create_element_from_dict(i)
            i.save(self._ec())
        db.session.commit()

    def clear_elements(self):
        return self._ec().clear_elements()

    def get_elements(self):
        els = self._ec().get_playlist_elements()
        res = []
        for e in els:
            res.append(ElementsFactory.create_element_from_db(e))
        return res

    def get_elements_json(self):
        els = self.get_elements()
        return json.dumps([e.get_dict() for e in els])

    def to_json(self):
        return json.dumps({
            "name": self.name,
            "elements": self.get_elements_json(),
            "id": self.id,
            "version": self.version
        })
    # returns the database table class for the elements of that playlist
    def _ec(self):
        if not hasattr(self, "_tc"):
            self._tc = get_playlist_table_class(self.id)
        return self._tc

    @classmethod
    def create_playlist(cls):
        item = Playlists()
        db.session.add(item)
        db.session.commit()
        create_playlist_table(item.id)
        return item

    @classmethod
    def get_playlist(cls, id):
        if id is None:
            raise ValueError("An id is necessary to select a playlist")
        try:
            return db.session.query(Playlists).filter(Playlists.id == id).one()
        except:
            return Playlists.create_playlist()

    @classmethod
    def delete_playlist(cls, id):
        item = db.session.query(Playlists).filter_by(id=id).first()
        db.session.delete(item)
        db.session.commit()
        delete_playlist_table(id)

# Flask-Migrate integration comments
# When a modification is applied to the db structure (new table, table structure modification like column name change, new column etc.)
# must use the "flask db migrate" command (with the active environment) (can also use "flask db migrate -m 'Migrate changes message'" to add a description for the migration operation)
# The command will create a new version for the db and will apply the changes automatically when the latest version of the repo is loaded
# with "flask db upgrade" (this command is called automatically during "python setup.py install/develop")
# When testing may get multiple revisions for the same commit. Can merge multiple revisions with "flask db merge <revisions>"