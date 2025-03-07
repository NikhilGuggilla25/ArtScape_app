import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';


import './PlaceholderCard.scss';

class PlaceholderCard extends Component{

    render(){
        return <Card className="p-2">
                <div className="border-0 bg-black rounded text-dark clickable hover-zoom square center">
                    <div className="placeholder-container">
                        <Spinner animation="border" className="h-100"/>
                    </div>
                </div>
            </Card>
    }
}

export default PlaceholderCard;