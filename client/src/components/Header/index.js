import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button'
import Search from '../Search'


Header.propTypes = {

};

function Header(props) {
    return (
        <div>
        <div>Logo</div>
            <Button title='Create Note'/>
            <Button title='Create List'/>
            <Search/>
        </div>
    );
}

export default Header;