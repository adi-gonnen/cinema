import MovieStore from './MovieStore';

import MovieService from '../services/MovieService';

class RootStore {
  constructor() {
    this.MovieStore = new MovieStore(this, MovieService);
  }
}
export default RootStore;
