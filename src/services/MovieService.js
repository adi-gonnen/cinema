
import axios from 'axios';
import uniqid from 'uniqid'
import swal from "sweetalert";
const API_KEY = 'cf5f5d9f';
var MOVIES = null;


function loadMovies() {
    // console.log(MOVIES);
    if (MOVIES === null) {
        return axios.get(`https://www.omdbapi.com/?s=job&type=movie&page=3&apikey=${API_KEY}`)
        .then(res => {
            // console.log(res.data.Search);            
            MOVIES = [];
            var prms = []
            res.data.Search.forEach(movie => {
                prms.push(getMovieById(movie.imdbID)
                .then (data  => {
                    // var date = new Date();
                    // date.setTime(Date.parse(data.Released));
                    // data.Released = data;
                    // console.log('movie from service: ', movie);                
                    MOVIES.push(data)
                    // console.log('movies:', MOVIES);
                }))
            })
            return Promise.all(prms);
            // MOVIES = res.data.Search;
        }).then ( () => {

            MOVIES.sort( (a,b) => {
                var timeA = a.Runtime.toLowerCase();
                var timeB = b.Runtime.toLowerCase();
                if (timeA < timeB) return -1;
                if (timeA > timeB) return 1;
                return 0;            
            })
            // console.log('service:', MOVIES);
            return MOVIES
        })
    } else return Promise.resolve(MOVIES);
}

function getMovies() {
    if (MOVIES !== null) return MOVIES
}

function getMovieById(id) {
    return axios.get(`https://www.omdbapi.com/?i=${id}&page=2&apikey=${API_KEY}`)
        .then(res => {
            // console.log('service:', res.data);
            return res.data
        })
}

function searchMovieById(id) {
    // console.log('id service:', id);
    var movie = {};
    MOVIES.some(currMovie => {
        if (id === currMovie.imdbID) {
            // console.log('movie-service:', currMovie);
            movie = currMovie;
        }
    })
    return movie;
}

function _updateMovie(movie) {
    console.log('movies before save: ', MOVIES);    
    return new Promise((resolve, reject) => { 
        // console.log('_update ', MOVIES[0]);        
        const idx = MOVIES.findIndex( m => movie.imdbID === m.imdbID)
        if (idx !== -1) {
            MOVIES[idx] = movie;
            // console.log('update', idx, movie.Title);
        }
        // MOVIES = Object.assign({}, MOVIES);
        resolve(movie);
        swal("Your movie has been saved!", {
            icon: "success",
            timer: 2000,
            className: "swal-text",
            button: false
        });
        console.log('movies after save: ', MOVIES);    
    })
  }
  
  function _addMovie(movie) {
    return new Promise((resolve, reject) => { 
        movie.imdbID = uniqid();
        // movie.Year = '2018';
        // console.log('year: ', movie.Released);        
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
        // console.log('name:', movie.Title);
        if (title.toLowerCase() === movie.Title.toLowerCase()) {
            if (id !== movie.imdbID) {         //not the same movie
                duplicate = true;
                swal("This movie already Exist!").then( () => {
                    // console.log('duplicate1: ', duplicate);    
                    return;
                })
                // return false
            }
        }
    });
    return duplicate;
  }

  function saveMovie(newMovie) {
    return newMovie.imdbID ? _updateMovie(newMovie) : _addMovie(newMovie)
  }

  function deleteMovie(id) {
    console.log('movies before delete: ', MOVIES); 
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
                //   console.log('deleted!');        
                }
                console.log('movies after delete: ', MOVIES); 
                resolve()
                // return MOVIES;
            })
            .then(() => {
                // this.setState({cancel: !this.state.cancel})
                swal("Your movie has been deleted!", {
                    icon: "success",
                    timer: 2000,
                    className: "swal-text",
                    button: false
                });
            });
        } else swal.close();
    });
// MovieService.deleteMovie(this.state.movieId);
// this.setState({cancel: !this.state.cancel})
}
//   function deleteMovie(id) {
//       console.log('id: ', id);      
//     return new Promise((resolve, reject) => { 
//       const idx = MOVIES.findIndex( movie => movie.imdbID === id)
//       if (idx !== -1) {
//         MOVIES.splice(idx, 1)
//         console.log('deleted!');        
//       }
//       resolve()
//     })
//   }

  function convertMonth(int) { 
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let i=0; i<months.length; i++) {
        if (i === int) return months[i]
    }
}
export default {
    getMovies,
    getMovieById,
    saveMovie,
    loadMovies,
    deleteMovie,
    // setDelete,
    checkDuplicate,
    searchMovieById,
    convertMonth
}