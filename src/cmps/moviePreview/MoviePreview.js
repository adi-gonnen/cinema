import React , { Component } from 'react';
import {Link} from 'react-router-dom';
import MovieService from '../../services/MovieService';
import { Route, Redirect } from 'react-router-dom';

import './MoviePreview.css';

// const MoviePreview = ({movie}) => (
    
//     <div className="movie-container flex column">
//         {/* <img src="img/contact-avatar.png" alt="movie"/> */}
//         <p>{movie.Title}</p>
//         <p>{movie.Director}</p>
//         <p>{movie.Year}</p>
//         <p>{movie.Runtime}</p>
//         <p>{movie.Genge}</p>
//     </div>

// )
// export default MoviePreview;

class MoviePreview extends Component {
    state = {
        movie: {}
    }
    componentDidMount() {
        MovieService.getMovieById(this.props.movie.imdbID)
        .then(data => {
            console.log('movie:', data);
            this.setState({movie: data})
        });
    }
    render() {
        const movie = this.state.movie;
        return (
        <div className="movie-container flex column">
           <h3 className="title">{movie.Title}</h3>
           <img src="{movie.Poster}"/>
           <p className="director"><span>Directed by: </span>{movie.Director}</p>
           <p className="year">{movie.Year}</p>
           <p className="runtime">{movie.Runtime}</p>
           <p className="genre"><span>Genre: </span>{movie.Genre}</p>
       </div>
        )
    }
}

export default MoviePreview
