import React from 'react';
import Header from './components/Header'
import Cards from './components/Cards'
import FormNote from './components/FormNote' // TODO DELETE
import Footer from './components/Footer'

function App() {
  return (
      <div className='container'>
      <Header/>
      <Cards className='row'/>
      <Footer className='row'/>
      </div>
  );
}

export default App;
