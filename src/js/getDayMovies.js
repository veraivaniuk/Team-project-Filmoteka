import cardsLits from '../templates/film-list.hbs';
import { refs } from './refs';
import getGenres from './getGenres.js';

export function getDayMovies() {
  const BASE_URL = 'https://api.themoviedb.org/3/';
  fetch(`${BASE_URL}trending/movie/day?api_key=d2f58f193ec10f64760e31baa52fd192&page=1`)
    .then(r => r.json())
    .then(data => {
      return data.results;
    })
    .then(data => {
      const res = getGenres(data);
      return res;
    })
    .then(renderPicturesGallery);
}

function renderPicturesGallery(movies) {
  const markup = cardsLits(movies);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
