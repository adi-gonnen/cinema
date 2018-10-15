import React, {Component} from 'react';
import './MovieEdit.css';
import MovieService from '../../services/MovieService';
import { Route, Redirect } from 'react-router-dom';;

export default class MovieDetails extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cancel: false,
            movieId: this.props.match.params.movieId,
            movie: {},
        };
        this.saveMovie = this.saveMovie.bind(this);  
    } 
    componentDidMount() {
        // console.log('id', this.state.MovieId);
        MovieService.getMovieById(this.state.movieId)
        .then(data => {
            // console.log('movie$$', data);
            this.setState({movie: data});
        });
    }
    cancel = () => {
        this.setState({cancel: !this.state.cancel})
        // console.log('back', this.state.back);
    }
    saveMovie(event) {
        event.preventDefault();
        // this.props.actions.updateMovie(this.state.movie);
        MovieService.saveMovie(this.state.movie);
        this.setState({cancel: !this.state.cancel})
        // console.log('movie@@', this.state.movie);
    }
    handleTitle = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Title = event.target.value;
        this.setState({movie: newMovie});
        // console.log('movie@@', this.state.movie);
    }
    handleDirector = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Director = event.target.value;
        this.setState({movie: newMovie});
        // console.log('movie@@', this.state.movie);
    }
    handleYear = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Year = event.target.value;
        this.setState({movie: newMovie});
        // console.log('movie@@', this.state.movie);
    }
    handleRuntime = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Runtime = event.target.value;
        this.setState({movie: newMovie});
        // console.log('movie@@', this.state.movie);
    }
    handleGenre = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Genre = event.target.value;
        this.setState({movie: newMovie});
        // console.log('movie@@', this.state.movie);
    }
    render() {
        if (this.state.cancel) {
            return <Redirect to={`/movie`} />
        }
        const movie = this.state.movie;
        return (
            <div className="edit flex column">
                <h1 className="edit-title">{movie.Title? 'Edit' : 'Add'}</h1>
                <div className="form-edit flex column">
                    <div className="input-container flex">
                        <p>Title:</p>
                        <input value={movie.Title} 
                            className = "input-edit" type="text"
                            onChange={this.handleTitle}/>
                    </div>
                    <div className="input-container flex">
                       <p>Director: </p> 
                        <input value={movie? movie.Director : ''}
                            className = "input-edit" type="text"
                            onChange={this.handleDirector}/>
                    </div>
                    <div className="input-container flex">
                        <p>Year: </p>
                        <input value={movie? movie.Year : ''}
                            className = "input-edit" type="number"
                            onChange={this.handleYear}/>
                    </div>
                    <div className="input-container flex">
                        <p>runtime: </p>
                        <input value={movie? movie.Runtime : ''}
                            className = "input-edit" type="text"
                            onChange={this.handleRuntime}/>
                    </div>
                    <div className="input-container flex">
                        <p>genre: </p>
                        <input value={movie? movie.Genre : ''}
                            className = "input-edit" type="text"
                            onChange={this.handleGenre}/>
                    </div>
                </div>
                <div className="btns flex">
                    <button className="btn" onClick={this.saveMovie}>save</button>
                    <button className="btn" onClick={this.cancel}>cancel</button>
                </div>
            </div>
        )
    }
}