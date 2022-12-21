//случайное целое положительное число
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//проверка длины строки
function checkStringLength (string, length) {
  return string.length <= length;
}

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

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createComment = () => ({
  'avatar': `img/avatar-${getRandomPositiveInteger(0,6)}.svg`,
  'message': `${getRandomArrayElement(COMMENT_MESSAGE)}`,
  'name': `${getRandomArrayElement(NAME_AUTHOR)}`
});

const NUMBER_OF_COMMENTS = 5;
const COMMENTS = Array.from({length: NUMBER_OF_COMMENTS}, createComment);

const createDescription = () => ({
  'description': `${getRandomArrayElement(DESCRIPTION_PHOTO)}`,
  'likes': `${getRandomPositiveInteger(15, 200)}`,
  'comments': COMMENTS
});


const NUMBER_OF_DESCRIPTION = 25;
const DESCRIPTION = Array.from({length: NUMBER_OF_DESCRIPTION}, createDescription);
for (let i = 0; i < DESCRIPTION.length; i++) {
  DESCRIPTION[i].id = +i + 1;
  DESCRIPTION[i].url = `photos/${+i + 1}.jpg`;
  for (let j = 0; j < COMMENTS.length; j++) {
    COMMENTS[j].id = `id_${+j + 1}`;
  }
}
