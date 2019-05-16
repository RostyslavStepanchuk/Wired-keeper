import React, {Component} from 'react';
import Button from '../Button'
import PropTypes from 'prop-types'
// import ContentEditable from "react-contenteditable";

import Card from "../common/card";
// import {WiredCard} from 'wired-card';


class CardNote extends Card {
    static propTypes = {
        cardNote: PropTypes.object.isRequired,
        onDelete: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired
    };

    state = {
        title: this.props.cardNote.title,
        noteText: this.props.cardNote.noteText,
        wasUpdated: false
    };

    handleTitleChange = e => {
        this.setState({title: e.target.value, wasUpdated:true});
    };

    handleTextChange = e => {
        this.setState({noteText: e.target.value, wasUpdated:true});
    };

    handleSave = () => {
        const notation = {
            id: this.props.cardNote.id,
            title:this.state.title,
            noteText:this.state.noteText,
            type:this.props.cardNote.type
        };

        this.props.onSave(notation)
    };

    render() {
        const {cardNote, onDelete} = this.props;
        const {title, noteText, wasUpdated} = this.state;

        return (
            <div key={cardNote.id} className="body__card col-sm-6 col-lg-4">
                <wired-card type={cardNote.type} style={{width: '100%'}}>
                    {this.renderTitle(title)}
                    {this.renderParagraph(noteText)}
                    <Button
                        title='Save'
                        onClick={this.handleSave}
                        disabled={wasUpdated ? null :'disabled'}
                    />
                    <Button
                        title='Delete'
                        onClick={() => onDelete(cardNote.id,cardNote.type)}
                    />
                </wired-card>

            </div>
        );
    }
}

export default CardNote;
