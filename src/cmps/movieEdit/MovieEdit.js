import React, {Component} from 'react';
import './MovieEdit.css';
import MovieService from '../../services/MovieService';
import { Route, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class MovieDetails extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cancel: false,
            movieId: this.props.match.params.movieId,
            movie: {},
            // wrongLine: false
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
        const movie = this.state.movie;
        console.log('movie to be saved:', movie);
        var keyCount = 0;           //avoid empty lines for edited movie
        for (var key in movie) {
            if (movie[key] === '') {
                console.log('fill them all!');
                return;
            }    
            keyCount++;   
        }
        if (keyCount < 7) {         //avoid empty lines for a new movie
            console.log('fill them all!');            
            return;
        }
        var title = movie.Title
        var newTitle = title;
        for (let i=0; i<movie.Title.length; i++) {
            if (
                (title.charCodeAt(i) !==32 && title.charCodeAt(i) < 65 ) ||
                title.charCodeAt(i) > 122 ||
                (title.charCodeAt(i) > 90 && title.charCodeAt(i) < 97)
                ) {
                    console.log('i: ', title[i]);                    
                    newTitle = title.substring(0,i) + title.substring(i+1, title.length); 
                    console.log('wrong!:', newTitle); 
                    title = newTitle; 
                }
        }
        movie.Title = newTitle;
        event.preventDefault();
        MovieService.saveMovie(this.state.movie);
        this.setState({cancel: !this.state.cancel})
    }
    handleTitle = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Title = event.target.value;
        // var title = newMovie.Title
        // var newTitle = title;
        // for (let i=0; i<newMovie.Title.length-1; i++) {
        //     if (
        //         (title.charCodeAt(i) !==32 && title.charCodeAt(i) < 65 ) ||
        //         title.charCodeAt(i) > 122 ||
        //         (title.charCodeAt(i) > 90 && title.charCodeAt(i) < 97)
        //         ) {
                    
        //                 // console.log(title(i));
                        
        //             newTitle = title.substring(0,i) + title.substring(i+1, title.length); 
        //             // title = newTitle;                  
        //             console.log('wrong!:', title);  
        //         }
        // }
        // newMovie.Title = newTitle;
        this.setState({movie: newMovie});
    }
    handleDirector = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Director = event.target.value;
        this.setState({movie: newMovie});
        // if (event.target.value === '')  {
        //     this.setState({wrongLine: true});
        // } else this.setState({wrongLine: false});
    }
    handleYear = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Year = event.target.value;
        this.setState({movie: newMovie});
        // if (event.target.value === '')  {
        //     this.setState({wrongLine: true});
        // } else this.setState({wrongLine: false});
    }
    handleRuntime = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Runtime = event.target.value;
        this.setState({movie: newMovie});
        // if (event.target.value === '')  {
        //     this.setState({wrongLine: true});
        // } else this.setState({wrongLine: false});
    }
    handleGenre = (event) => {
        const newMovie = JSON.parse(JSON.stringify(this.state.movie ))
        newMovie.Genre = event.target.value;
        this.setState({movie: newMovie});
        // if (event.target.value === '')  {
        //     this.setState({wrongLine: true});
        // } else this.setState({wrongLine: false});
    }
    delete = () => {
        MovieService.deleteMovie(this.state.movieId);
        this.setState({cancel: !this.state.cancel})
    }
    render() {
        if (this.state.cancel) {
            return <Redirect to={`/`} />
        }
        const movie = this.state.movie;
        return (
            <div className="edit flex column">
                <h1 className="edit-title">{movie.imdbID? 'Edit' : 'Add'}</h1>
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
                        <p>Year: </p>
                        <input value={this.state.movie.Year}
                            className = "input-edit" type="number"
                            onChange={this.handleYear}/>
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
                </div>
                <div className="btns flex">
                    <button className="btn" onClick={this.saveMovie}>
                        <FontAwesomeIcon icon="save" title="save"/>
                    </button>
                    <button className="btn" onClick={this.delete}>
                        <FontAwesomeIcon icon="trash-alt" title="delete"/>
                    </button>
                    <button className="btn" onClick={this.cancel}>
                        <FontAwesomeIcon icon="undo" title="back"/> 
                    </button>
                </div>
            </div>
        )
    }
}