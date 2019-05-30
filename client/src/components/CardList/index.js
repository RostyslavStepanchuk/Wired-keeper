import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button'

import Card from "../common/card";


class CardList extends Card {
    static propTypes ={
        cardList: PropTypes.object.isRequired,
        onDelete: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired,
        addToDoListItem: PropTypes.func.isRequired,
    };

    state = {
        title: this.props.cardList.title,
        listItems:this.props.cardList.listItems,
        wasUpdated: false,
        focusedItem: null,
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(this.state.listItems.length < nextProps.cardList.listItems.length) {
            this.setState({listItems:nextProps.cardList.listItems})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.listItems.length > prevState.listItems.length) {
            const focusedKey = this.state.focusedItem;
            console.log('FOCUSED KEY', this[focusedKey]);
            if(focusedKey) {
                this[focusedKey].focus();
                this.setState({focusedItem:null})
            }
        }
    }

    handleTitleChange = e => {
        this.setState({title: e.target.value, wasUpdated:true});
    };

    handleTaskDescriptionChange = (e, taskIndex) => {
        const listItems = JSON.parse(JSON.stringify(this.state.listItems));
        listItems[taskIndex].task = e.target.value;
        this.setState({listItems, wasUpdated:true, lastUpdated: taskIndex})
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
            type:this.props.cardList.type,
        };

      this.props.onSave(notation);
      this.setState({wasUpdated:false})
    };

    addNewItem = (e, index, id) => {
        if (e.keyCode !== 13 && e.button !== 0) return;
        e.preventDefault();
        const key = Math.floor(Math.random() * 10000).toString();
        this.setState({focusedItem:key, wasUpdated:true});
        this.props.addToDoListItem(id,index,key)
    };
    deleteThisItem = (e, index, id) => {
        if (e.keyCode !== 13 && e.button !== 0) return;
        e.preventDefault();
        const listItems = [...this.state.listItems];
        listItems.splice(index, 1);
        this.setState({listItems, wasUpdated:true});
        this.props.deleteToDoListItem(id, index)
    };

    setFocusOnItem = (key) => {
        this.setState({focusedItem:key})
};

    refreshFocus = (e) =>{
        setTimeout(()=>this.setState({focusedItem: null}),100)
    };

    render() {
        const {cardList, onDelete} = this.props;
        const {title, listItems, wasUpdated} = this.state;
        return (
            <div
                key={cardList.id}
                className="body__card col-sm-6 col-lg-4">

                <wired-card type={cardList.type}
                            style={{width: '100%'}}
                            onMouseLeave={(e) => this.refreshFocus(e)}
                >

                    {this.renderTitle(title)}
                    <div className="d-flex flex-column">
                    {this.renderListItems(listItems)}
                    </div>
                    <Button
                        title='Save'
                        disabled={wasUpdated ? null :'disabled'}
                        onClick={this.handleSave}
                    />
                    <wired-icon-button
                        style={{'--wired-icon-size' : '12px'}}
                        class='body__card-delete-btn'
                        onClick={() => onDelete(cardList.id, cardList.type)}
                    >close</wired-icon-button>
                </wired-card>

            </div>
        );
    }
}

export default CardList;

