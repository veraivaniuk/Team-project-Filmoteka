//FT-14 По нажатию на кнопку "Watched" показываются просмотренные фильмы пользователя (local-storage)
import cardTemplate from '../templates/film-list.hbs';


refs = {
    btnWatched: document.querySelector('.btn-watched'),
    btnQueue: document.querySelector('btn-queue')
}

refs.btnWatched.addEventListener('click', onWatchedMovies)


function onWatchedMovies() {

    const movies = localStorage.getItem(key)
    renderFilmsGallery(movies);
}

function renderFilmsGallery(movies) {
  const markup = cardTemplate(movies);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}