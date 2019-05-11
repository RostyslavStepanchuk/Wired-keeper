import React, {Component} from 'react';
import {WiredCard} from 'wired-card';
import Button from '../Button'

class CardNote extends Component {
    render() {
        const {cardNote, onCorrect, onDelete} = this.props;

        return (
            <wired-card type={cardNote.type}>
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
        );
    }
}

export default CardNote;