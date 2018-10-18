import React, {Component} from 'react';
import './MovieDetails.css';
import MovieService from '../../services/MovieService';
import { Route, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from "sweetalert";

export default class MovieDetails extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            movieId: this.props.match.params.movieId,
            movie: {},
            // movie: this.props.location,
            back: false,
            edit: false
        }
    }
    componentDidMount() {
        // MovieService.getMovieById(this.state.movieId)
        // .then(data => {
        //     // console.log('movie$$', data);
        //     this.setState({movie: data});
        // });
        console.log('id', this.state.MovieId);
        var currMovie = MovieService.searchMovieById(this.state.movieId)
            console.log('movie$$', currMovie);
        this.setState({movie: currMovie});
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
        swal({
            title: "Are you sure you want to delete this movie?",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
            className: "swal-warning"
        }).then(willDelete => {
            if (willDelete) {
            MovieService.deleteMovie(this.state.movieId)
                .then(() => {
                    this.setState({back: !this.state.back})
                    swal("Your movie has been deleted!", {
                    icon: "success",
                    timer: 2000,
                    className: "swal-text",
                    button: false
                    });
                });
            } else swal.close();
        });
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
        if (imgSrc === null || imgSrc === 'N/A') imgSrc = 'img/movie3.png'
        return (
            <div className="movie-details-container flex column">
                <h2 className="title title-details">{movie.Title}</h2>
                <div className="movie-details flex column">
                    <div className="details-container flex">
                        <img src={imgSrc || 'img/movie3.png'} alt=""/>
                        <div className="movie-text flex column">
                        {/* <div class="movie-info flex column"> */}
                            <p className="director"><span className="bold">Directed by: </span>{movie.Director}</p>
                            <p className="actors"><span className="bold">Actors: </span>{movie.Actors? movie.Actors: 'Gal Gadot' }</p>
                            <p className="rating"><span className="bold">IMDb rating: </span>{movie.imdbRating? movie.imdbRating: '2.5'}/10</p>
                            <p className="released"><span className="bold">Released: </span>{movie.Released}</p>
                        {/* </div> */}
                            <div className="year-container flex">
                                {/* <p className="year">{movie.Year},&nbsp;</p> */}
                                <p className="runtime"> {movie.Runtime},&nbsp;</p>
                                <p className="language"> {movie.Language? movie.Language: 'Jibrish'}</p>
                            </div>
                            <p className="plot">{movie.Plot? movie.Plot: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'}</p>
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
