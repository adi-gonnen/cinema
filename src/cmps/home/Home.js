import React , { Component } from 'react';
import MoviePreview from '../moviePreview/MoviePreview';
import MovieService from '../../services/MovieService';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Home.css';

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            add: false,
            movies: [],  
            img: null,
            searchWord: '',
            numberOfPage: 1
        }
    }
    addMovie = () => {
        this.setState({add: !this.state.add})
    }
    handleSearch = (event) => {
        this.searchWord = event.target.value;
    }
    searchMovie = () => {
        console.log(this.searchWord); 
        this.numberOfPage = 1;       
        MovieService.addSearchWord(this.searchWord);
        MovieService.loadMovies()
        .then(res => {
            console.log('movies with search: ', res);            
            this.setState({movies: res});
        });
    }
    nextMovies = () => {
        console.log('page before: ', this.state.numberOfPage);        
        this.setState({numberOfPage: +this.state.numberOfPage + 1});
        console.log('page after: ', this.state.numberOfPage);        
        MovieService.getNextPage(this.state.numberOfPage);
        MovieService.loadMovies()
        .then(res => {
            console.log('movies with search: ', res);            
            this.setState({movies: res});
        });
    }
    componentDidMount() {
        console.log('page did mount: ', this.state.numberOfPage);   
        MovieService.loadMovies()
        .then(res => {
            this.setState({movies: res});
        });
    }

    render() {
        if (this.state.add) {
            return <Redirect to={{pathname: `/movie/edit/new`, updateMovie: this.updateMovie}} />
        }
        return (
        <div className="movies flex column">
            <div className="sub-title flex">
                <p>search movies:</p>
                <div className="serach-container flex">
                    <input placeholder="enter key word/s" className="search-line"
                        onChange={this.handleSearch}/>
                    <button onClick={this.searchMovie} className="btn search-btn">
                        <div className="flex search">
                            <FontAwesomeIcon icon="search" title="search movie"/>
                        </div>
                    </button>
                </div>
                <div className="btns-home-container flex">
                    <button onClick={this.nextMovies} className="btn next-btn">
                        <div className="flex next-arrow">
                            <FontAwesomeIcon icon="chevron-circle-right" title="next 10 movies"/>
                        </div>
                    </button>
                    <button onClick={this.addMovie} className="btn add-btn">
                        <div className="flex plus-add">
                            <FontAwesomeIcon icon="plus" title="add movie"/>
                        </div>
                    </button>
                </div>
            </div>
            <div className="movie-preview">
                <ul className="movies-list flex">
                    {this.state.movies && this.state.movies.map(movie => (
                        <li className="movie-list" key={movie.imdbID}>
                            <MoviePreview movie={movie}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        )
    }
}
