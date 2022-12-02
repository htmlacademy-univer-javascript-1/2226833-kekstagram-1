import { getRandom, getRandomObj } from './util.js';

const DESCRIPTION_FOR_PHOTO = [
  'Чувствую себя лучше!',
  'Красивое фото',
  'Я не ленивый, я просто люблю отдыхать',
  'Живи сегодня, живи сейчас',
  'Котята, ну куда же без них?',
  'Просто и без слов',
  'Невероятно'
];

const MESSAGES_TO_THE_POST = [
  'Всё отлично!',
  'Мое любимое фото',
  'Вау, впечатляет',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Могло быть и лучше',
  'Ура, я так ждал этот пост!!!',
  'Снова ты?!',
  'Да тут и обсуждать то нечего'
];

const USERNAME  = ['Kotik', 'Keksik', 'Barsik', 'Kuzya', 'Tom', 'Murzik', 'Timon', 'Taison', 'Simon', 'Djek'];

const AMOUNT_OF_PHOTOS  = 25;
const arrayIdPhoto = Array(20 * AMOUNT_OF_PHOTOS ).fill(true);
const arrayId = Array(AMOUNT_OF_PHOTOS ).fill(true);
const arrayURL = Array(AMOUNT_OF_PHOTOS ).fill(true);

const getId = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      array[i] = false;
      return i + 1;
    }
  }
};

const getComment = () => ({
  id: getId(arrayIdPhoto ),
  avatar: `img/avatar-${getRandom(1, 6)}.svg`,
  message: getRandomObj(MESSAGES_TO_THE_POST ),
  name: getRandomObj(USERNAME )
});

const getComments = () => {
  const number = getRandom(4, 16);
  const comments = Array(number);
  for (let i = 0; i < number; i++) {
    comments[i] = getComment();
  }
  return comments;
};

const getPost = () => ({
  id: getId(arrayId ),
  url: `photos/${getId(arrayURL, 1, 25)}.jpg`,
  description: getRandomObj(DESCRIPTION_FOR_PHOTO ),
  likes: getRandom(10, 300),
  comments: getComments()
});

const getPosts = () => Array.from({ length: AMOUNT_OF_PHOTOS }, getPost);

export {getPosts};

