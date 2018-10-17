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
        edit: false
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
            // return <Redirect to={`/movie/edit/${movie.imdbID}`}/>
            return <Redirect to={{pathname: `/movie/edit/${movie.imdbID}`, movie: this.state.movie}} />
        }
        var imgSrc = movie.Poster;
        if (imgSrc === null || imgSrc === 'N/A') imgSrc = 'img/movie3.png'
        return (
        <div className="movie-container flex column">
            <Link to={`/movie/${movie.imdbID}`} movie={movie} className="a-title">
               <h2 className="title">{movie.Title.toLowerCase().substring(0,36)}</h2>
            </Link>
            {/* <div className="preview-body flex column"> */}
                <img src={imgSrc || 'img/movie3.png'} alt=""/>
                <p className="director"><span>Directed by: </span>{movie.Director}</p>
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
            <button className="btn btn-edit" onClick={this.editMovie}>
                <FontAwesomeIcon icon="edit" title="edit"/>
            </button>
       </div>
        )
    }
}

export default MoviePreview
