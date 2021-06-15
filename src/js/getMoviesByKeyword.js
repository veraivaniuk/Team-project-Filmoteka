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
refs.onHomeBtn.addEventListener('click', onHomeBtnClick);
refs.onLibraryBtn.addEventListener('click', onLibraryBtnClick);
refs.inputEl.addEventListener('savedInput', onEnterSearchQuery);

function onEnterSearchQuery(event) {
  const query = event.target.value;

  if (!query) {
    hideWarningMessage();
    sessionStorage.removeItem('searchQuery');
    refs.gallery.innerHTML = '';
    getDayMovies();
    return;
  }

  sessionStorage.setItem('searchQuery', query);
  const genres = fetchGenres();
  const movies = fetchMoviesByKeyWord(query);

  Promise.all([genres, movies]).then(getMovieGenres).then(getPoster).then(renderPicturesGallery);
}

function renderPicturesGallery(movies) {
  if (movies.length === 0) {
    sessionStorage.removeItem('searchQuery');
    showWarningMessage();
    return;
  }

  hideWarningMessage();
  const markup = movieCard(movies);
  refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onHomeBtnClick() {
  const savedQuery = sessionStorage.getItem('searchQuery');

  if (savedQuery) {
    refs.gallery.innerHTML = '';
    refs.inputEl.value = savedQuery;
    refs.inputEl.dispatchEvent(new Event('savedInput', { bubbles: false }));
  }
}

function onLibraryBtnClick() {
  refs.inputEl.value = '';
  hideWarningMessage();
}
