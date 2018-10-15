
import axios from 'axios';
import uniqid from 'uniqid'

const API_KEY = 'cf5f5d9f';
var MOVIES = [];


function uploadMovies() {
    return axios.get(`http://www.omdbapi.com/?s=first&page=2&apikey=${API_KEY}`)
    .then(res => {
        // console.log('service:', res.data.Search);
        MOVIES = res.data.Search;
        return MOVIES
    })
}

function getMovies() {
    console.log('MOVIES:', MOVIES);
    return Promise.resolve({MOVIES});
}

function getMovieById(id) {
    return axios.get(`http://www.omdbapi.com/?i=${id}&page=2&apikey=${API_KEY}`)
        .then(res => {
            // console.log('service:', res.data);
            return res.data
        })
}


function _updateMovie(movie) {
    console.log('movie to update: ', movie);    
    return new Promise((resolve, reject) => { 
      const index = MOVIES.findIndex( m => movie.imdbID === m.imdbID)
      if (index !== -1) {
        MOVIES[index] = movie
      }
      resolve(movie)
    })
  }
  
  function _addMovie(movie) {
    return new Promise((resolve, reject) => { 
        movie.imdbId = uniqid()
        MOVIES.push(movie)
        resolve(movie)
    })
  }
  
  function saveMovie(movie) {
    console.log('movie to edit: ', movie);  
    return movie.imdbID ? _updateMovie(movie) : _addMovie(movie)
  }
export default {
    uploadMovies,
    getMovies,
    getMovieById,
    saveMovie
}