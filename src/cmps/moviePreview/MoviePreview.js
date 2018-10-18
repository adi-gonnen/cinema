import React , { Component } from 'react';
import {Link} from 'react-router-dom';
import MovieService from '../../services/MovieService';
import { Route, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './MoviePreview.css';

class MoviePreview extends Component {
    state = {
        movie: this.props.movie,
        back: false,
        edit: false,
        info: false
    }
    // componentDidMount() {
    //     MovieService.getMovieById(this.props.movie.imdbID)
    //     .then(data => {
    //         // console.log('movie:', data);
    //         this.setState({movie: data})
    //     });
    // }
    editMovie= () => {
        this.setState({edit: !this.state.edit})
    }
    // back = () => {
    //     this.setState({back: !this.state.back})
    //     // console.log('back', this.state.back);
    // }
    delete = () => {
        MovieService.deleteMovie(this.state.movieId)
        .then ( () => {
            this.setState({back: !this.state.back})
        })
    }
    details = () => {
        this.setState({info: !this.state.info})
    }
    render() {
        const movie = this.state.movie;
        if (this.state.back) {
            return <Redirect to={`/movie`} />
        }
        else if (this.state.edit) {
            // return <Redirect to={`/movie/edit/${movie.imdbID}`}/>
            return <Redirect to={{pathname: `/movie/edit/${movie.imdbID}`, movie: this.state.movie}} />
        }
        else if (this.state.info) {
            return <Redirect to={`/movie/${movie.imdbID}`} />
        }
        var imgSrc = movie.Poster;
        if (imgSrc === null || imgSrc === 'N/A') imgSrc = 'img/movie3.png'
        return (
        <div className="movie-container flex column">
            <Link to={`/movie/${movie.imdbID}`} movie={movie} className="a-title">
               <h2 className="title">{movie.Title.toLowerCase().substring(0,36)}</h2>
            </Link>
            {/* <div className="preview-body flex column"> */}
            <Link to={`/movie/${movie.imdbID}`} movie={movie} className="a-img">
                <img src={imgSrc || 'img/movie3.png'} alt=""/>
                </Link>
                <p className="director"><span className="bold">Directed by: </span>{movie.Director}</p>
                <div className="year-container flex">
                    <p className="year">{movie.Year},&nbsp;</p>
                    <p className="runtime"> {movie.Runtime}</p>
                    {/* <p>{movie.imdbRating}</p> */}
                </div>
                <ul className="genre-list flex">
                    {movie.Genre.split(',').map(type => (
                        <li className="genre" key={type.id}>{type}</li>
                        ))}
                </ul>
                {/* <p className="genre">{movie.Genre.split(',')}</p> */}
            {/* </div> */}
            <div className="btns flex">
                <button className="btn btn-edit" onClick={this.editMovie}>
                    <FontAwesomeIcon icon="edit" title="edit"/>
                </button>
                <button className="btn btn-delete ml15" onClick={this.delete}>
                    <FontAwesomeIcon icon="trash-alt" title="delete"/>
                </button>
                <button className="btn btn-info ml15" onClick={this.details}>
                    <FontAwesomeIcon icon="info" title="details"/>
                </button>
            </div>
       </div>
        )
    }
}

export default MoviePreview
