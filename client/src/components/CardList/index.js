import React, {Component} from 'react';
// import {WiredCard, WiredCheckbox} from 'wired-elements';
import Button from '../Button'


class CardList extends Component {

    render() {
        const {cardList, onCheck, onCorrect, onDelete} = this.props;

        return (
            <div className="body__card col-sm-6 col-lg-4">
            <wired-card type={cardList.type} style={{width:'100%'}}>
                <h1>{cardList.title}</h1>
                {cardList.listItems.map((listItem, index) => (<div className='d-flex'>
                    <wired-checkbox
                        checked={listItem.checked ? 'checked' : null}
                        key={index}
                        onClick={() => onCheck(cardList, index)}
                        style={{whiteSpace: 'normal'}}
                    />
                        <p>{listItem.task}</p>
                </div>))}
                <Button
                    title='Correct'
                    onClick={onCorrect}
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