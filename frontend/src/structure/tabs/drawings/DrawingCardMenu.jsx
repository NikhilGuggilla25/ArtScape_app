import React, { Component } from 'react';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { nanoid } from 'nanoid';

class DrawingCardMenu extends Component {
    id = nanoid();

    render() {
        return (
            <div>
                <ContextMenuTrigger id={"menu_" + this.id}>
                    {this.props.children}
                </ContextMenuTrigger>
                <ContextMenu id={"menu_" + this.id}>
                    <MenuItem onClick={() => this.props.onStartDrawing(this.props.drawing.id)}>
                        Start/queue drawing
                    </MenuItem>
                </ContextMenu>
            </div>
        );
    }
}

export default DrawingCardMenu;
