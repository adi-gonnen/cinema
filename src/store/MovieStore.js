import { observable, action, computed } from 'mobx';
class MovieStore {
  @observable
  movies = [];
  @computed
  get count() {
    return this.movies.length;
  }
  constructor(rootStore, MovieStore, apiService) {
    this.rootStore = rootStore;
    this.MovieStore = MovieStore;
    // this.apiService = apiService;
  }

  @action
//   addMovie(title) {
//     this.apiService.addMovie(title).then(movies => {
//       this.movies = movies;
//     });
//   }

  @action
  getMovies(term) {
    this.MovieStore.uploadMovies({ term })
    .then(movies => {
      this.movies = movies;
    });
  }
}
export default MovieStore;
