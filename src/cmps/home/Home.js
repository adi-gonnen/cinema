import React , { Component } from 'react';
import MoviePreview from '../moviePreview/MoviePreview';
import MovieService from '../../services/MovieService';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Home.css';

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            add: false,
            movies: [],  
            img: null
        }
    }
    addMovie = () => {
        this.setState({add: !this.state.add})
    }
    componentDidMount() {
        MovieService.loadMovies()
        .then(res => {
            this.setState({movies: res});
        });
    }

    render() {
        if (this.state.add) {
            return <Redirect to={{pathname: `/movie/edit/new`, updateMovie: this.updateMovie}} />
        }
        return (
        <div className="movies flex column">
            <div className="sub-title flex">
                <p>let's watch some movies!</p>
                <button onClick={this.addMovie} className="btn add-btn">
                <div className="flex plus-add">
                    <FontAwesomeIcon icon="plus" title="add movie"/>
                </div>
                </button>
            </div>
            <div className="movie-preview">
                <ul className="movies-list flex">
                    {this.state.movies && this.state.movies.map(movie => (
                        <li className="movie-list" key={movie.imdbID}>
                            <MoviePreview movie={movie}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        )
    }
}
