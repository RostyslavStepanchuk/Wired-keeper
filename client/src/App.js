import React,{Component} from 'react';
import WiredElements from 'wired-elements';
import {Route} from 'react-router-dom';

import Header from './components/Header';
import Cards from './components/Cards'
import FormNote from './components/FormNote'
import FormList from "./components/FormList";

import {getNotations} from "./services/notations";
import {deleteList,saveList, updateList} from "./services/listService";
import {deleteNote,saveNote, updateNote} from "./services/noteService";


class App extends Component {
    state = {
        notations: [],
        searchQuery: '',
        notationTypes: ['All', 'notes', 'lists'],
        selectedType: 'All',
        openRoot:'/',
    };

    async componentDidMount() {
        let notations = await getNotations();
        this.setState({notations})
        // fetch('http://localhost:8000').then((resp)=>resp.json()).then(data=>console.log(data));
    }

    handleSearch = query => {
        this.setState({searchQuery: query, selectedType: 'All'});
    };
    handleSelectedType = type => {
        this.setState({selectedType: type});

    };
    getPagedData =   () => {
        let newNotes =   [...this.state.notations];
        const {searchQuery, selectedType} = this.state;
        let filtered =  [...newNotes];
        if (searchQuery !==''){
            filtered = newNotes.filter(notation => notation.title.toLowerCase().startsWith(searchQuery.toLowerCase()));}
        else if (selectedType !== 'All') {
            filtered = selectedType === 'lists' ? newNotes.filter(n => n.type === 'lists') : newNotes.filter(n => n.type === 'notes');
        }
        return filtered; // then you should map 'filtered' inside render -> cards = getPagedData()
    };

    handleDelete = async (id, type) => {
        const originalNotations = [...this.state.notations];
        const notations = originalNotations.filter(notation=> notation.id !== id);
        this.setState({notations});

        try {
            if (type === 'list') await deleteList(id);
            else if (type === 'note') await deleteNote(id);
            else throw new Error('Invalid card type')
        } catch (ex) {
            if (ex.response && ex.response.status === 404) console.log("x");
            alert("This notation has already been deleted.");
            this.setState({notations: originalNotations});
        }
    };

    handleSave = async (notation) => {
        const originalNotations = JSON.parse(JSON.stringify(this.state.notations));
        try {
            if (notation.type === 'list') {
                await updateList(notation)
            } else if (notation.type === 'note') {
                await updateNote(notation)
            } else throw new Error('Invalid card type')
        } catch (ex) {
            alert ('Error during list update');
            this.setState({notations:originalNotations})
        }
    };

    handleSubmit = async (notation) => {
        let newNotation;
        if (notation.type === 'note') newNotation = await saveNote(notation).then(resp=>resp.data);
        else if (notation.type === 'list') newNotation = await saveList(notation).then(resp=>resp.data);
        else throw new Error ('Invalid card type');
        const notations = [...this.state.notations];
        notations.push(newNotation);
        this.setState({notations})
    };

    handleLinkClick = (linkRoot)=>{
        if (linkRoot !==this.state.openRoot) this.setState({openRoot:linkRoot});
        else this.setState({openRoot:'/'});
    };

    render() {
        const { searchQuery, notationTypes, selectedType, openRoot} = this.state;
        const notations  = this.getPagedData();

        return (
            <React.Fragment>
                <Header
                    notations={notations}
                    value={searchQuery}
                    onSearch={this.handleSearch}
                    notationTypes={notationTypes}
                    handleType={this.handleSelectedType}
                    openRoot={openRoot}
                    handleLinkClick={this.handleLinkClick}
                />
                <div className='container'>
                    <Route
                        path='/createNote'
                        render={(props)=><FormNote {...props}
                                                   openRoot={openRoot}
                                                   onClose={this.handleLinkClick}
                                                   onSubmit={this.handleSubmit}
                        />}
                    />
                    <Route
                        path='/createList'
                        render={(props)=><FormList {...props}
                                                   openRoot={openRoot}
                                                   onClose={this.handleLinkClick}
                                                   onSubmit={this.handleSubmit}
                        />}
                    />
                    <Route
                        path='/'
                        render={
                            (props)=> (
                                <Cards
                                    {...props}
                                    notations={notations}
                                    handleDelete={this.handleDelete}
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

