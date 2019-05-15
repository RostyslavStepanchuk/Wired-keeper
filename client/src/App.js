import React, {Component} from 'react';
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
        const notations = originalNotations.filter(notation => notation.id !== card.id);
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
            this.setState({cardLists: originalNotations})
        }
        this.setState({cardLists});
    };


    render() {
        const { searchQuery, notationTypes} = this.state;
        const notations  = this.getPagedData();
        return (
            <React.Fragment>
                <Header notations={notations} value={searchQuery} onSearch={this.handleSearch}/>
                <div className='container'>
                    <Route path='/createNote' component={FormNote}/>
                    <Route path='/createList' component={FormList}/>
                    <Route path='/' render={(props) => <Cards {...props}
                                                              notationTypes={notationTypes}
                                                              handleType={this.handleSelectedType}
                                                              handleDelete={this.handleDelete}
                                                              notations={notations}/>}/>
                    {/*<Cards className='row'/>*/}
                    {/*<Footer className='row'/>*/}
                </div>
            </React.Fragment>
        );
    }
}

export default App;

