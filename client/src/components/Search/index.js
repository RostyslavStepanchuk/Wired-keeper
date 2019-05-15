import React from 'react';
import PropTypes from 'prop-types';
import {WiredInput} from 'wired-elements'

import loop from './search.png'

import './Search.scss'

Search.propTypes = {};

function Search({value, onSearch}) {
    return (
        <div className='row position-relative'>
            <wired-input className='input-field' value={value}  onInput={(e)=> onSearch(e.currentTarget.value)} type='text'/>
            <img className='loop' src={loop} alt="loop"/>
        </div>
    );
}

export default Search;