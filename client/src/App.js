import React,{Component} from 'react';
import Header from './components/Header'
import {Route, Switch} from 'react-router-dom'
import Cards from './components/Cards'
import FormNote from './components/FormNote'
import FormList from "./components/FormList";
import Footer from './components/Footer'
import {getNotations} from "./services/notations";
import {deleteList, updateList} from "./services/listService";
import {deleteNote, updateNote} from "./services/noteService";


class App extends Component {
    state = {
        notations: [],
        searchQuery: '',
        notationTypes: ['All', 'notes', 'lists'],
        selectedType: 'All'
    };

    async componentDidMount() {
        console.log('mounted');
        let notations = await getNotations();
        this.setState({notations})
        // fetch('http://localhost:8000').then((resp)=>resp.json()).then(data=>console.log(data));
    }

    handleSearch = query => {
        this.setState({searchQuery: query, selectedType: 'All'});
        console.log(query)
    };
    handleSelectedType = type => {
        this.setState({selectedType: type});
        console.log('tr')
    };
    getPagedData =   () => {
        let newNotes =   [...this.state.notations];
        const {searchQuery, selectedType} = this.state;
        let filtered =  [...newNotes];
        if (searchQuery)
            filtered = newNotes.filter(notation => notation.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        else if (selectedType !== 'All')
            filtered = selectedType === 'lists' ? newNotes.filter(n => n.type === 'lists') : newNotes.filter(n => n.type === 'notes');
        return filtered; // then you should map 'filtered' inside render -> cards = getPagedData()
    };

    handleDelete = async card => {
        const originalNotations = [...this.state.notations];
        const notations = originalNotations.filter(notation=> notation.id !== card.id);
        this.setState({notations});

        try {
            if (card.type === 'list') await deleteList(card.id);
            else if (card.type === 'note') await deleteNote(card.id);
            else throw new Error('Invalid card type')
        } catch (ex) {
            if (ex.response && ex.response.status === 404) console.log("x");
            alert("This notation has already been deleted.");
            this.setState({notations: originalNotations});
        }
    };

    handleCheck = async (cardId, ItemIndex) => {
        const originalNotations = JSON.parse(JSON.stringify(this.state.notations));

        const notations = JSON.parse(JSON.stringify(this.state.notations));
        const CardIndex = originalNotations.map(notation=>notation.id).indexOf(cardId);
        const updatedCard = notations[CardIndex];
        updatedCard.listItems[ItemIndex].checked = !updatedCard.listItems[ItemIndex].checked;

        try {
            await updateList(updatedCard);
            this.setState({notations});
        } catch (ex) {
            alert ('Error during list update');
            this.setState({notations:originalNotations})
        }
    };

    handleSave = async (cardId) => {
        const originalNotations = JSON.parse(JSON.stringify(this.state.notations));

        const notations = JSON.parse(JSON.stringify(this.state.notations));
        const CardIndex = originalNotations.map(notation=>notation.id).indexOf(cardId);

        try {
            if (notation.type === 'list') {
                await updateList(notation)
            } else if (notation.type === 'note') {
                await updateNote(notation)
            } else throw new Error('Invalid card type')
        } catch (ex) {
            alert ('Error during list update');
        }
    };


    render() {
        const { searchQuery, notationTypes} = this.state;
        const notations  = this.getPagedData();

        return (
            <React.Fragment>
                <Header notations={notations}/>
                <div className='container'>
                    <Route path='/createNote' component={FormNote}/>
                    <Route path='/createList' component={FormList}/>
                    <Route
                        path='/'
                        render={
                            (props)=> (
                                <Cards
                                    {...props}
                                    notations={notations}
                                    notationTypes={notationTypes}
                                    handleType={this.handleSelectedType}
                                    handleDelete={this.handleDelete}
                                    handleCheck={this.handleCheck}
                                    handleSave = {this.handleSave}
                                    />
                                    )}
                    />
                    {/*<Footer className='row'/>*/}
                </div>

            </React.Fragment>
        );
    }
}

export default App;

