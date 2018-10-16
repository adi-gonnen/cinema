
import axios from 'axios';
import uniqid from 'uniqid'

const API_KEY = 'cf5f5d9f';
// var MOVIES = [{imdbID: 'tt554433', Title: 'dsaS JJkk', Genre: 'ffff'}, {imdbID: 'tt557433', Title: 'dffsaS JJkk'}]; 
var MOVIES = null;


function getMovies() {
    // console.log(MOVIES);
    if (MOVIES === null) {
        return axios.get(`http://www.omdbapi.com/?s=first&page=2&apikey=${API_KEY}`)
        .then(res => {
            MOVIES = res.data.Search;
            // console.log('service:', MOVIES);
            return MOVIES
        })
    } else return Promise.resolve(MOVIES);
}

function getUpdatedMovies() {
    if (MOVIES !== null) return MOVIES
}

function getMovieById(id) {
    return axios.get(`http://www.omdbapi.com/?i=${id}&page=2&apikey=${API_KEY}`)
        .then(res => {
            // console.log('service:', res.data);
            return res.data
        })
}


function _updateMovie(movie) {
    // console.log('movie to update: ', movie.Title);    
    // return new Promise((resolve, reject) => { 
        // console.log('_update ', MOVIES[0]);        
        const idx = MOVIES.findIndex( m => movie.imdbID === m.imdbID)
        if (idx !== -1) {
            MOVIES[idx] = movie
            // console.log('update', idx, movie.Title);
        }
        // resolve(movie)
    // })
  }
  
  function _addMovie(movie) {
    return new Promise((resolve, reject) => { 
        movie.imdbId = uniqid()
        MOVIES.push(movie)
        resolve(movie)
    })
  }
  
  function saveMovie(newMovie) {
    var duplicate = false;
    MOVIES.some(movie => {
        console.log('name:', movie.Title);
        if (newMovie.Title === movie.Title) {
            duplicate = true;
            return false
        }
    });
    if (!duplicate) return newMovie.imdbID ? _updateMovie(newMovie) : _addMovie(newMovie)
  }

  function deleteMovie(id) {
    return new Promise((resolve, reject) => { 
      const idx = MOVIES.findIndex( movie => movie.imdbID === id)
      if (idx !== -1) {
        MOVIES.splice(idx, 1)
      }
      resolve()
    })
  }
export default {
    getMovies,
    getMovieById,
    saveMovie,
    getUpdatedMovies,
    deleteMovie
}