import FilmsApiService from './class-fetch.js';
import getGenres from './getGenres';
import getPoster from './getPoster';
import cardsLits from '../templates/film-list.hbs';
import { refs } from './refs.js';
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
            .then(renderFilmsGallery);
        };
      }
    };
  }

  
function renderFilmsGallery(movies) {
    const markup = cardsLits(movies);
  
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  }


    