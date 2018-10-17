import React, { Component } from 'react';
import Header from './cmps/header/Header';
import Home from './cmps/home/Home';
import movie from './cmps/home/Home';
import MovieEdit from './cmps/movieEdit/MovieEdit';
import MovieDetails from './cmps/movieDetails/MovieDetails';
import MovieService from './services/MovieService';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faUndo, faSave } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

library.add(faEdit)
library.add(faTrashAlt)
library.add(faUndo)
library.add(faSave)


class App extends Component {

  render() {
    return (
      <Router>
        <React.Fragment>
      <div className="App">
        <Header className="App-header"/>
      </div>
      <Switch className="body">
            <Route exact path="/" component={Home} />
            <Route exact path="/movie" component={movie}/>
            <Route exact path="/movie/:movieId" component={MovieDetails} /> 
            <Route exact path="/movie/edit/:movieId" component={MovieEdit} />
          </Switch>
      </React.Fragment>
      </Router>
    );
  }
}

export default App;
