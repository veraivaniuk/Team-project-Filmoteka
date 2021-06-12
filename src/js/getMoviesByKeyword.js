/* Функция получает и рендерит первую страницу фильмов по ключевому слову */

import { refs } from './refs';
import movieCard from '../templates/movieCard.hbs';

import { createWarningMessageEl, showWarningMessage, hideWarningMessage } from './warning-msg.js';

import { fetchGenres } from './fetchGenresList';
import { fetchMoviesByKeyWord } from './fetchMoviesByKeyword';
import { getMovieGenres } from './fetchGenresList';
import getPoster from './getPoster.js';
import { getDayMovies } from './getDayMovies';

import debounce from 'lodash.debounce';

createWarningMessageEl();

refs.inputEl.addEventListener('input', debounce(onEnterSearchQuery, 700));

function onEnterSearchQuery(event) {
  const query = event.target.value;
  localStorage.setItem('searchQuery', query);

  if (!query) {
    hideWarningMessage();
    refs.gallery.innerHTML = '';
    getDayMovies();
    return;
  }

  const genres = fetchGenres();
  const movies = fetchMoviesByKeyWord(query);

  Promise.all([genres, movies]).then(getMovieGenres).then(getPoster).then(renderPicturesGallery);

  // fetchMoviesByKeyWord(query).then(getGenres).then(getPoster).then(renderPicturesGallery);
}

function renderPicturesGallery(movies) {
  if (movies.length === 0) {
    showWarningMessage();
    return;
  }

  hideWarningMessage();
  const markup = movieCard(movies);
  refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
