import React , { Component } from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './MoviePreview.css';

class MoviePreview extends Component {
    state = {
        movie: this.props.movie,
        edit: false,
        info: false
    }
    editMovie= () => {
        this.setState({edit: !this.state.edit})
    }
    details = () => {
        this.setState({info: !this.state.info})
    }
    render() {
        const movie = this.state.movie;
        if (this.state.edit) {
            return <Redirect to={`/movie/edit/${movie.imdbID}`}/>
        }
        else if (this.state.info) {
            return <Redirect to={`/movie/${movie.imdbID}`} />
        }
        var imgSrc = null
        if (!movie.Poster || movie.Poster === 'N/A') imgSrc = 'img/movie3.png';
        else imgSrc = movie.Poster;
        const imgStyle = {
            backgroundImage: 'url(' + imgSrc + ')',
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundrepeat: 'no-repeat',
        }
        return (
        <div className="movie-container flex column">
            <Link to={`/movie/${movie.imdbID}`} movie={movie} className="a-title">
               <h2 className="title">{movie.Title.toLowerCase().substring(0,36)}</h2>
            </Link>
            <Link to={`/movie/${movie.imdbID}`} style={imgStyle} movie={movie} className="a-img"/>
            <p className="director"><span className="bold">Directed by: </span>{movie.Director}</p>
            <div className="year-container flex">
                <p className="year">{movie.Year},&nbsp; &nbsp;</p>
                <p className="runtime"> {movie.Runtime}</p>
            </div>
            <div className="genre-list flex">
                <ul className="ul-genre flex">
                    {movie.Genre.replace(/,/g,"").split(' ').map(type => (
                        <li className="genre" key={type}>{type}</li>
                        ))}
                </ul>
            </div>
            <div className="btns flex">
                <button className="btn btn-edit" onClick={this.editMovie}>
                    <FontAwesomeIcon icon="edit" title="edit"/>
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
