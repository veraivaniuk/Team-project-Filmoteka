export default function (message) {
  const warningMessageEl = document.createElement('strong');
  warningMessageEl.className = 'input__search-warning';
  warningMessageEl.textContent = message;

  return warningMessageEl;
}
