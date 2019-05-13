import React, {Component} from 'react';
import CardList from '../CardList';
import CardNote from '../CardNote';
import CustomCard from '../customCard'
import {getLists} from '../../fakeData/fakeLists'
import {getNotes} from '../../fakeData/fakeNotes'

import './Cards.scss'

class Cards extends Component {
    state = {
        cardLists: [],
        cardNotes: [],
    };

    async componentDidMount() {
        const cardLists = await getLists();
        const cardNotes = await getNotes();

        this.setState({cardLists});
        this.setState({cardNotes});
    }

    handleDelete = (notation) => {
        if (notation.type === 'list') {
            const cardLists = this.state.cardLists.filter(list => list._id !== notation._id);
            this.setState({cardLists})
        } else {
            const cardNotes = this.state.cardNotes.filter(note => note._id !== notation._id);
            this.setState({cardNotes})
        }
    };


    handleCheck = (cardList, ItemIndex) => {
        const originalCardList=[...this.state.cardLists]
        const cardLists = [...this.state.cardLists];
        const index = cardLists.indexOf(cardList);
        cardLists[index] = {...cardLists[index]};
        cardLists[index].listItems[ItemIndex].checked = !cardLists[index].listItems[ItemIndex].checked;
        // try{
        //     http.post(url/cardlist/:id, kolbasa)
        // } catch(ex){
        //     alert('trevoga')
        //     this.setState({cardLists: originalCardList})
        // }

        this.setState({cardLists});
    };
    handleSave = (card) => {
        // http.post( url, card);
        console.log('corrected', card)
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
                {this.state.cardLists.map(cardList => (
                    <CardList
                        key={cardList.title}
                        cardList={cardList}
                        onCheck={this.handleCheck}

                        onSave={this.handleSave}
                        onDelete={this.handleDelete}
                        onChange={this.handleChange}

                    />))}
                {this.state.cardNotes.map(cardNote => (
                    <CardNote
                        key={cardNote.title}
                        cardNote={cardNote}
                        onSave={this.handleSave}
                        onDelete={this.handleDelete}
                        onChange={this.handleChange}

                    />
                ))}
                {/*<CustomCard*/}
                {/*key={'unique key'}*/}
                {/*cardTitle={'this is super title'}*/}
                {/*cardText={'some kind of text that can be changed'}*/}

                {/*/>*/}
            </div>
        );
    }
}

export default Cards;