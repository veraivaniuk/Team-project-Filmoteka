//FT-14 По нажатию на кнопку "Watched" показываются просмотренные фильмы пользователя (local-storage)
//import cardTemplate from '../templates/film-list.hbs';
import { refs } from './refs.js';
import cardTemplate from '../templates/cardTemplate.hbs';
import cardsLits from '../templates/film-list.hbs';
import getGenres from './getGenres.js';
import { pnotifyNotice } from './pnotify.js';
import { hideWarningMessage } from './warning-msg.js';
import getPoster from './getPoster.js';
import getPosterModal from './getPosterModal.js';

const BASE_URL = 'https://api.themoviedb.org/3/';
const apiKey = 'd2f58f193ec10f64760e31baa52fd192';

refs.onWatchedBtn.addEventListener('click', onMyLibaMovies);
refs.onQueueBtn.addEventListener('click', onMyLibaMovies);

// get data fon localStorage
function onMyLibaMovies(e, key = e.target.getAttribute('id')) {
  refs.gallery.innerHTML = '';
  console.log(key);
  //let key = e.target.getAttribute('id');

  try {
    const serializedState = localStorage.getItem(key);
    const movies = JSON.parse(serializedState);
    renderFilmsGalleryOnLiba(movies);
  } catch (err) {
    console.error('Get state error: ', err);
  }
}

function onMyLibaMoviesQueue(e) {
  //const qurue = 'queue';
  return onMyLibaMovies(e, 'queue');
}

function renderFilmsGalleryOnLiba(movies) {
  const markup = cardTemplate(movies);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

//add to  localStorage
refs.lightboxContent.addEventListener('click', addTolocalStorage);


function addTolocalStorage(e) {
  if (e.target.nodeName !== 'BUTTON' || e.target.dataset.action === 'close-lightbox') {
     return;
   } else {
    let localStorageKey = '';
    const idMovie = e.target.getAttribute('id');
    localStorageKey = e.target.dataset.action;
    let existingEntries = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    if (existingEntries === null) existingEntries = [];
    if (existingEntries.find(entry => entry.id == idMovie)) {
      return pnotifyNotice();
    } else {
      fetch(`${BASE_URL}movie/${idMovie}?api_key=d2f58f193ec10f64760e31baa52fd192&language=en-US`)
        .then(r => r.json())
        .then(data => {
          return {
            id: data.id,
            title: data.original_title,
            genres: data.genres.slice(0, 2).map(({ name }) => name),
            vote: data.vote_average,
            release: data.release_date.substring(0, 4),
            poster_path: data.poster_path,
          };
        })
        .then(getPosterModal)
        .then(movieData => {
          try {
            if (existingEntries === null) existingEntries = [];

            existingEntries.push(movieData);
            localStorage.setItem(localStorageKey, JSON.stringify(existingEntries));
          } catch (err) {
            console.error('Set state error: ', err);
          }
        });
    }
  }
}

function fetchTrendingMovie() {
  refs.gallery.innerHTML = '';
  fetch(`${BASE_URL}trending/movie/day?api_key=${apiKey}`)
    .then(r => r.json())

    .then(data => {
      return data.results;
    })
    .then(getPoster)
    .then(getGenres)
    .then(renderFilmsGallery);
}

function renderFilmsGallery(movies) {
  const markup = cardsLits(movies);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

refs.onHomeBtn.addEventListener('click', fetchTrendingMovie);
refs.onLibraryBtn.addEventListener('click', hideWarningMessage);
refs.onLibraryBtn.addEventListener('click', onMyLibaMoviesQueue);

