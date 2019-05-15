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
        handleCheck: PropTypes.func.isRequired,
        handleSave: PropTypes.func.isRequired
    };

    // state = {
    //     notations: []
    // };

    render() {
        const {notations, handleDelete, handleCheck, handleSave} = this.props;
        return (
            <div className='body row p-2'>
                {notations.map(notation => (
                        notation.type === 'list' ?
                            <CardList
                                key={notation.title}
                                cardList={notation}
                                onCheck={handleCheck}

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
        );
    }
}

export default Cards;