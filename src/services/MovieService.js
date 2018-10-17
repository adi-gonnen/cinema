
import axios from 'axios';
import uniqid from 'uniqid'
import swal from "sweetalert";
const API_KEY = 'cf5f5d9f';
var MOVIES = null;


function loadMovies() {
    // console.log(MOVIES);
    if (MOVIES === null) {
        return axios.get(`http://www.omdbapi.com/?s=job&type=movie&page=3&apikey=${API_KEY}`)
        .then(res => {
            // console.log(res.data.Search);            
            MOVIES = [];
            var prms = []
            res.data.Search.forEach(movie => {
                prms.push(getMovieById(movie.imdbID)
                .then (data  => {
                    // console.log('movie from service: ', movie);                
                    MOVIES.push(data)
                    // console.log('movies:', MOVIES);
                }))
            })
            return Promise.all(prms);
            // MOVIES = res.data.Search;
        }).then ( () => {
            // console.log('service:', MOVIES);
            return MOVIES
        })
    } else return Promise.resolve(MOVIES);
}

function getMovies() {
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
        // MOVIES = Object.assign({}, MOVIES);
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
  
  function checkDuplicate(newMovie) {
    var duplicate = false;
    MOVIES.some(movie => {
        // console.log('name:', movie.Title);
        if (newMovie.Title === movie.Title) {
            if (newMovie.imdbID !== movie.imdbID) {         //not the same movie
                duplicate = true;
                swal("This movie already Exist!").then( () => {
                    // console.log('duplicate1: ', duplicate);    
                    return false;
                })
                // return false
            }
        }
    });
    return duplicate;
  }

  function saveMovie(newMovie) {
    var duplicate = false;
    MOVIES.some(movie => {
        // console.log('name:', movie.Title);
        if (newMovie.Title === movie.Title) {
            if (newMovie.imdbID !== movie.imdbID) {         //not the same movie
                duplicate = true;
                swal("This movie already Exist!").then( () => {
                    // console.log('duplicate1: ', duplicate);    
                    return false;
                })
                // return false
            }
        }
    });
    // console.log('duplicate2: ', duplicate);    
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
    loadMovies,
    deleteMovie,
    checkDuplicate
}