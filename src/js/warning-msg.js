import warningMsg from '../templates/warning-message.hbs';
import { refs } from './refs';

let warnMesgEl = '';

export function createWarningMessageEl() {
  let warningMessageMarkup = warningMsg();
  refs.footerEl.insertAdjacentHTML('afterend', warningMessageMarkup);
  warnMesgEl = document.querySelector('.warning-notify');
}

export function showWarningMessage() {
  if (warnMesgEl.classList.contains('visually-hidden')) {
    warnMesgEl.classList.remove('visually-hidden');
  }
}

export function hideWarningMessage() {
  if (!warnMesgEl.classList.contains('visually-hidden')) {
    warnMesgEl.classList.add('visually-hidden');
  }
}
