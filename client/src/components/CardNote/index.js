import React, {Component} from 'react';
import {WiredCard} from 'wired-card';

class CardNote extends Component {
    render() {
        return (
            <wired-card>
                <h1>{this.props.title}</h1>
                <p>
                    {this.props.noteText}
                </p>
            </wired-card>
        );
    }
}

export default CardNote;