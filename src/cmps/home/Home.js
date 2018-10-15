import React , { Component } from 'react';
import MoviePreview from '../moviePreview/MoviePreview';
import MovieService from '../../services/MovieService';
import {Link} from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import './Home.css';

class Home extends Component {
    state = {
        add: false,
        movies: this.props.movies
    }
    addMovie = () => {
        this.setState({add: !this.state.add})
    }
    componentDidMount() {
        console.log('movies##', this.state.movies);
        
        // MovieService.getMovies()
        // // this.setState({movies: moviesList})
        // .then(data => {
        //     console.log('dataaaa', data);
        //     this.setState({movies: data})
        // });
    }
    render() {
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
                                <Link to={`/movie/${movie.imdbID}`} movie={movie}>
                                    <MoviePreview movie={movie}/>
                                </Link>
                            </li>
                        ))}
                    </ul>
                
                </div>
        </div>
        ) 
    }
}
export default Home;
