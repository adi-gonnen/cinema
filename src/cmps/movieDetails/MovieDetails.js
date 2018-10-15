import React, {Component} from 'react';
import './MovieDetails.css';
import MovieService from '../../services/MovieService';
import { Route, Redirect } from 'react-router-dom';

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
        MovieService.getMovieById(this.state.movieId)
        .then(data => {
            // console.log('movie$$', data);
            this.setState({movie: data});
        });
    }
    editMovie= () => {
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
            return <Redirect to={`/movie`} />
        }
        else if (this.state.edit) {
            return <Redirect to={`/movie/edit/${this.props.match.params.movieId}`} />
        }
        const movie = this.state.movie
        return (
            <div className="details-container">
                <div className="movie-details">
                    <h1>Movie Details:</h1>
                    <h2>{movie.Title}</h2>
                    <h4>{movie.Director}</h4>
                    <h4>{movie.Year}</h4>
                </div>
                <div className="btns">
                    <button className="btn" onClick={this.editMovie}>edit</button>
                    <button className="btn" onClick={this.back}>back</button>
                    <button className="btn" onClick={this.delete}>delete</button>
                </div>
            </div>
        )
    }
}   
