import React, {Component} from 'react';

import PropTypes from 'prop-types'
import Button from '../Button'

// import ContentEditable from "react-contenteditable";
import Card from "../common/card";


class CardList extends Card {
    static propTypes ={
        cardList: PropTypes.object.isRequired,
        onCheck: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired
    };

    updateList = (evt, target, index) => {
        if (target === 'heading') {
            this.props.cardList.title = evt.target.value;
            // this.props.onChange(this.props.cardList)
        }
        if (target === 'listItem') {
            this.props.cardList.listItems[index] = evt.target.value;
            // this.props.onChange(this.props.cardList)
        }
    };
    handleCheck = (cardList, index) => {
        this.props.onCheck(cardList, index);
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
                        onClick={() => onSave(cardList.id)}
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

