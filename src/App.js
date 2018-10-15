import React, { Component } from 'react';
import Header from './cmps/header/Header';
import Home from './cmps/home/Home';
import movie from './cmps/home/Home';
import MovieEdit from './cmps/movieEdit/MovieEdit';
import MovieDetails from './cmps/movieDetails/MovieDetails';
import MovieService from './services/MovieService';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  state = {
    movies: []
}
componentDidMount() {
    MovieService.uploadMovies()
    .then(data => {
        console.log('dataaaa', data);
        this.setState({movies: data})
    });
}
  render() {
    return (
      <Router>
        <React.Fragment>
      <div className="App">
        <Header className="App-header"/>
      </div>
      <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/movie" component={movie} movies={this.state.movies}/>
            <Route exact path="/movie/:movieId" component={MovieDetails} /> 
            <Route exact path="/movie/edit/:movieId" component={MovieEdit} />
          </Switch>
      </React.Fragment>
      </Router>
    );
  }
}

export default App;
