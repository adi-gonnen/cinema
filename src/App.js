import React, { Component } from 'react';
import Header from './cmps/header/Header';
import Home from './cmps/home/Home';
import movie from './cmps/home/Home';
import MovieEdit from './cmps/movieEdit/MovieEdit';
import MovieDetails from './cmps/movieDetails/MovieDetails';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrashAlt, faUndo, faSave, faVideo, faInfo, faPlus, faSearch, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

library.add(faEdit)
library.add(faTrashAlt)
library.add(faUndo)
library.add(faSave)
library.add(faVideo)
library.add(faInfo)
library.add(faPlus)
library.add(faSearch)
library.add(faChevronCircleRight)


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
