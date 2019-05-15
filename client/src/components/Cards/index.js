import React, {Component} from 'react';
import CardList from '../CardList';
import CardNote from '../CardNote';
import {deleteNote, getNotes, updateNote} from '../../services/noteService'; // add getLists and getNotes from services
import {deleteList, getLists, updateList} from "../../services/listService";
import {getNotations} from "../../services/notations";
// import {getLists} from '../../fakeData/fakeLists'
// import {getNotes} from '../../fakeData/fakeNotes'

import './Cards.scss'

class Cards extends Component {
    state = {
        // cardLists: [],
        // cardNotes: [],
        notations: []
    };


    async componentDidMount() {
        // const cardLists = await getLists();
        // const cardNotes = await getNotes();
        const notations = await getNotations();
        console.log(notations);
        // console.log(cardLists);
        // console.log(cardNotes);
        this.setState({notations})
        //
        // this.setState({cardLists});
        // this.setState({cardNotes});
//dev
        // fetch('http://localhost:8000').then((resp)=>resp.json()).then(data=>console.log(data));
    }

    handleDelete = async notation => {
        if (notation.type === 'list') {
            const originalLists = this.state.cardLists;
            const cardLists = this.state.cardLists.filter(list => list._id !== notation._id);
            this.setState({cardLists});

            try {
                await deleteList(notation.id);
            } catch (ex) {
                if (ex.response && ex.response.status === 404) console.log("x");
                alert("This movie has already been deleted.");
                this.setState({cardNotes: originalLists});
            }

        } else if (notation.type === 'note'){
            const originalNotes = this.state.cardNotes;
            const cardNotes = this.state.cardNotes.filter(note => note._id !== notation._id);
            this.setState({cardNotes});

            try {
                await deleteNote(notation.id);
            } catch (ex) {
                if (ex.response && ex.response.status === 404) console.log("x");
                alert("This movie has already been deleted.");
                this.setState({cardLists: originalNotes});
            }
        } else {throw new Error ('Invalid card type')}
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
            alert('trevoga')
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
        return (
            <div className='body row p-2'>
                {this.state.notations.map(notation => (
                        notation.type === 'list' ?
                            <CardList
                                key={notation.title}
                                cardList={notation}
                                onCheck={this.handleCheck}

                                onSave={this.handleSave}
                                onDelete={this.handleDelete}
                                onChange={this.handleChange}
                            /> :
                            <CardNote
                                key={notation.title}
                                cardNote={notation}
                                onSave={this.handleSave}
                                onDelete={this.handleDelete}
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