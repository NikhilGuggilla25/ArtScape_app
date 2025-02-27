from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'bf3bbfa3c751'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Existing table creation commands
    op.create_table('playlists',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=80), nullable=False),
        sa.Column('creation_date', sa.DateTime(), nullable=False),
        sa.Column('edit_date', sa.DateTime(), nullable=True),
        sa.Column('elements', sa.String(length=1000), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table('uploaded_files',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('filename', sa.String(length=80), nullable=False),
        sa.Column('up_date', sa.DateTime(), nullable=False),
        sa.Column('edit_date', sa.DateTime(), nullable=True),
        sa.Column('last_drawn_date', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    
    # New User table creation
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=50), nullable=False),
        sa.Column('email', sa.String(length=100), nullable=False, unique=True),
        sa.Column('mobile_number', sa.String(length=10), nullable=False, unique=True),
        sa.Column('password', sa.String(length=100), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    # Existing table removal commands
    op.drop_table('uploaded_files')
    op.drop_table('playlists')
    
    # New User table removal
    op.drop_table('users')
