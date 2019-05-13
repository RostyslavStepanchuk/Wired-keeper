import React, {Component} from 'react';
import Button from '../Button'

class FormNote extends Component {
    state = {
        titleValue: '',
        textValue: '',
    };

    handleInput = (e, stateKey) => {
        const newStateItem = {};
        newStateItem[stateKey] = e.target.value;
        this.setState({...newStateItem});
    };

    submit = () => {
        const note = {};
        note.title = this.state.titleValue;
        note.noteText = this.state.textValue;
        console.log(note);
        this.props.history.replace('/')
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
                    onInput={(e) => this.handleInput(e, 'titleValue')}
                    value={this.state.titleValue}
                />
                <wired-textarea
                    placeholder='Write down what you want'
                    onInput={(e) => this.handleInput(e, 'textValue')}
                    value={this.state.titleValue}
                /> <br/>
                <Button title='create' onClick={this.submit}/>
            </wired-card>
        );
    }
}

export default FormNote;