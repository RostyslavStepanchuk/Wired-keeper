import React, {Component} from 'react';
import CardList from '../CardList';
import CardNote from '../CardNote';
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

    handleCorrect = () => {
        console.log('corrected')
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

    render() {
        return (
            <div className='body row p-2'>
                {this.state.cardLists.map(cardList => (
                    <CardList
                        key={cardList.title}
                        cardList={cardList}
                        onCheck={this.handleCheck}
                        onCorrect={this.handleCorrect}
                        onDelete={this.handleDelete}
                    />))}
                {this.state.cardNotes.map(cardNote => (
                    <CardNote
                        key={cardNote.title}
                        cardNote={cardNote}
                        onCorrect={this.handleCorrect}
                        onDelete={this.handleDelete}
                    />
                ))}
            </div>
        );
    }
}

export default Cards;