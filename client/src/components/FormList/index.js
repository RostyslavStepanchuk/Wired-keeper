
import React, {Component} from 'react';
import Button from '../Button'
// import {WiredCard, WiredCheckbox} from 'wired-elements';
import ContentEditable from "react-contenteditable";


class FormList extends Component {

    state = {
        titleValue: '',
        listItems: [{
            checked: false,
            task: ''
        }],
    };

    handleChange = (evt, stateKey, index) => {

        console.log(this.state);
        if (stateKey === 'titleValue') {
            const state = {...this.state};
            state[stateKey] = evt.target.value;
            this.setState({state}, ()=> console.log(state));
        }
        if (stateKey === 'listItems') {
            const state = {...this.state};
            state[stateKey][index]['task'] = evt.target.value;
            this.setState({state}, ()=> console.log(state));
        }
        // this.setState({state: newState})
    };

    submit = () => {
        const list = {};
        list.title = this.state.titleValue;
        list.listItems = this.state.listItems;
        console.log(list);
        this.props.history.replace('/')
    };

    addNewItem = (index) => {
        const listItems = [...this.state.listItems];
        listItems.splice(index+1, 0,{
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
            <wired-card style={{
                width: '500px',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <wired-textarea
                    placeholder='Put title'
                    onInput={(e) => this.handleChange(e, 'titleValue')}
                    value={this.state.titleValue}
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
                        onEnter={() => console.log('enter')}
                        tagName='p'
                        style={{
                            minWidth: '220px',
                            borderBottom: '1px solid black'
                        }}
                    />
                    <Button title='add new'
                        onClick={()=> this.addNewItem(index)}
                    />
                    <Button title='X'
                            onClick={()=> this.deleteItem(index)}
                    />
                </div>))}
                <br/>
                <Button title='create' onClick={this.submit}/>
            </wired-card>
        );
    }

}

export default FormList;