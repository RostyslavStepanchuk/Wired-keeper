import React, {Component} from 'react';
// import {WiredCard, WiredCheckbox} from 'wired-elements';
import Button from '../Button'

import ContentEditable from "react-contenteditable";
import Card from "../common/card";


class CardList extends Card {
    updateList = (evt, target, index) => {
        if (target === 'heading') {
            this.props.cardList.title = evt.target.value;
            this.props.onChange(this.props.cardList)
        }
        if (target === 'listItem') {
            this.props.cardList.listItems[index] = evt.target.value;
            this.props.onChange(this.props.cardList)
        }
    };
    handleCheck = (cardList, index) => {
        this.props.onCheck(cardList, index);
        console.log(cardList);
    };

    render() {
        const {cardList, onSave, onDelete} = this.props;

        return (
            <div className="body__card col-sm-6 col-lg-4">
                <wired-card type={cardList.type} style={{width: '100%'}}>
                    {this.renderTitle(cardList.title)}
                    {this.renderListItems(cardList)}
                    <Button
                        title='Save'
                        onClick={() => onSave(cardList)}
                    />
                    <Button
                        title='Delete'
                        onClick={() => onDelete(cardList)}
                    />
                </wired-card>

            </div>
        );
    }
}

export default CardList;