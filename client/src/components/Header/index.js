import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button'
import Search from '../Search'
import logo from "./hand-drawn-pencil-icon.png";

import './header.scss'

Header.propTypes = {

};

function Header(props) {
    return (
        <div className='container-fluid'>
            <div className="row">
                <div>
                <img className='logo-img' alt='pencil-logo' src={logo}/>
                WIRED-KEEPER
                </div>
            <Button title='Create Note'/>
            <Button title='Create List'/>
            <Search/>
        </div>
        </div>
    );
}

export default Header;