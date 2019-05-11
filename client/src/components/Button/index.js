import React from 'react';
import PropTypes from 'prop-types';
import {WiredButton} from 'wired-elements';

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

function Button(props) {
    return (
        <wired-button onClick ={props.onClick}>
            {props.title}
        </wired-button>
    );
}

export default Button;