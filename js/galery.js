import {showBigPicture, hideBigPicture} from './big-picture.js';
import {PICTURES} from './picture.js';

const PICTURE_CONTAINER = document.querySelector('.big-picture');
const COMMENTS_COUNT = PICTURE_CONTAINER.querySelector('.social__comment-count');
const COMMENTS_LIST = PICTURE_CONTAINER.querySelector('.social__comments');
const COMMENTS_LOADER = PICTURE_CONTAINER.querySelector('.social__comments-loader');
const CLOSE_PICTURE = document.querySelector('.big-picture__cancel');
const PICTURES_CONTAINER = document.querySelector('.pictures');

let comments = [];

const COMMENTS_PER_PORTION = 5;
let showComments = 0;

function renderBigPicture(evt) {
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    const currentImg = currentPicture.querySelector('.picture__img');
    const picturelikes = currentPicture.querySelector('.picture__likes');
    const pictureId = currentPicture.getAttribute('id') - 1;
    COMMENTS_LIST.innerHTML ='';
    showComments = 0;
    showBigPicture();
    PICTURE_CONTAINER.querySelector('.big-picture__img img').src = currentImg.getAttribute('src');
    PICTURE_CONTAINER.querySelector('.likes-count').textContent = picturelikes.textContent;
    PICTURE_CONTAINER.querySelector('.social__caption').textContent = PICTURES[pictureId].description;
    comments = PICTURES[pictureId].comments;
    if(comments.length > 0) {
      renderCommentsList(comments);
    } else {
      COMMENTS_COUNT.innerHTML =  'Здесь пока нет ни одного комментария, вы можете стать первым!';
      COMMENTS_LOADER.classList.add('hidden');
    }
  }
}

function hideButtonHandler(element) {
  if (element.length <= showComments) {
    COMMENTS_COUNT.innerHTML = `${element.length} из <span class="comments-count">${element.length}</span> комментариев`;
    COMMENTS_LOADER.classList.add('hidden');
  } else {
    COMMENTS_COUNT.innerHTML =  `${showComments} из <span class="comments-count">${element.length}</span> комментариев`;
    COMMENTS_LOADER.classList.remove('hidden');
  }
}

function renderCommentsList(arr){
  COMMENTS_LIST.innerHTML ='';
  showComments += COMMENTS_PER_PORTION;
  hideButtonHandler(arr);
  if (arr.length < showComments) {
    showComments = arr.length;
  }
  for (let i = 0; i <= showComments - 1; i++) {
    createComment(comments[i]);
  }
}

function createComment(element) {
  COMMENTS_LIST.innerHTML += `
    <li class="social__comment">
      <img class="social__picture" src="${element.avatar}" alt="${element.name}" width="35" height="35">
      <p class="social__text">${element.message}</p>
    </li>`;
}

PICTURES_CONTAINER.addEventListener('click', renderBigPicture);

COMMENTS_LOADER.addEventListener('click', () => {
  renderCommentsList(comments);
});

CLOSE_PICTURE.addEventListener('click', () => {
  hideBigPicture();
});
