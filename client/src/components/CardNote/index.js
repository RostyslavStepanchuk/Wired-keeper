import React, {Component} from 'react';
import {WiredCard} from 'wired-card';
import Button from '../Button'

class CardNote extends Component {
    render() {
        const {cardNote, onCorrect, onDelete} = this.props;

        return (
            <div className="body__card col-sm-6 col-lg-4">
            <wired-card type={cardNote.type} style={{width:'100%'}}>
                <h1>{cardNote.title}</h1>
                <p>
                    {cardNote.noteText}
                </p>
                <Button
                    title='Correct'
                    onClick={onCorrect}
                />
                <Button
                    title='Delete'
                    onClick={() => onDelete(cardNote)}
                />
            </wired-card>
            </div>
        );
    }
}

export default CardNote;