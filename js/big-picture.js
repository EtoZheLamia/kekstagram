import {isEscapeKey} from './util.js';

const BIG_PICTURE = document.querySelector('.big-picture');
const IMAGE = BIG_PICTURE.querySelector('.big-picture__img img');
const LIKES_COUNT = BIG_PICTURE.querySelector('.likes-count');
const IMAGE_CAPTION = BIG_PICTURE.querySelector('.social__caption');
const PICTURE_CLOSE = BIG_PICTURE.querySelector('.big-picture__cancel');
const COMMENTS_LIST = BIG_PICTURE.querySelector('.social__comments');

const COMMENTS_COUNT = BIG_PICTURE.querySelector('.social__comment-count');
const COMMENTS_LOADER = BIG_PICTURE.querySelector('.social__comments-loader');
const BIG_PICTURE_PREVIEW = BIG_PICTURE.querySelector('.big-picture__preview');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
};

function renderPictureDetails({url, likes, description}) {
  IMAGE.src = url;
  IMAGE.alt = description;
  LIKES_COUNT.textContent = likes;
  IMAGE_CAPTION.textContent = description;
}

const COMMENTS_PER_PORTION = 5;
let showComments = 0;
let comments =[];

function createComment({avatar, name, message}) {
  const comment = document.createElement('li');
  comment.innerHTML= `<img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>`;
  comment.classList.add('social__comment');
  return comment;
}

const renderCommentsList = (data) => {
  COMMENTS_LIST.innerHTML ='';
  showComments += COMMENTS_PER_PORTION;
  const fragment = document.createDocumentFragment();
  if (data.length < showComments) {
    showComments = data.length;
  }
  for (let i = 0; i <= showComments - 1; i++) {
    const commentElement = createComment(data[i]);
    fragment.append(commentElement);
  }
  COMMENTS_LIST.append(fragment);
  hideButtonHandler(data);
};

COMMENTS_LOADER.addEventListener('click', ()=>{
  renderCommentsList(comments);
});

function hideButtonHandler(element) {
  if (element.length <= showComments) {
    COMMENTS_COUNT.innerHTML = `${element.length} из <span class="comments-count">${element.length}</span> комментариев`;
    COMMENTS_LOADER.classList.add('hidden');
  } else {
    COMMENTS_COUNT.innerHTML =  `${showComments} из <span class="comments-count">${element.length}</span> комментариев`;
    COMMENTS_LOADER.classList.remove('hidden');
  }
}

function showBigPicture(data) {
  BIG_PICTURE.classList.remove('hidden');
  document.body.classList.add('modal-open');
  comments = data.comments;
  document.addEventListener('keydown', onPopupEscKeydown);
  renderPictureDetails(data);
  if(comments.length > 0) {
    renderCommentsList(comments);
  } else {
    COMMENTS_COUNT.innerHTML =  'Здесь пока нет ни одного комментария, вы можете стать первым!';
    COMMENTS_LOADER.classList.add('hidden');
  }
}

BIG_PICTURE.addEventListener('click', (evt) => {
  if (evt.target.matches('.big-picture')) {
    hideBigPicture();
  }
});

function hideBigPicture()  {
  BIG_PICTURE.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  showComments = 0;
}

PICTURE_CLOSE.addEventListener('click', () => {
  hideBigPicture();
});

export {showBigPicture};
