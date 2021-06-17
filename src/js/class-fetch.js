const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'd2f58f193ec10f64760e31baa52fd192';



export default class FilmsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
      }
//Alex Code
    fetchTrendingMovies(currentPage = 1){
        const url = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${currentPage}`;

        return fetch(url)
        .then(r => r.json())
      
        .then(data => {
          return data.results;
        })
    }

    fetchGenres() {
        const url =`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
        return fetch(url)
          .then(r => r.json())
          .then(data => {
            return data.genres;
          });
    }

    fetchMoviesByKeyWord(query) {
      const url = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`;
      return fetch(url)
        .then(r => r.json())
        .then(data => {
          return data.results;
        });
}
    
    fetchMovieDetails (id) {
        const url =`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`;
        return fetch(url)
        .then(r => r.json())
        .then(data => {
            return {
            id: data.id,
            title: data.original_title,
            genres: data.genres.slice(0, 2).map(({ name }) => name),
            about: data.overview,
            popularity: data.popularity,
            vote: data.vote_average,
            votes: data.vote_count,
            release: data.release_date.substring(0, 4),
            poster_path: data.poster_path,
            };
        })  
    }

    fetchOpenVideo (id) {
        const url =`${BASE_URL}movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
        return fetch(url)
        .then(r =>
                r.json().then(data => {
                  return { id: data.results[0].key };
                }),
              )
    }
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
 
}


