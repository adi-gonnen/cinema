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
        MovieService.getMovieById(this.state.movieId)
        .then(data => {
            console.log('movie$$', data);
            this.setState({movie: data});
        });
    }
    editMovie = () => {
        // console.log('movies: ', MovieService.getUpdatedMovies());
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
            return <Redirect to={{pathname: `/movie/edit/${this.props.match.params.movieId}`, refreshMovies: this.props.location.refreshMovies}} />
        }
        const movie = this.state.movie;
        return (
            <div className="movie-details-container flex column">
                <h2 className="title-details">{movie.Title}</h2>
                <div className="movie-details flex column">
                    <div className="details-container flex">
                        <img src={movie.Poster} alt=""/>
                        <div className="movie-text flex column">
                        {/* <div class="movie-info flex column"> */}
                            <p className="director"><span>Directed by: </span>{movie.Director}</p>
                            <p className="actors"><span>Actors: </span>{movie.Actors}</p>
                            <p className="rating"><span>IMDb rating: </span>{movie.imdbRating}/10</p>
                        {/* </div> */}
                            <div className="year-container flex">
                                <p className="year">{movie.Year},&nbsp;</p>
                                <p className="runtime"> {movie.Runtime},&nbsp;</p>
                                <p className="language"> {movie.Language}</p>
                            </div>
                            <p className="plot">{movie.Plot}</p>
                        </div>
                    </div>
                    <div className="btns flex">
                        <button className="btn btn-edit" onClick={this.editMovie}>
                            <FontAwesomeIcon icon="edit" title="edit"/>
                        </button>
                        <button className="btn btn-delete" onClick={this.delete}>
                            <FontAwesomeIcon icon="trash-alt" title="delete"/>
                        </button>
                        <button className="btn btn-back" onClick={this.back}>
                            <FontAwesomeIcon icon="undo" title="back"/> 
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}   
