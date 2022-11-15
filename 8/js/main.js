import {getPosts} from './data.js';
import {pictureRender} from './pictures.js';
import {fullscreenOpen, bigPicture} from './fullscreen_pictures.js';

const pictures = document.querySelector('.pictures');
const posts = getPosts();

console.log(posts);
for (const post of posts) {
  pictureRender(post);
}

const addHandler = (post) => {
  const srcImage = `img[src="${post.url}"]`;
  const picture = pictures.querySelector(srcImage).parentNode;
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.body.classList.add('modal-open');
    fullscreenOpen(post);
  });
};

for (const post of posts) {
  addHandler(post);
}

const closeButton = bigPicture.querySelector('.big-picture__cancel');
closeButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});
