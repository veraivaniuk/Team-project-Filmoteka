import cardsLits from '../templates/film-list.hbs';
const refs = {
  gallery: document.querySelector('.card-list-container'),
};

const BASE_URL = 'https://api.themoviedb.org/3/';
fetch(`${BASE_URL}trending/movie/day?api_key=d2f58f193ec10f64760e31baa52fd192&page=1`)
  .then(r => r.json())
  .then(data => {
    return data.results;
  })
  .then(renderPicturesGallery);

function renderPicturesGallery(movies) {
  const markup = cardsLits(movies);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
