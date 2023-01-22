import {showBigPicture} from './big-picture.js';


const PICTURE_TEMPLATE = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const PICTURES_CONTAINER = document.querySelector('.pictures');

const renderPicturePreview = (data) => {
  const {comments, description, likes, url } = data;
  const picture = PICTURE_TEMPLATE.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.addEventListener('click', () => {
    showBigPicture(data);
  });
  return picture;
};

const renderPictures = (pictures) => {
  PICTURES_CONTAINER.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((element) => {
    const pictureElement = renderPicturePreview(element);
    fragment.append(pictureElement);
  });
  PICTURES_CONTAINER.append(fragment);
};


export {renderPictures};
