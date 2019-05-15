import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardList from '../CardList';
import CardNote from '../CardNote';
import {deleteNote, getNotes, updateNote} from '../../services/noteService'; // add getLists and getNotes from services
import {deleteList, getLists, updateList} from "../../services/listService";
import {getNotations} from "../../services/notations";
// import {getLists} from '../../fakeData/fakeLists'
// import {getNotes} from '../../fakeData/fakeNotes'

import './Cards.scss'

class Cards extends Component {
    static propTypes = {
        notations: PropTypes.array.isRequired,
        handleDelete: PropTypes.func.isRequired,
    };

    state = {
        // cardLists: [],
        // cardNotes: [],
        notations: []
    };


    handleCheck = (cardList, ItemIndex) => {
        const originalLists = [...this.state.cardLists];
        const cardLists = [...this.state.cardLists];
        const index = cardLists.indexOf(cardList);
        cardLists[index] = {...cardLists[index]};
        cardLists[index].listItems[ItemIndex].checked = !cardLists[index].listItems[ItemIndex].checked;
        try {
            updateList(cardList.id)
        } catch (ex) {
            alert('trevoga');
            this.setState({cardLists: originalLists})
        }
        this.setState({cardLists});
    };
    handleSave = async (notation) => {
        console.log('corrected', notation);
        if (notation.type === 'list') {
            await updateList(notation.id)
        } else {
            await updateNote(notation.id)
        }
    };
    handleChange = (notation) => {
        // if (notation.type === 'list') {
        //     const cardLists = [...this.state.cardLists];
        //     cardLists[notation] = notation;
        //     console.log(cardLists[notation])
        //     // this.setState({cardLists});
        // }
        // if (notation.type === 'note') {
        //     // console.log(notation);
        //     const cardNotes = [...this.state.cardNotes];
        //     cardNotes[notation] = notation;
        //     console.log(cardNotes[notation]);
        //     // this.setState({cardNotes})
        // }
        console.log('cards', notation)
    };


    render() {
        const {handleDelete} = this.props;
        return (
            <div className='body row p-2'>
                {this.props.notations.map(notation => (
                        notation.type === 'list' ?
                            <CardList
                                key={notation.title}
                                cardList={notation}
                                onCheck={this.handleCheck}

                                onSave={this.handleSave}
                                onDelete={handleDelete}
                                onChange={this.handleChange}
                            /> :
                            <CardNote
                                key={notation.title}
                                cardNote={notation}
                                onSave={this.handleSave}
                                onDelete={handleDelete}
                                onChange={this.handleChange}
                            />
                    )
                )}
                {/*{this.state.cardLists.map(cardList => (*/}
                {/*<CardList*/}
                {/*key={cardList.title}*/}
                {/*cardList={cardList}*/}
                {/*onCheck={this.handleCheck}*/}

                {/*onSave={this.handleSave}*/}
                {/*onDelete={this.handleDelete}*/}
                {/*onChange={this.handleChange}*/}

                {/*/>))}*/}
                {/*{this.state.cardNotes.map(cardNote => (*/}
                {/*<CardNote*/}
                {/*key={cardNote.title}*/}
                {/*cardNote={cardNote}*/}
                {/*onSave={this.handleSave}*/}
                {/*onDelete={this.handleDelete}*/}
                {/*onChange={this.handleChange}*/}

                {/*/>*/}
                {/*))}*/}
            </div>
        );
    }
}

export default Cards;