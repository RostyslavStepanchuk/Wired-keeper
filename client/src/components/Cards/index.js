import React, {Component} from 'react';
import CardList from '../CardList';
import CardNote from '../CardNote';
import {getLists} from '../../fakeData/fakeLists'
import {getNotes} from '../../fakeData/fakeNotes'

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


    render() {
        return (
            <div>
                {this.state.cardLists.map(cardList => (
                    <CardList
                        key={cardList.title}
                        title={cardList.title}
                        listItems={cardList.listItems}
                    />))}
                {this.state.cardNotes.map(cardNote => (
                    <CardNote
                        key={cardNote.title}
                        title={cardNote.title}
                        noteText={cardNote.noteText}
                    />
                ))}
            </div>
        );
    }
}

export default Cards;