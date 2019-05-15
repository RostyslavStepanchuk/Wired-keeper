import React from 'react';
import Header from './components/Header'
import {Route, Switch} from 'react-router-dom'
import Cards from './components/Cards'
import FormNote from './components/FormNote' // TODO DELETE

import FormList from "./components/FormList";
import Footer from './components/Footer'


class App extends React.Component() {
    state = {
        notations: [],
        searchQuery: '',
        notationTypes: ['All', 'notes', 'lists'],
        selectedType: 'All'
    };
    handleSearch = query => {
        this.setState({searchQuery: query, selectedType: 'All'});
    };
    handleSelectedType= type => {
        this.setState({selectedType: type})
    };
    getPagedData = () => {
        const {searchQuery, selectedType, notations} = this.state;

        let filtered = notations;
        if (searchQuery)
            filtered = notations.filter(notation => notation.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        else if(selectedType !== 'All')
            filtered = selectedType === 'lists' ? notations.filter(n => n.type === 'lists') : notations.filter(n => n.type === 'notes');
        return filtered; // then you should map 'filtered' inside render -> cards = getPagedData()
    };

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className='container'>
                    <Route path='/createNote' component={FormNote}/>
                    <Route path='/createList' component={FormList}/>
                    <Route path='/' component={Cards}/>
                    {/*<Cards className='row'/>*/}
                    {/*<Footer className='row'/>*/}
                </div>

            </React.Fragment>

        );
    }


}

export default App;
