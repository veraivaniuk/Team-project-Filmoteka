// import cardsLits from '../templates/film-list.hbs';

/* Функция получает и рендерит первую страницу фильмов по ключевому слову */
//import searchWarning from '../templates/searchWarning.hbs';
import movieCard from '../templates/movieCard.hbs';
import { createWarningMessageEl, showWarningMessage, hideWarningMessage } from './warning-msg.js';
import { refs } from './refs';
import { fetchGenres } from './fetchGenresList';
import { fetchMoviesByKeyWord } from './fetchMoviesByKeyword';
import debounce from 'lodash.debounce';
import { getDayMovies } from './getDayMovies';
import getGenres from './getGenres.js';

createWarningMessageEl();

refs.inputEl.addEventListener('input', debounce(onEnterSearchQuery, 700));

function onEnterSearchQuery(event) {
  const query = event.target.value;
  localStorage.setItem('searchQuery', query);

  if (!query) {
    // зарендерить галлерею актуальных фильмов
    hideWarningMessage();
    refs.gallery.innerHTML = '';
    getDayMovies();
    return;
  }
  fetchMoviesByKeyWord(query).then(getGenres).then(renderPicturesGallery);
}

// const genres = fetchGenres();
// const movies = fetchMoviesByKeyWord();

// Promise.all([genres, movies]).then(value => {
//   const genres = value[0];

//   console.log(genres);
//   const moviesGenres = value[1].map(movie => movie.genre_ids);
//   console.log(moviesGenres);
//   moviesGenres.map(movie => {
//     movie.map(id => {
//       console.log(id);
//     });
//   });
//   renderPicturesGallery(value[1]);
// });

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
