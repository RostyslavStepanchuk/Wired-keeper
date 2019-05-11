import React from 'react';
import PropTypes from 'prop-types';

Button.propTypes = {
    title: PropTypes.string.isRequired,

};

function Button(props) {
    return (
        <button
            onClick={props.onClick}
        >
            {props.title}
        </button>
    );
}

export default Button;