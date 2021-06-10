const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'd2f58f193ec10f64760e31baa52fd192';

export function fetchGenres() {
  return fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(r => r.json())
    .then(data => {
      return data.genres;
    });
}
