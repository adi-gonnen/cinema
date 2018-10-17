import React , { Component } from 'react';
import MoviePreview from '../moviePreview/MoviePreview';
import MovieService from '../../services/MovieService';
import {Link} from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import './Home.css';

import axios from 'axios';

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            add: false,
            movies: [],  //MovieService.getMovies(),
            img: null
        }
    }
    addMovie = () => {
        this.setState({add: !this.state.add})
    }
    refreshMovies = () => {
        // MovieService.getMovies()
        // .then(res => {
        //     console.log('dataaaa', res);
        //     this.setState({movies: res});
        // });
    }
    componentDidMount() {
        MovieService.loadMovies()
        .then(res => {
            console.log('dataaaa', res);
            this.setState({movies: res});
        });
    }

    render() {
        if (this.state.add) {
            return <Redirect to={{pathname: `/movie/edit/new`, updateMovie: this.updateMovie}} />
        }
        return (
        <div className="movies flex column">
            <div class="sub-title flex">
                <p>Let's watch some movies!</p>
                <button onClick={this.addMovie} className="btn add-btn">Add Movie</button>
            </div>
            <div className="movie-preview">
                <ul className="movies-list flex">
                    {this.state.movies && this.state.movies.map(movie => (
                        <li className="movie-list" key={movie.imdbID}>
                            {/* <Link to={`/movie/${movie.imdbID}`} movie={movie}> */}
                                <MoviePreview movie={movie} refreshMovies={this.refreshMovies}/>
                            {/* </Link> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        )
    }
}
