import React , { Component } from 'react';
import MoviePreview from '../moviePreview/MoviePreview';
import MovieService from '../../services/MovieService';
import {Link} from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import './Home.css';


export default class Home extends Component {
    state = {
        add: false,
        movies: MovieService.getUpdatedMovies()
    }
    addMovie = () => {
        this.setState({add: !this.state.add})
    }
    componentDidMount() {
        MovieService.getMovies()
        .then(res => {
            console.log('dataaaa', res);
            this.setState({movies: res});
        });
    }

    render() {
        // if (this.state.movies) {
        //     console.log('render:', this.state.movies[0].Title);
        // }
        if (this.state.add) {
            return <Redirect to={`/movie/edit/new`} />
        }
        return (
        <div className="movies">
            <button onClick={this.addMovie} className="btn add-btn">Add Movie</button>
            <div className="movie-preview">
                <ul className="movies-list flex">
                    {this.state.movies && this.state.movies.map(movie => (
                        <li className="movie-list" key={movie.imdbID}>
                            {/* <Link to={`/movie/${movie.imdbID}`} movie={movie}> */}
                                <MoviePreview movie={movie}/>
                            {/* </Link> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        )
    }
}
