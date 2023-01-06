import {showBigPicture, hideBigPicture} from './big-picture.js';
import {PICTURES} from './picture.js';

const THUMBNAILS = document.querySelectorAll('.picture');
const PICTURES_CONTAINER = document.querySelector('.big-picture');
const COMMENTS_COUNT = PICTURES_CONTAINER.querySelector('.social__comment-count');
const COMMENTS_LIST = PICTURES_CONTAINER.querySelector('.social__comments');
const COMMENTS_LOADER = PICTURES_CONTAINER.querySelector('.social__comments-loader');
const CLOSE_PICTURE = document.querySelector('.big-picture__cancel');

let comments = [];

const COMMENTS_PER_PORTION = 5;
let showComments = 0;


const addThumbnailClickHandler = (thumbnail,picture) =>{
  thumbnail.addEventListener('click', () => {
    COMMENTS_LIST.innerHTML ='';
    showComments = 0;
    showBigPicture();
    PICTURES_CONTAINER.querySelector('.big-picture__img img').src = picture.url;
    PICTURES_CONTAINER.querySelector('.likes-count').textContent = picture.likes;
    PICTURES_CONTAINER.querySelector('.social__caption').textContent = picture.description;
    comments = picture.comments;
    if(comments.length > 0) {
      renderCommentsList(comments);
    } else {
      COMMENTS_COUNT.innerHTML =  'Здесь пока нет ни одного комментария, вы можете стать первым!';
      COMMENTS_LOADER.classList.add('hidden');
    }
  });
};

function hideButtonHandler(element) {
  if (element.length <= showComments) {
    COMMENTS_COUNT.innerHTML = `${element.length} из <span class="comments-count">${element.length}</span> комментариев`;
    COMMENTS_LOADER.classList.add('hidden');
  } else {
    COMMENTS_COUNT.innerHTML =  `${showComments} из <span class="comments-count">${element.length}</span> комментариев`;
    COMMENTS_LOADER.classList.remove('hidden');
  }
}


for (let i = 0; i < THUMBNAILS.length; i++) {
  addThumbnailClickHandler(THUMBNAILS[i], PICTURES[i]);
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

COMMENTS_LOADER.addEventListener('click', () => {
  renderCommentsList(comments);
});

CLOSE_PICTURE.addEventListener('click', () => {
  hideBigPicture();
});


