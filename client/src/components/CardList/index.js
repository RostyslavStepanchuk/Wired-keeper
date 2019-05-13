import React, {Component} from 'react';
// import {WiredCard, WiredCheckbox} from 'wired-elements';
import Button from '../Button'

import ContentEditable from "react-contenteditable";


class CardList extends Component {
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

    render() {
        const {cardList, onCheck, onSave, onDelete} = this.props;

        return (
            <div className="body__card col-sm-6 col-lg-4">
                <wired-card type={cardList.type} style={{width: '100%'}}>
                    <ContentEditable
                        innerRef={this.contentEditable}
                        html={cardList.title}
                        onChange={(e) => this.updateList(e, 'heading')}
                        tagName='h1'
                    />
                    {cardList.listItems.map((listItem, index) => (<div className='d-flex'>
                        <wired-checkbox
                            checked={listItem.checked ? 'checked' : null}
                            key={index}
                            onClick={() => onCheck(cardList, index)}
                            style={{whiteSpace: 'normal'}}
                        />
                        <ContentEditable
                            innerRef={this.contentEditable}
                            html={listItem.task}
                            onChange={(e) => this.updateList(e, 'listItem', index)}
                            tagName='p'
                        />
                    </div>))}
                    <Button
                        title='Correct'
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