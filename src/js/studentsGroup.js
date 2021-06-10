import * as basicLightbox from 'basiclightbox';
import vera from '../img/group-vera.jpg';
import denis from '../img/group-denis.jpg';
import yulija from '../img/group-yulija.jpg';
import alexei from '../img/group-alexei.jpg';
import eugenia from '../img/group-eugenia.jpg';
import andrei from '../img/group-andrei.jpg';
import valentina from '../img/group-valentina.jpg';

const groupList = `<div class="group-all">
<div class="group-card">
    <img src="${vera}" alt="Vera" class="group-image">
    <p class="group-name">Vera</p>
    <p class="group-role">TEAM LEAD</p>
   </div>
<div class="group-card">
    <img src="${denis}" alt="Denis" class="group-image">
    <p class="group-name">Denis</p>
    <p class="group-role">SCRUM MASTER</p>
</div>
<div class="group-card">
    <img src="${yulija}" alt="Yulija" class="group-image">
    <p class="group-name">Yulija</p>
    <p class="group-role">DEVELOPER</p>
</div>
<div class="group-card">
    <img src="${alexei}" alt="Alexei" class="group-image">
    <p class="group-name">Alexei</p>
    <p class="group-role">DEVELOPER</p>
</div>
<div class="group-card">
    <img src="${eugenia}" alt="Eugenia" class="group-image">
    <p class="group-name">Eugenia</p>
    <p class="group-role">DEVELOPER</p>
</div>
<div class="group-card">
    <img src="${andrei}" alt="Andrei" class="group-image">
    <p class="group-name">Andrei</p>
    <p class="group-role">DEVELOPER</p>
</div>
<div class="group-card">
    <img src="${valentina}" alt="Valentina" class="group-image">
    <p class="group-name">Valentina</p>
    <p class="group-role">DEVELOPER</p>
</div>
</div>`;

const container = document.querySelector('.js-group-modal');

container.addEventListener('click', openModal);

const modal = basicLightbox.create(groupList);

function openModal(event) {
  modal.show();

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(event) {
    if (event.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}