import { getRandom, getRandomObj } from './util.js';

const DESCRIPTION_FOR_PHOTO = [
  'The best is yet to come',
  'Beauty in simplicity',
  'I\'m not lazy. I\'m just very relaxed',
  'Live today, Live now',
  'Kittens, well, where without them?',
  'Cool',
  'Nice',
  'Beautiful',
  'My favourite photo!',
  'I like this very much'
];

const MESSAGES_TO_THE_POST = [
  'In general, everything is good. But not all.',
  'I slipped on a banana peel and dropped the camera on the cat and got a better AMOUNT_OF_PHOTOS.'
];

const USERNAME = ['Kotik', 'Keksik', 'Barsik', 'Kuzya', 'Tom', 'Murzik', 'Timon', 'Taison', 'Simon', 'Djek'];

const AMOUNT_OF_PHOTOS = 25;
const arrayIdPhoto = Array(5 * AMOUNT_OF_PHOTOS).fill(true);
const arrayId = Array(AMOUNT_OF_PHOTOS).fill(true);
const arrayURL = Array(AMOUNT_OF_PHOTOS).fill(true);

const getId = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      array[i] = false;
      return i++;
    }
  }
};

const getComment = () => ({
  id: getId(arrayIdPhoto),
  avatar: `img/avatar-${getRandom(1, 6)}.svg`,
  message: getRandomObj(MESSAGES_TO_THE_POST),
  name: getRandomObj(USERNAME)
});

const getComments = () => {
  const number = getRandom(1, 5);
  const comments = Array(number);
  for (let i = 0; i < number; i++) {
    comments[i] = getComment();
  }
  return comments;
};

const getPost = () => ({
  id: getId(arrayId),
  url: `photos/${getId(arrayURL)}.jpg`,
  description: getRandomObj(DESCRIPTION_FOR_PHOTO),
  likes: getRandom(10, 300),
  comments: getComments()
});

const getPosts = () => Array.from({ length: DESCRIPTION_FOR_PHOTO }, getPost);

export {getPosts};

