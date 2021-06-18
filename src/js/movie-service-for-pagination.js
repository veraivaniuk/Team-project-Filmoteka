import FilmsApiService from './class-fetch.js';
import getGenres from './get-genres';
import getPoster from './get-poster';
import cardsLits from '../templates/film-list.hbs';
import { refs } from './refs.js';
import { getMovieByKeyword } from './get-movies-by-keyword.js';
import { renderFilmsGallery } from './fetch-film-test.js';

const filmsApiService = new FilmsApiService();

refs.paginationRef.addEventListener('click', onCurrentPage);

function onCurrentPage(event) {
    if (event.target.tagName === 'BUTTON') {
      if (Number(event.target.textContent)) {
         let currentPage = Number(event.target.textContent);
        if (refs.inputEl.value === '') {
            refs.gallery.innerHTML = '';
            filmsApiService.fetchTrendingMovies(currentPage)
            .then(getGenres)
            .then(getPoster)
            .then(renderFilmsGallery)
            .catch(error => {
              showWarningMessage(
                'Oops! Something went wrong... Please try again. If the problem persists, contact our customer support',
              );
              console.log(error);
            });
        } else {
          refs.gallery.innerHTML = '';
          getMovieByKeyword(refs.inputEl.value, currentPage)
          .catch(error => {
            showWarningMessage(
              'Oops! Something went wrong... Please try again. If the problem persists, contact our customer support',
            );
            console.log(error);
          });
        };
      }
    };
  }

  
// function renderFilmsGallery(movies) {
//     const markup = cardsLits(movies);
  
//     refs.gallery.insertAdjacentHTML('beforeend', markup);
//   }

  function onCurrentPage(event) {
    if (event.target.tagName === 'BUTTON') {
      if (Number(event.target.textContent)) {
        let currentPage = Number(event.target.textContent);
        if (refs.inputEl.value === '') {
          refs.gallery.innerHTML = '';
          filmsApiService
            .fetchTrendingMovies(currentPage)
            .then(getGenres)
            .then(getPoster)
            .then(renderFilmsGallery)
            .catch(error => {
              showWarningMessage(
                'Oops! Something went wrong... Please try again. If the problem persists, contact our customer support',
              );
              console.log(error);
            });
        } else {
          refs.gallery.innerHTML = '';
          getMovieByKeyword(refs.inputEl.value, currentPage)
          .catch(error => {
            showWarningMessage(
              'Oops! Something went wrong... Please try again. If the problem persists, contact our customer support',
            );
            console.log(error);
          });
        }
      }
    }
  }


    