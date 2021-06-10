import cardsLits from '../templates/film-list.hbs';
import refs from './refs';

const BASE_URL = 'https://api.themoviedb.org/3/';
const apiKey = 'd2f58f193ec10f64760e31baa52fd192';

fetch(`${BASE_URL}trending/movie/day?api_key=${apiKey}`)
  .then(r => r.json())
  .then(data => data.results)
  .then(renderPicturesGallery);

function renderPicturesGallery(movies) {
  const markup = cardsLits(movies);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
