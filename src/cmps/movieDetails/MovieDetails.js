import React, {Component} from 'react';
import './MovieDetails.css';
import MovieService from '../../services/MovieService';
import { Route, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class MovieDetails extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        movieId: this.props.match.params.movieId,
        movie: {},
        back: false,
        edit: false
        }
    }
    componentDidMount() {
        // console.log('id', this.state.MovieId);
        console.log('movies: ', MovieService.getUpdatedMovies());
        MovieService.getMovieById(this.state.movieId)
        .then(data => {
            // console.log('movie$$', data);
            this.setState({movie: data});
        });
    }
    editMovie = () => {
        console.log('movies: ', MovieService.getUpdatedMovies());
        this.setState({edit: !this.state.edit})
    }
    back = () => {
        this.setState({back: !this.state.back})
        // console.log('back', this.state.back);
    }
    delete = () => {
        MovieService.deleteMovie(this.state.movieId);
        this.setState({back: !this.state.back})
    }
    render() {
        if (this.state.back) {
            return <Redirect to={`/`} />
        }
        else if (this.state.edit) {
            return <Redirect to={`/movie/edit/${this.props.match.params.movieId}`} />
        }
        const movie = this.state.movie
        return (
            <div className="movie-details flex column">
                <h3 className="title">{movie.Title}</h3>
                <div className="details-body flex column">
                    <p className="director"><span>Directed by: </span>{movie.Director}</p>
                    <p className="year">{movie.Year}</p>
                    <p className="runtime">{movie.Runtime}</p>
                    <p className="genre"><span>Genre: </span>{movie.Genre}</p>
                </div>
                <div className="btns flex">
                    <button className="btn" onClick={this.editMovie}>
                        <FontAwesomeIcon icon="edit" title="edit"/>
                    </button>
                    <button className="btn" onClick={this.delete}>
                        <FontAwesomeIcon icon="trash-alt" title="delete"/>
                    </button>
                    <button className="btn" onClick={this.back}>
                        <FontAwesomeIcon icon="undo" title="back"/> 
                    </button>
                </div>
            </div>
        )
    }
}   
