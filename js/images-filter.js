import {debounce} from './util.js';

const IMAGES_FILTER = document.querySelector('.img-filters');
let currentFilter;
let pictures = [];

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
  POPULAR: 'filter-popular',
};

const discussedSort = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const randomSort = () => Math.random() - 0.5;

const popularSort = (pictureA, pictureB) => pictureB.likes - pictureA.likes;

const turnFilterOn = (loadedPictures) => {
  IMAGES_FILTER.classList.remove('img-filters--inactive');
  currentFilter = Filter.DEFAULT;
  pictures = [...loadedPictures];
};

const filterPictures = () => {
  switch (currentFilter) {
    case Filter.DISCUSSED:
      return  [...pictures].sort(discussedSort);
    case Filter.POPULAR:
      return  [...pictures].sort(popularSort);
    case Filter.RANDOM:
      return  [...pictures].sort(randomSort).slice(0, 10);
    case Filter.DEFAULT:
      return [...pictures];
  }
};

const setOnFilterClick = (cb) => {
  const debouncedRenderPictures = debounce(cb);

  IMAGES_FILTER.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    if (evt.target.id === currentFilter) {
      return;
    }
    IMAGES_FILTER.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    debouncedRenderPictures(filterPictures());
  });
};

export {turnFilterOn, filterPictures, setOnFilterClick};
