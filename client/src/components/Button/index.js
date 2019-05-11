import React from 'react';
import PropTypes from 'prop-types';

Button.propTypes = {
    title: PropTypes.string.isRequired
};

function Button(props) {
    return (
        <button>
            {props.title}
        </button>
    );
}

export default Button;