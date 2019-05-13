import React from 'react';
import Header from './components/Header'
import {Route ,Switch} from 'react-router-dom'
import Cards from './components/Cards'
import FormNote from './components/FormNote' // TODO DELETE

import FormList from "./components/FormList";
import Footer from './components/Footer'

function App() {
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

export default App;
