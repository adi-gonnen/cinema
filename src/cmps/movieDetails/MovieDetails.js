import React, {Component} from 'react';
import MovieService from '../../services/MovieService';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './MovieDetails.css';

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
        var currMovie = MovieService.searchMovieById(this.state.movieId);
        this.setState({movie: currMovie});
    }
    editMovie = () => {
        this.setState({edit: !this.state.edit})
    }
    back = () => {
        this.setState({back: !this.state.back})
    }
    delete = () => {
        MovieService.deleteMovie(this.state.movieId)
        .then ( () => {
            this.setState({back: !this.state.back})
        })
    }

    render() {
        if (this.state.back) {
            return <Redirect to={`/`} />
        }
        else if (this.state.edit) {
            return <Redirect to={`/movie/edit/${this.props.match.params.movieId}`} />
        }
        const movie = this.state.movie;
        var imgSrc = movie.Poster;
        if (imgSrc === null || imgSrc === 'N/A') imgSrc = 'img/movie3.png';

        return (
            <div className="movie-details-container flex column">
                <h2 className="title title-details">{movie.Title}</h2>
                <div className="movie-details flex column">
                    <div className="details-container flex">
                        <img src={imgSrc || 'img/movie3.png'} alt=""/>
                        <div className="movie-text flex column">
                            <p className="director mb15"><span className="bold">Directed by: </span>{movie.Director}</p>
                            <p className="actors mb15"><span className="bold">Actors: </span>{movie.Actors? movie.Actors: 'Gal Gadot' }</p>
                            <p className="rating mb15"><span className="bold">IMDb rating: </span>{movie.imdbRating? movie.imdbRating: '2.5'}/10</p>
                            <p className="released mb15"><span className="bold">Released: </span>{movie.Released}</p>
                            <div className="year-container mb15 flex">
                                <p className="runtime"> {movie.Runtime},&nbsp;</p>
                                <p className="language"> {movie.Language? movie.Language: 'Jibrish'}</p>
                            </div>
                            <p className="plot">{movie.Plot? movie.Plot: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</p>
                        </div>
                    </div>
                    <div className="btns flex">
                        <button className="btn btn-edit" onClick={this.editMovie}>
                            <FontAwesomeIcon icon="edit" title="edit"/>
                        </button>
                        <button className="btn btn-delete ml15" onClick={this.delete}>
                            <FontAwesomeIcon icon="trash-alt" title="delete"/>
                        </button>
                        <button className="btn btn-back ml15" onClick={this.back}>
                            <FontAwesomeIcon icon="undo" title="back"/> 
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}   
