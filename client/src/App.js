import React, {Component} from 'react';
import WiredElements from 'wired-elements';
import {Route} from 'react-router-dom';
import Header from './components/Header';
import Cards from './components/Cards'
import FormNote from './components/FormNote'
import FormList from "./components/FormList";
import {getNotations} from "./services/notations";
import {deleteList, saveList, updateList} from "./services/listService";
import {deleteNote, saveNote, updateNote} from "./services/noteService";


class App extends Component {
    state = {
        notations: [],
        searchQuery: '',
        notationTypes: ['note', 'notes', 'lists'],
        selectedType: 'note',
    };

    async componentDidMount() {
        let notations = await getNotations();
        notations.forEach(notation=>{
            if (notation.type==='list') notation.listItems.forEach(item => {
                item.key = Math.floor(Math.random()*10000).toString()})
        });
        this.setState({notations})
        // fetch('http://localhost:8000').then((resp)=>resp.json()).then(data=>console.log(data));
    }

    handleSearch = query => {
        this.setState({searchQuery: query, selectedType: 'note'});
    };
    handleSelectedType = type => {
        console.log(type);
        this.setState({selectedType: type});

    };
    getPagedData = () => {
        let newNotes = [...this.state.notations];
        const {searchQuery, selectedType} = this.state;
        let filtered = [...newNotes];
        if (searchQuery !== '') {
            filtered = newNotes.filter(notation => notation.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        } else if (selectedType !== 'note') {
            filtered = selectedType === 'lists' ? newNotes.filter(n => n.type === 'list') : newNotes.filter(n => n.type === 'note');

        }
        return filtered; // then you should map 'filtered' inside render -> cards = getPagedData()
    };

    handleDelete = async (id, type) => {
        const originalNotations = [...this.state.notations];
        const notations = originalNotations.filter(notation => notation.id !== id);
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
            alert('Error during list update');
            this.setState({notations: originalNotations})
        }
    };

    handleSubmit = async (notation) => {
        let newNotation;
        if (notation.type === 'note') newNotation = await saveNote(notation).then(resp => resp.data);
        else if (notation.type === 'list') newNotation = await saveList(notation).then(resp => resp.data);
        else throw new Error('Invalid card type');

        const notations = [...this.state.notations];
        notations.push(newNotation);
        this.setState({notations})
    };

    addToDoListItem = (id, itemIndex, key)=>{
        const newNotations = JSON.parse(JSON.stringify(this.state.notations));
        const cardIndex = newNotations.map(notation => notation.id).indexOf(id);
        const targetList = newNotations[cardIndex];
        const listItems = targetList.listItems;
        listItems.splice(itemIndex + 1, 0, {
            checked: false,
            task: '',
            key
        });

        this.setState({notations:newNotations})
    };
    deleteToDoListItem = (id, itemIndex)=>{
        const newNotations = JSON.parse(JSON.stringify(this.state.notations));
        const cardIndex = newNotations.map(notation => notation.id).indexOf(id);
        const targetList = newNotations[cardIndex];
        const listItems = targetList.listItems;
        listItems.splice(itemIndex , 1);
        // await this.handleSave(targetList);
        this.setState({notations:newNotations})
    };
    // handleLinkClick = (linkRoot) => {
    //     if (linkRoot !== this.state.openRoot) this.setState({openRoot: linkRoot});
    //     else this.setState({openRoot: '/'});
    // };

    render() {
        const {searchQuery, notationTypes} = this.state;
        const notations = this.getPagedData();
        return (
            <React.Fragment>
                <Header
                    notations={notations}
                    value={searchQuery}
                    onSearch={this.handleSearch}
                />
                <div className='container'>
                    <div className='row'>
                        <Route
                            path='/createNote'
                            render={(props) => <FormNote {...props}
                                                         onSubmit={this.handleSubmit}

                            />}
                        />
                        <Route
                            path='/createList'
                            render={(props) => <FormList {...props}
                                                         onSubmit={this.handleSubmit}

                            />}
                        />
                        <Route
                            path='/'
                            render={
                                (props) => (
                                    <Cards
                                        {...props}
                                        addToDoListItem={this.addToDoListItem}
                                        deleteToDoListItem={this.deleteToDoListItem}
                                        notationTypes={notationTypes}
                                        handleType={this.handleSelectedType}
                                        notations={notations}
                                        handleDelete={this.handleDelete}
                                        handleSave={this.handleSave}
                                    />
                                )}

                        />
                        {/*<Footer className='row'/>*/}
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default App;

