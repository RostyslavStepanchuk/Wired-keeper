import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

import Button from '../Button';

class FormNote extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        openRoot: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired
    };

    state = {
        card: {
            title: '',
            noteText: ''
        }
    };

    handleInput = (e, stateKey) => {
        const newState = {...this.state};
        newState.card[stateKey] = e.target.value;
        this.setState({...newState});
    };

    doSubmit = () => {
        const card = {...this.state.card};
        card.type = 'note';
        this.props.onSubmit(card);
        this.props.history.replace('/')
    };

    render() {
        return (
            <wired-card
                elevation={3}
                style={{
                    width: '500px',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <wired-textarea
                    placeholder='Put title'
                    onInput={(e) => this.handleInput(e, 'title')}
                    value={this.state.card.title}
                />
                <wired-textarea
                    placeholder='Write down what you want'
                    onInput={(e) => this.handleInput(e, 'noteText')}
                    value={this.state.card.title}
                />
                <br/>
                <Button title='create' onClick={this.doSubmit}/>
                <NavLink
                    style={{'color': 'grey'}}
                    activeStyle={{'color': 'black'}}
                    to='/'>
                    <Button
                        class='header__close-btn'
                        title='x'
                        onClick={() => this.props.onClose(this.props.openRoot)}
                    />
                </NavLink>
            </wired-card>

        );
    }
}

export default FormNote;