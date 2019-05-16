import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CardList from '../CardList';
import CardNote from '../CardNote';

import './Cards.scss'

class Cards extends Component {
    static propTypes = {
        notations: PropTypes.array.isRequired,
        handleDelete: PropTypes.func.isRequired,
        handleSave: PropTypes.func.isRequired,
    };

    state = {
        notations: []
    };

    render() {
        const {notations, handleDelete, handleSave} = this.props;
        if (!notations.length) return <p className='body__placeholder'>Nothing here yet</p>;
        return (
            <div className='body row p-2'>

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