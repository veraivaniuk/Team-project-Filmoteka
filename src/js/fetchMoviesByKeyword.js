const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'd2f58f193ec10f64760e31baa52fd192';

export function fetchMoviesByKeyWord(query) {
  return fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`,
  )
    .then(r => r.json())
    .then(data => {
      return data.results;
    });
}
