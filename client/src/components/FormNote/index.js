import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

import Button from '../Button';
import {goToIndex} from "../../actions/AC/headerLink";

class FormNote extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        //store
        goToIndex: PropTypes.func.isRequired
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
                class = 'col-md-8 col-xl-5'
                elevation={3}
                style={{
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <wired-textarea
                    style={{width: '80%'}}
                    placeholder='Put title'
                    onInput={(e) => this.handleInput(e, 'title')}
                    value={this.state.card.title}
                />
                <wired-textarea
                    style={{width: '80%',}}
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
                        onClick={this.props.goToIndex}
                    />
                </NavLink>
            </wired-card>

        );
    }
}

const mapDispatchToProps = dispatch => ({
   goToIndex: ()=>dispatch(goToIndex()),
});

export default connect(null,mapDispatchToProps)(FormNote);