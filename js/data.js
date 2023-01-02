import {getRandomPositiveInteger, getRandomArrayElement, checkStringLength} from './util.js';

const NAME_AUTHOR = ['Алексей', 'Родион', 'Алиса', 'Леонид', 'Даниил', 'Илья', 'Павел', 'Анна', 'Аделина', 'Диана'];

const COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const DESCRIPTION_PHOTO = [
  'Все ищут острых ощущений, но самое важное лишь семья... Твоя семья',
  'Нельзя отворачиваться от семьи. Даже если она отвернулась от тебя',
  'Спроси настоящего гонщика: не имеет значения, ты на сантиметр или на метр впереди – победа есть победа',
  'Нет ничего важнее личного кодекса',
  'Либо вместе, либо никак',
  'Миллионы приходят и уходят, не в них счастье. Самым главным, всегда будут люди'
];

const createComment = (index) => ({
  'id': index,
  'avatar': `img/avatar-${getRandomPositiveInteger(1,6)}.svg`,
  'message': `${getRandomArrayElement(COMMENT_MESSAGE)}`,
  'name': `${getRandomArrayElement(NAME_AUTHOR)}`
});

const createPicture = (index) => ({
  'id': index,
  'url': `photos/${index}.jpg`,
  'description': `${getRandomArrayElement(DESCRIPTION_PHOTO)}`,
  'likes': `${getRandomPositiveInteger(15, 200)}`,
  'comments': Array.from({length: getRandomPositiveInteger(0, 10)}, (_, indexComment) => createComment(indexComment + 1))
});

const createPictures = (count) => Array.from({length: count}, (_, indexPicture)=> createPicture(indexPicture + 1));

checkStringLength('',140);
export {createPictures};
