import cardsLits from '../templates/film-list.hbs';

import { refs } from './refs';


import modalCard from '../templates/film-modal.hbs';
import getGenres from './getGenres.js';
import removeEventListener from './removerEventListener';


// Fetch main page

const BASE_URL = 'https://api.themoviedb.org/3/';
const apiKey = 'd2f58f193ec10f64760e31baa52fd192';

fetch(`${BASE_URL}trending/movie/day?api_key=${apiKey}`)
  .then(r => r.json())

  .then(data => {
    return data.results;
  })
  .then(getGenres)
  .then(renderFilmsGallery);

function renderFilmsGallery(movies) {
  const markup = cardsLits(movies);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
// Fetch film-details page
refs.gallery.addEventListener('click', e => {
  const id = e.target.getAttribute('id');

  if (e.target.nodeName !== 'IMG') {
    return;
  } else {
    fetch(`${BASE_URL}movie/${id}?api_key=d2f58f193ec10f64760e31baa52fd192&language=en-US`)
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
          poster: data.poster_path,
        };
      })
      .then(renderCard);

    pressESC();

    refs.lightbox.classList.add('is-open');
  }
});

//Render Details Card
function renderCard(data) {
  const markupCard = modalCard(data);

  refs.lightboxContent.insertAdjacentHTML('beforeend', markupCard);
}

function pressESC(e) {
  const pressEscEventListener = window.addEventListener('keyup', e => {
    if (refs.lightbox.classList.contains('is-open')) {
      let key = e.keyCode;

      if (key === 27) {
        refs.lightbox.classList.remove('is-open');
        refs.lightboxContent.innerHTML = '';
        renderFilmsGallery();
        removeEventListener(pressEscEventListener);
      }
    }
  });
}

const pressOverlayListener = refs.lightboxOverlay.addEventListener('click', () => {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxContent.innerHTML = '';
  renderFilmsGallery();
  removeEventListener(pressOverlayListener);
});
