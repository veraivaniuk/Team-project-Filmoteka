const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a27a3ebf69aa4114a466dc0f7f2b47a4';

export function fetchMoviesByKeyWord(query) {
  return fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`,
  )
    .then(r => r.json())
    .then(data => {
      return data.results;
    });
}
