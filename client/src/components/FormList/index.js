import React from 'react';
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import ContentEditable from "react-contenteditable";
import {connect} from 'react-redux';

import Button from '../Button'
import Card from "../common/card";
import {goToIndex} from "../../actions/AC/headerLink";


class FormList extends Card {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        // store
        goToIndex: PropTypes.func.isRequired
    };
    state = {
        title: '',
        listItems: [{
            checked: false,
            task: '',
            key: '0000'
        }],
        focusedItem: null
    };

    componentDidUpdate() {
        const focusedKey = this.state.focusedItem;
        console.log('focusedKey', focusedKey);
        console.log('focusedKey ref', this[focusedKey]);
        if(focusedKey) setTimeout(()=>this[focusedKey].focus(),0);
    }

    handleChange = (evt, stateKey, index) => {
        if (stateKey === 'title') {
            this.setState({title: evt.target.value});
        }
        if (stateKey === 'listItems') {
            const state = {...this.state};
            state[stateKey][index]['task'] = evt.target.value;
            this.setState({...state});
        }
    };

    doSubmit = () => {
        const card = {...this.state};
        card.type = 'list';
        this.props.onSubmit(card);
        this.props.history.replace('/')
    };

    addNewItem = (e, index) => {
        // console.log(this.state.card);
        if (e.keyCode !== 13 && e.button !== 0) return;
        e.preventDefault();
        const listItems = [...this.state.listItems];
        const key = Math.floor(Math.random() * 10000).toString();
        listItems.splice(index + 1, 0, {
            checked: false,
            task: '',
            key
        });

        this.setState({
            listItems,
            focusedItem:key
        })
    };


    deleteItem = (index) => {
        const listItems = [...this.state.listItems];
        listItems.splice(index, 1);
        this.setState({listItems})
    };

    render() {
        console.log('CHECKING REFS', this);
        return (
            <wired-card
                class='col-md-8 col-xl-5'
                elevation={3}
                style={{
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                }}>
                <wired-textarea
                    style={{width: '80%'}}
                    placeholder='Put title'
                    onInput={(e) => this.handleChange(e, 'title')}
                    value={this.state.title}
                />
                {this.state.listItems.map((listItem, index) => (
                    <div key={listItem.key} className='d-flex'>
                        <wired-checkbox
                            checked={listItem.checked ? 'checked' : null}
                            style={{whiteSpace: 'normal'}}
                        />
                        <ContentEditable
                            innerRef={this.contentEditable}
                            html={listItem.task}
                            onChange={(e) => this.handleChange(e, 'listItems', index)}
                            onKeyDown={(e) => this.addNewItem(e, index)}
                            tagName='p'
                            ref = {(item)=>this[listItem.key]=item}
                            style={{
                                minWidth: '220px',
                                maxWidth: '450px',
                                borderBottom: '1px solid black'
                            }}
                        />
                        <Button title='+' style={{height: '28px'}}
                                onMouseUp={(e) => this.addNewItem(e, index)}
                        />
                        <Button title='X' style={{height: '28px'}}
                                onClick={() => this.deleteItem(index)}
                        />
                    </div>))}
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

const mapDispatchToProps = (dispatch) => ({
    goToIndex: () => dispatch(goToIndex()),
});

export default connect(null, mapDispatchToProps)(FormList);