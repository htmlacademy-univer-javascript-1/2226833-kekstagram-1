import {getPosts} from './data.js';
import {pictureRender} from './pictures.js';
import {fullscreenOpen} from './fullscreen_pictures.js';
import './add_image.js';

const pictures = document.querySelector('.pictures');
const posts = getPosts();

for (const post of posts) {
  pictureRender(post);
}

const addHandler = (post) => {
  const srcImage = `img[src="${post.url}"]`;
  const picture = pictures.querySelector(srcImage).parentNode;
  picture.addEventListener('click', () => {
    fullscreenOpen(post);
  });
};

for (const post of posts) {
  addHandler(post);
}
