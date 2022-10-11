const description = [
  'The best is yet to come',
  'Beauty in simplicity',
  'I\'m not lazy. I\'m just very relaxed',
  'Live today, Live now',
  'Kittens, well, where without them?'
];

const messages = [
  'In general, everything is good. But not all.',
  'I slipped on a banana peel and dropped the camera on the cat and got a better photo.'
];

const names = ['Kotik', 'Keksik', 'Barsik', 'Kuzya', 'Tom', 'Murzik', 'Timon', 'Taison', 'Simon', 'Djek'];

const photo = 25;
const idPhoto = Array(5 * photo).fill(true);
const id = Array(photo).fill(true);
const url = Array(photo).fill(true);

const getRandom = (from, to) => {
  if (from < to) {
    if (from < 0 || to < 0) {
      throw new Error('negative numbers are not allowed');
    }
  } else {
    throw new Error('the "from" value must be less than the "to" value');
  }

  const min = Math.ceil(from);
  const max = Math.floor(to);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandom(0, 100);

function checkStringLength(string, length) {
  return string.length < length;
}

checkStringLength('Mur Chao!', 20);

const getRandomObj = (objects) => objects[getRandom(0, objects.length - 1)];

const getId = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      array[i] = false;
      return i++;
    }
  }
};

const getComment = () => ({
  id: getId(idPhoto),
  avatar: `img/avatar-${getRandom(1, 6)}.svg`,
  message: getRandomObj(messages),
  name: getRandomObj(names)
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
  id: getId(id),
  url: `photos/${getId(url)}.jpg`,
  description: getRandomObj(description),
  likes: getRandom(10, 300),
  comments: getComments()
});

const getPosts = () => {
  const posts = Array(photo);
  for (let i = 0; i < photo; i++) {
    posts[i] = getPost();
  }
  return posts;
};

getPosts();


