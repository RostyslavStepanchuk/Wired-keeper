import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardList from '../CardList';
import CardNote from '../CardNote';
import NotationCatalog from '../NotationCatalog'
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
        // handleCheck: PropTypes.func.isRequired,
        handleSave: PropTypes.func.isRequired,
        notationTypes: PropTypes.array.isRequired,
        handleType:PropTypes.func.isRequired
    };

    state = {
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


    render() {
        const {notations,notationTypes, handleType, handleDelete, handleCheck, handleSave} = this.props;
        if (!notations.length) return <p>Nothing here yet. Create some note or to-do-list</p>;
        return (
            <div className='body row p-2'>
                <div style={{display: 'block'}}>
                    <NotationCatalog
                        notationTypes={notationTypes}
                        handleType={handleType}
                    />
                </div>
                {notations.map(notation => (
                        notation.type === 'list' ?
                            <CardList
                                key={notation.title}
                                cardList={notation}
                                onSave={handleSave}
                                onDelete={handleDelete}
                            /> :
                            <CardNote
                                key={notation.title}
                                cardNote={notation}
                                onSave={handleSave}
                                onDelete={handleDelete}
                            />
                    )
                )}
            </div>
        )
            ;
    }
}

export default Cards;