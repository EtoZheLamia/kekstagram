import {showBigPicture, hideBigPicture} from './big-picture.js';
import {PICTURES} from './picture.js';

const THUMBNAILS = document.querySelectorAll('.picture');
const PICTURES_CONTAINER = document.querySelector('.big-picture');
const COMMENTS_COUNT = PICTURES_CONTAINER.querySelector('.social__comment-count');
const COMMENTS_LIST = PICTURES_CONTAINER.querySelector('.social__comments');
const COMMENTS_LOADER = PICTURES_CONTAINER.querySelector('.social__comments-loader');
const CLOSE_PICTURE = document.querySelector('.big-picture__cancel');

const renderCommentsList = (element) => {
  if (element.comments.length < 5) {
    COMMENTS_COUNT.innerHTML = `${element.comments.length} из <span class="comments-count">${element.comments.length}</span> комментариев`;
    COMMENTS_LOADER.classList.add('hidden');
  } else {
    COMMENTS_COUNT.innerHTML =  `5 из <span class="comments-count">${element.comments.length}</span> комментариев`;
    COMMENTS_LOADER.classList.remove('hidden');
  }
  element.comments.forEach((item) => {
    COMMENTS_LIST.innerHTML += `
    <li class="social__comment">
      <img class="social__picture" src="${item.avatar}" alt="${item.name}" width="35" height="35">
      <p class="social__text">${item.message}</p>
    </li>`;
  });
};

const addThumbnailClickHandler = (thumbnail, picture) =>{
  thumbnail.addEventListener('click', () =>{
    COMMENTS_LIST.innerHTML ='';
    showBigPicture();
    PICTURES_CONTAINER.querySelector('.big-picture__img img').src = picture.url;
    PICTURES_CONTAINER.querySelector('.likes-count').textContent = picture.likes;
    PICTURES_CONTAINER.querySelector('.social__caption').textContent = picture.description;
    renderCommentsList(picture);
  });
};

for (let i = 0; i < THUMBNAILS.length; i++) {
  addThumbnailClickHandler(THUMBNAILS[i], PICTURES[i]);
}

CLOSE_PICTURE.addEventListener('click', () => {
  hideBigPicture();
});
