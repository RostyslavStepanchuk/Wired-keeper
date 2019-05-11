import React, {Component} from 'react';
import {WiredCard, WiredCheckbox} from 'wired-elements';
import Button from '../Button'

class CardList extends Component {

    render() {
        const {cardList,  onCheck, onCorrect, onDelete} = this.props;

        return (
            <wired-card type={cardList.type}>
                <h1>{cardList.title}</h1>
                {cardList.listItems.map((listItem, index) => (<wired-checkbox
                    checked={listItem.checked ? 'checked' : null}
                    key={index}
                    onClick={() => onCheck(cardList, index)}
                >
                    {listItem.task}
                </wired-checkbox>))}
                <Button
                    title='Correct'
                    onClick={onCorrect}
                />
                <Button
                    title='Delete'
                    onClick={() => onDelete(cardList)}
                />
            </wired-card>
        );
    }
}

export default CardList;