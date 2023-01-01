import {createPictures} from './data.js';

const PICTURES_CONTAINER = document.querySelector('.pictures');
const pictures = createPictures(25);

for (let i = 0; i < pictures.length; i++) {
  const USERS_PICTURE = `<a href="#" class="picture">
<img class="picture__img" src="${pictures[i].url}" width="182" height="182" alt="Случайная фотография">
<p class="picture__info">
  <span class="picture__comments">${pictures[i].comments.length}</span>
  <span class="picture__likes">${pictures[i].likes}</span>
</p>
</a>`;
  PICTURES_CONTAINER.insertAdjacentHTML('beforeend', USERS_PICTURE);
}
