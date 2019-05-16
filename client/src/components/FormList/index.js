import React from 'react';
import Button from '../Button'
import ContentEditable from "react-contenteditable";
import {saveList} from '../../services/listService'
import Card from "../common/card";
import PropTypes from "prop-types";


class FormList extends Card {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    };
    state = {
        title: '',
        listItems: [{
            checked: false,
            task: ''
        }],
    };

    handleChange = (evt, stateKey, index) => {

        if (stateKey === 'title') {
            this.setState({title:evt.target.value});
        }
        if (stateKey === 'listItems') {
            const state = {...this.state};
            state[stateKey][index]['task'] = evt.target.value;
            this.setState({...state});
        }
        // this.setState({state: newState})
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
        console.log('aaa');
        e.preventDefault();
        const listItems = [...this.state.listItems];
        listItems.splice(index + 1, 0, {
            checked: false,
            task: ''
        });
        this.setState({listItems})

    };


    deleteItem = (index) => {
        const listItems = [...this.state.listItems];
        listItems.splice(index, 1);
        this.setState({listItems})
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
                    onInput={(e) => this.handleChange(e, 'title')}
                    value={this.state.title}
                />
                {this.state.listItems.map((listItem, index) => (<div className='d-flex'>
                    <wired-checkbox
                        checked={listItem.checked ? 'checked' : null}
                        key={index}
                        style={{whiteSpace: 'normal'}}
                    />
                    <ContentEditable
                        innerRef={this.contentEditable}
                        html={listItem.task}
                        onChange={(e) => this.handleChange(e, 'listItems', index)}
                        onKeyDown={(e) => this.addNewItem(e, index)}
                        tagName='p'
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
            </wired-card>
        );
    }

}

export default FormList;