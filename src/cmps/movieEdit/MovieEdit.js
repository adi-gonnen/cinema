import React, {Component} from 'react';
import MovieService from '../../services/MovieService';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from "sweetalert";
import './MovieEdit.css';

export default class MovieDetails extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cancel: false,
            movieId: this.props.match.params.movieId,
            movie: {},
            movieDate: null
        };
        this.saveMovie = this.saveMovie.bind(this);  
    } 
    componentDidMount() {
        var currMovie = MovieService.searchMovieById(this.state.movieId)
        this.setState({movie: currMovie});
    }
    cancel = () => {
        this.setState({cancel: !this.state.cancel})
    }
    saveMovie(event) {
        const movie = this.state.movie;
        if (this.state.movieDate) movie.Released = this.state.movieDate;
        console.log('movie to be saved:', movie);
        var keyCount = 0;           //avoid empty lines for edited and new movie
        for (var key in movie) {
            if (movie[key] === '') {
                swal("Fill all fields!").then( () => {
                    return;
                })
                return
            }    
            keyCount++;   
        }
        if (keyCount < 5) {         //avoid empty lines for a new movie
            swal("Fill all fields!").then( () => {
                return;
            })
            return
        }
        var title = movie.Title
        for (let i=0; i<title.length; i++) {
            var newTitle = title;
            if (
                (title.charCodeAt(i) !==32 && title.charCodeAt(i) < 65 ) ||
                title.charCodeAt(i) > 122 ||
                (title.charCodeAt(i) > 90 && title.charCodeAt(i) < 97)
                ) {
                    newTitle = title.substring(0,i) + title.substring(i+1, title.length); 
                    i--;
                    title = newTitle; 
                }
        }
        const duplicate = MovieService.checkDuplicate(title, this.state.movieId);
        if (duplicate) return;
        movie.Title = title;
        event.preventDefault();
        MovieService.saveMovie(movie);
        this.setState({cancel: !this.state.cancel});
    }
    handleTitle = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Title = event.target.value;
        this.setState({movie: newMovie});
    }
    handleDirector = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Director = event.target.value;
        this.setState({movie: newMovie});
    }
    handleYear = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Year = event.target.value;
        this.setState({movie: newMovie});
    }
    handleReleased = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        var dateReleased = Date.parse(event.target.value);
        var newDate = new Date(dateReleased);
        var fullDate = '';
        var month = MovieService.convertMonth(newDate.getMonth());
        fullDate = newDate.getDate()+' ' + month +' ' + newDate.getFullYear();
        newMovie.Year = newDate.getFullYear();
        newMovie.Released = event.target.value;
        this.setState({movieDate: fullDate});
        this.setState({movie: newMovie});
    }
    handleRuntime = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Runtime = event.target.value;
        this.setState({movie: newMovie});
    }
    handleGenre = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Genre = event.target.value;
        this.setState({movie: newMovie});
    }
    delete = () => {
        MovieService.deleteMovie(this.state.movieId)
        .then ( () => {
            this.setState({cancel: !this.state.cancel})
        })
    }
    
    render() {
        if (this.state.cancel) {
            return <Redirect to={`/`} />
        }
        const movie = this.state.movie;
        var date = new Date();
        date.setTime(Date.parse(movie.Released));

        return (
            <div className="edit flex column">
                <h1 className="edit-title">{movie.imdbID? 'Edit' : 'Add Movie'}</h1>
                <div className="form-edit flex column">
                    <div className="input-container flex">
                        <p>Title:</p>
                        <input value={this.state.movie.Title} 
                            className = "input-edit" type="text"
                            onChange={this.handleTitle}/>
                    </div>
                    <div className="input-container flex">
                       <p>Director: </p> 
                        <input value={this.state.movie.Director}
                            className = "input-edit" type="text"
                            onChange={this.handleDirector}/>
                    </div>
                    <div className="input-container flex">
                        <p>Released: </p>
                        <input value={this.state.movie.Released}
                            className = "input-edit" type="date"
                            onChange={this.handleReleased}/>
                    </div>
                    <div className="input-container flex">
                        <p>runtime: </p>
                        <input value={this.state.movie.Runtime}
                            className = "input-edit" type="text"
                            onChange={this.handleRuntime}/>
                    </div>
                    <div className="input-container flex">
                        <p>genre: </p>
                        <input value={this.state.movie.Genre}
                            className = "input-edit" type="text"
                            onChange={this.handleGenre}/>
                    </div>
                    <div className="btns btns-edit flex">
                        <button className="btn" onClick={this.saveMovie}>
                            <FontAwesomeIcon icon="save" title="save"/>
                        </button>
                        <button className="btn btn-delete ml15" onClick={this.delete}>
                            <FontAwesomeIcon icon="trash-alt" title="delete"/>
                        </button>
                        <button className="btn btn-back ml15" onClick={this.cancel}>
                            <FontAwesomeIcon icon="undo" title="back"/> 
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}