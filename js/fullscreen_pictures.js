import { keyEscape } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const fullscreenComments = bigPicture.querySelector('.social__comments');
const loaderComments = bigPicture.querySelector('.comments-loader');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeBigPictureEscapedown);
  closeButton.removeEventListener('click', closeBigPicture);
  loaderComments.removeEventListener('click', loadComments);
};

function closeBigPictureEscapedown(evt) {
  if (keyEscape(evt)) {
    closeBigPicture();
  }
}

const renderComment = (comment) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;
  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = comment.message;

  li.appendChild(img);
  li.appendChild(p);
  li.classList.add('hidden');
  fullscreenComments.appendChild(li);
};

const countComments = bigPicture.querySelector('.social__comment-count');
let commentCounter = 0;

const initComments = (comments) => {
  while (fullscreenComments.lastElementChild) {
    fullscreenComments.removeChild(fullscreenComments.lastElementChild);
  }
  for (const comment of comments) {
    renderComment(comment);
  }
  let initNumber;
  if (comments.length > 5) {
    initNumber = 5;
    loaderComments.classList.remove('hidden');
    countComments.textContent = `5 из ${comments.length} комментариев`;
  } else {
    initNumber = comments.length;
    loaderComments.classList.add('hidden');
    countComments.textContent = `${comments.length} из ${comments.length} комментариев`;
  }
  const elemComments = fullscreenComments.children;
  let i = 0;
  for (const element of elemComments) {
    if (i >= initNumber) { break; }
    element.classList.remove('hidden');
    i++;
  } commentCounter = i;
};

function loadComments() {
  const elemComments = fullscreenComments.children;
  let i = 0;
  commentCounter += 5;
  for (const element of elemComments) {
    if (i >= commentCounter) { break; }
    element.classList.remove('hidden');
    i++;
  }
  countComments.textContent = `${i} из ${elemComments.length} комментариев`;
  if (commentCounter >= elemComments.length) { loaderComments.classList.add('hidden');}
}
const bigPictureIMG = bigPicture.querySelector('.big-picture__img');
const likesPicture = bigPicture.querySelector('.likes-count');
const descriptionPicture = bigPicture.querySelector('.social__caption');

const fullscreenOpen = (post) => {
  commentCounter = 0;
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  closeButton.addEventListener('click', closeBigPicture);
  loaderComments.addEventListener('click', loadComments);
  document.addEventListener('keydown', closeBigPictureEscapedown);
  bigPictureIMG.querySelector('img').src = post.url;
  likesPicture.textContent = post.likes;
  descriptionPicture.textContent = post.description;

  const comments = post.comments;
  initComments(comments);
};

export {fullscreenOpen};
