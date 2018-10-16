import React , { Component } from 'react';
import {Link} from 'react-router-dom';
import MovieService from '../../services/MovieService';
import { Route, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './MoviePreview.css';

class MoviePreview extends Component {
    state = {
        movie: {},
        back: false,
        edit: false
    }
    componentDidMount() {
        MovieService.getMovieById(this.props.movie.imdbID)
        .then(data => {
            // console.log('movie:', data);
            this.setState({movie: data})
        });
    }
    editMovie= () => {
        this.setState({edit: !this.state.edit})
    }
    back = () => {
        this.setState({back: !this.state.back})
        // console.log('back', this.state.back);
    }
    
    render() {
        const movie = this.state.movie;
        if (this.state.back) {
            return <Redirect to={`/movie`} />
        }
        else if (this.state.edit) {
            return <Redirect to={`/movie/edit/${movie.imdbID}`} />
        }
        return (
        <div className="movie-container flex column">
            <Link to={`/movie/${movie.imdbID}`} movie={movie}>
               <h3 className="title">{movie.Title}</h3>
            </Link>
            <div className="preview-body flex column">
                <img src="{movie.Poster}" alt="poster"/>
                <p className="director"><span>Directed by: </span>{movie.Director}</p>
                <p className="year">{movie.Year}</p>
                <p className="runtime">{movie.Runtime}</p>
                <p className="genre"><span>Genre: </span>{movie.Genre}</p>
            </div>
            <button className="btn btn-edit" onClick={this.editMovie}>
                <FontAwesomeIcon icon="edit" title="edit"/>
            </button>
       </div>
        )
    }
}

export default MoviePreview
