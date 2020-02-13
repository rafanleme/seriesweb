import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import BoxSeries from './components/series/BoxSeries'

class App extends Component {

  render() {
    return (
      <div className="App">
        Cadastro de Series
        <BoxSeries />
      </div>
    )
  }

}

export default App;
