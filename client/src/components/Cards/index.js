import React, {Component} from 'react';
import Card from '../Card'
import PropTypes from 'prop-types';

class Cards extends Component {
    render() {
        return (
            <div>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        );
    }
}

Cards.propTypes = {};

export default Cards;