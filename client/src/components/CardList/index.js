import React, {Component} from 'react';

import PropTypes from 'prop-types'
import Button from '../Button'

// import ContentEditable from "react-contenteditable";
import Card from "../common/card";


class CardList extends Card {
    static propTypes ={
        cardList: PropTypes.object.isRequired,
        onDelete: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired
    };

    state = {
        title: this.props.cardList.title,
        listItems:this.props.cardList.listItems,
        wasUpdated: false
    };

    handleTitleChange = e => {
        this.setState({title: e.target.value, wasUpdated:true});
    };

    handleTaskDescriptionChange = (e, taskIndex) => {
        const listItems = JSON.parse(JSON.stringify(this.state.listItems));
        listItems[taskIndex].task = e.target.value;
        this.setState({listItems, wasUpdated:true})
    };

    handleCheckboxTick = (e, taskIndex) => {
        const listItems = JSON.parse(JSON.stringify(this.state.listItems));
        listItems[taskIndex].checked = !listItems[taskIndex].checked;
        this.setState({listItems}, this.handleSave);
    };

    handleSave = () => {
        const notation = {
            id: this.props.cardList.id,
            title:this.state.title,
            listItems:this.state.listItems,
            type:this.props.cardList.type
        };

      this.props.onSave(notation)
    };


    render() {
        const {cardList, onDelete} = this.props;
        const {title, listItems, wasUpdated} = this.state;

        return (
            <div key={cardList.id} className="body__card col-sm-6 col-lg-4">
                <wired-card type={cardList.type} style={{width: '100%'}}>
                    {this.renderTitle(title)}
                    {this.renderListItems(listItems)}
                    <Button
                        title='Save'
                        disabled={wasUpdated ? null :'disabled'}
                        onClick={this.handleSave}
                    />
                    <Button
                        title='Delete'
                        onClick={() => onDelete(cardList.id, cardList.type)}
                    />
                </wired-card>

            </div>
        );
    }
}

export default CardList;

