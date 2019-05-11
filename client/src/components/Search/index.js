import React from 'react';
import PropTypes from 'prop-types';
import {WiredInput} from 'wired-elements'

import loop from './search.png'

import './Search.scss'

Search.propTypes = {};

function Search(props) {
    return (
        <div className='row position-relative'>
            <wired-input class='input-field' type='text'/>
            <img className='loop' src={loop} alt="loop"/>
        </div>
    );
}

export default Search;