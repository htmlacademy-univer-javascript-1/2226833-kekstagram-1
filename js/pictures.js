import { getData } from './importer.js';
import { showAlert } from './util.js';
import { fullscreenOpen } from './fullscreen_pictures.js';

const pictureTemplate = document.querySelector('#picture').content;
const skinPictures = document.querySelector('.pictures');
const picture = pictureTemplate.querySelector('.picture');

const earlyPosts = new Set();
const picturesFilter = document.querySelector('.img-filters');
const buttonDefault = document.querySelector('[id=filter-default]');
const buttonRandom = document.querySelector('[id=filter-random]');
const buttonDiscussed = document.querySelector('[id=filter-discussed]');
let timeoutId;

const pictureRender = (post) => {
  const elements = picture.cloneNode(true);
  elements.querySelector('.picture__img').src = post.url;
  elements.querySelector('.picture__likes').textContent = post.likes;
  elements.querySelector('.picture__comments').textContent = post.comments.length;
  skinPictures.appendChild(elements);
  earlyPosts.add(elements);
  elements.addEventListener('click', () => {
    fullscreenOpen(post);
  });
};

const delayRender = (posts) => {
  for (const post of earlyPosts) { skinPictures.removeChild(post); }
  earlyPosts.clear();
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    for (const post of posts) { pictureRender(post);}}, 500);
};

const renderPosts = (posts) => {
  for (const post of posts) { pictureRender(post); }
  picturesFilter.classList.remove('img-filters--inactive');
  let currentFilter = 'filter-default';
  buttonDefault.addEventListener('click', () => {
    if (currentFilter !== 'filter-default') {
      currentFilter = 'filter-default';
      buttonDefault.classList.add('img-filters__button--active');
      buttonRandom.classList.remove('img-filters__button--active');
      buttonDiscussed.classList.remove('img-filters__button--active');
      delayRender(posts);
    }
  });
  buttonRandom.addEventListener('click', () => {
    if (currentFilter !== 'filter-random') {
      currentFilter = 'filter-random';
      buttonDefault.classList.remove('img-filters__button--active');
      buttonRandom.classList.add('img-filters__button--active');
      buttonDiscussed.classList.remove('img-filters__button--active');
      const tempPosts = posts.slice(0, 10).sort(() => Math.random() - 0.5);
      delayRender(tempPosts);
    }
  });
  buttonDiscussed.addEventListener('click', () => {
    if (currentFilter !== 'filter-discussed') {
      currentFilter = 'filter-discussed';
      buttonDefault.classList.remove('img-filters__button--active');
      buttonRandom.classList.remove('img-filters__button--active');
      buttonDiscussed.classList.add('img-filters__button--active');
      const tempPosts = posts.slice(0).sort((a, b) => b.comments.length - a.comments.length);
      delayRender(tempPosts);
    }
  });
};

const picturesRender = () => { getData(renderPosts, showAlert); };

export { picturesRender };

