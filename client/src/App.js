import React,{Component} from 'react';
import Header from './components/Header'
import {Route, Switch} from 'react-router-dom'
import Cards from './components/Cards'
import FormNote from './components/FormNote'
import FormList from "./components/FormList";
import Footer from './components/Footer'
import {getNotations} from "./services/notations";
import {deleteList, updateList} from "./services/listService";
import {deleteNote} from "./services/noteService";


class App extends Component {
    state= {
        notations:[]
    };

    componentDidMount() {
        getNotations().then(notations=>this.setState({notations}));
        // fetch('http://localhost:8000').then((resp)=>resp.json()).then(data=>console.log(data));
    }

    handleDelete = async card => {
        const originalNotations = [...this.state.notations];
        const notations = originalNotations.filter(notation=> notation.id !== card.id);
        console.log(notations);
        this.setState({notations});

        try {
            if (card.type === 'list') await deleteList(card.id);
            else if (card.type === 'note') await deleteNote(card.id);
            else console.log('Invalid card type')
        } catch (ex) {
            if (ex.response && ex.response.status === 404) console.log("x");
            alert("This notation has already been deleted.");
            this.setState({cardNotes: originalNotations});
        }
    };

    handleCheck = (cardList, ItemIndex) => {
        const originalNotations = [...this.state.notations];

        const cardLists = [...this.state.cardLists];
        const index = cardLists.indexOf(cardList);
        cardLists[index] = {...cardLists[index]};
        cardLists[index].listItems[ItemIndex].checked = !cardLists[index].listItems[ItemIndex].checked;
        try {
            updateList(cardList.id)
        } catch (ex) {
            alert('trevoga');
            this.setState({cardLists: originalLists})
        }
        this.setState({cardLists});
    };


    render() {
        const {notations} = this.state;
        return (
            <React.Fragment>
                <Header notations={notations}/>
                <div className='container'>
                    <Route path='/createNote' component={FormNote}/>
                    <Route path='/createList' component={FormList}/>
                    <Route path='/' render={(props)=><Cards {...props} handleDelete={this.handleDelete} notations={notations}/>}/>
                    {/*<Cards className='row'/>*/}
                    {/*<Footer className='row'/>*/}
                </div>

            </React.Fragment>
        );
    }
}

export default App;

