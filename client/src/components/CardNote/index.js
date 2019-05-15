import React, {Component} from 'react';
import Button from '../Button'
import ContentEditable from "react-contenteditable";

import Card from "../common/card";
import {WiredCard} from 'wired-card';


class CardNote extends Card {

    updateNote = (evt, target) => {
        if (target === 'heading') {
            this.props.cardNote.title = evt.target.value;
            this.props.onChange(this.props.cardNote)
        }
        if (target === 'noteText') {
            this.props.cardNote.noteText = evt.target.value;
            this.props.onChange(this.props.cardNote)
        }
    };

    render() {

        const {cardNote, onSave, onDelete} = this.props;


        return (
            <div className="body__card col-sm-6 col-lg-4">
                <wired-card type={cardNote.type} style={{width: '100%'}}>
                    {this.renderTitle(cardNote.title)}
                    {this.renderParagraph(cardNote.noteText)}
                    <Button
                        title='Save'
                        onClick={() => onSave(cardNote.id)}
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
