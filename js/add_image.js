import {keyEscape} from './util.js';

const inputImage = document.querySelector('#upload-file');
const editFullscreen = document.querySelector('.img-upload__overlay');

const closeCurrentImage = () => {
  inputImage.value = '';
  editFullscreen.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeEditFullscreenOnEscape);
};

inputImage.addEventListener('change', () => {
  const closeButton = document.querySelector('#upload-cancel');
  closeButton.addEventListener('click', closeCurrentImage);
  document.addEventListener('keydown', closeEditFullscreenOnEscape);
  document.body.classList.add('modal-open');
  editFullscreen.classList.remove('hidden');
});

function closeEditFullscreenOnEscape(evt) {
  if (keyEscape(evt)) {
    closeCurrentImage();
  }
}

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

let hashtagResult = true;
let descriptionResult = true;

const controlSubmit = () => {
  if (!hashtagResult || !descriptionResult) {
    submitButton.setAttribute('disabled', 'false');
  } else {
    submitButton.removeAttribute('disabled', 'true');
  }
};

const regHashtag = /(^\s*$)|(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)/;
const isCorrectHashtag = (value) => regHashtag.test(value);

const validateHashtag = (value) => {
  const hashtags = value.split(' ');
  const result = hashtags.every(isCorrectHashtag);
  hashtagResult = result;
  controlSubmit();
  return result;
};

const isCorrectComment = (value) => value.length < 140;

const validateComment = (value) => {
  const result = isCorrectComment(value);
  descriptionResult = result;
  controlSubmit();
  return result;
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
}, true);

pristine.addValidator(hashtagInput, validateHashtag, 'Некорректный хэштег');
pristine.addValidator(commentInput, validateComment, 'Комментарий не должен превышать 140 символов');

form.addEventListener('submit', () => {
  pristine.validate();
});
