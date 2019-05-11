import React from 'react';
import PropTypes from 'prop-types';
import {WiredButton} from 'wired-elements';

Button.propTypes = {
    title: PropTypes.string.isRequired,
};

function Button(props) {
    return (
        <wired-button {...props}>
            {props.title}
        </wired-button>
    );
}

export default Button;