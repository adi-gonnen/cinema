
import axios from 'axios';
import uniqid from 'uniqid'
import swal from "sweetalert";
const API_KEY = 'cf5f5d9f';
var MOVIES = null;
var TEMPMOVIES = [];
var KEYWORD = 'job';
var PAGE = 3;


function loadMovies() {
    if (MOVIES === null) {
        return axios.get(`https://www.omdbapi.com/?s=${KEYWORD}&page=${PAGE}&type=movie&apikey=${API_KEY}`)
        .then(res => {
            if (res.data.Error === "Too many results.") {
                swal("Too many results. Try to be more specific").then( () => {
                    return;
                })
                MOVIES = TEMPMOVIES;
            } else {
                MOVIES = [];
                var prms = []
                res.data.Search.forEach(movie => {
                    prms.push(getMovieById(movie.imdbID)
                    .then (data  => {
                        MOVIES.push(data)
                    }))
                })
                return Promise.all(prms);
            }
        }).then ( () => {
            console.log('then:' , MOVIES);    
            MOVIES.sort( (a,b) => {
                var timeA = a.Runtime.toLowerCase();
                var timeB = b.Runtime.toLowerCase();
                if (timeA < timeB) return -1;
                if (timeA > timeB) return 1;
                return 0;            
            })
            // console.log('movies:', MOVIES);            
            return MOVIES
        })
    } else return Promise.resolve(MOVIES);
}

function getMovies() {
    if (MOVIES !== null) return MOVIES
}

function addSearchWord(word) {
    word === ''? KEYWORD = 'first': KEYWORD = word;
    PAGE = 1;
    TEMPMOVIES = MOVIES;
    MOVIES = null;
    console.log('key word: ', KEYWORD);    
}

function getNextPage(number) {
    PAGE = number;
    MOVIES = null;
    console.log('page-service: ', PAGE);  
}

function getMovieById(id) {
    return axios.get(`https://www.omdbapi.com/?i=${id}&page=2&apikey=${API_KEY}`)
        .then(res => {
            // console.log('service:', res.data);
            return res.data
        })
}

function searchMovieById(id) {
    var movie = {};
    MOVIES.some(currMovie => {
        if (id === currMovie.imdbID) {
            movie = currMovie;
        }
    })
    return movie;
}

function _updateMovie(movie) {
    return new Promise((resolve, reject) => { 
        const idx = MOVIES.findIndex( m => movie.imdbID === m.imdbID)
        if (idx !== -1) {
            MOVIES[idx] = movie;
        }
        resolve(movie);
        swal("Your movie has been saved!", {
            icon: "success",
            timer: 2000,
            className: "swal-text",
            button: false
        });
    })
  }
  
  function _addMovie(movie) {
    return new Promise((resolve, reject) => { 
        movie.imdbID = uniqid();
        movie.Poster = 'img/movie3.png';
        MOVIES.push(movie);
        resolve(movie);
        swal("Your movie has been added!", {
            icon: "success",
            timer: 2000,
            className: "swal-text",
            button: false
        });
    })
  }
  
  function checkDuplicate(title, id) {
    var duplicate = false;
    MOVIES.some(movie => {
        if (title.toLowerCase() === movie.Title.toLowerCase()) {
            if (id !== movie.imdbID) {         //not the same movie
                duplicate = true;
                swal("This movie already exist!").then( () => {
                    return duplicate;
                })
            }
        }
    });
    return duplicate;
  }

  function saveMovie(newMovie) {
    return newMovie.imdbID ? _updateMovie(newMovie) : _addMovie(newMovie)
  }

  function deleteMovie(id) {
    return swal({
        title: "Are you sure you want to delete this movie?",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
        className: "swal-warning"
    }).then(willDelete => {
        if (willDelete) {
            return new Promise((resolve, reject) => { 
                const idx = MOVIES.findIndex( movie => movie.imdbID === id)
                if (idx !== -1) {
                  MOVIES.splice(idx, 1)
                }
                resolve()
            })
            .then(() => {
                swal("Your movie has been deleted!", {
                    icon: "success",
                    timer: 2000,
                    className: "swal-text",
                    button: false
                });
            });
        } else swal.close();
    });
}

function convertMonth(int) { 
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let i=0; i<months.length; i++) {
        if (i === int) return months[i]
    }
}
export default {
    getMovies,
    getMovieById,
    addSearchWord,
    getNextPage,
    saveMovie,
    loadMovies,
    deleteMovie,
    checkDuplicate,
    searchMovieById,
    convertMonth
}