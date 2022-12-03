import {keyEscape} from './util.js';

//Switch for editor view
const inputImage = document.querySelector('#upload-file');
const editFullscreen = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');

//Switch for hashtags and comment
const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

//Scale
const editImage = editFullscreen.querySelector('.img-upload__preview').querySelector('img');
const sizeImage = editFullscreen.querySelector('.scale__control--value');
const resizeButton = editFullscreen.querySelector('.scale__control--smaller');
const zoomButton = editFullscreen.querySelector('.scale__control--bigger');

//Effect
const effects = editFullscreen.querySelector('.effects__list');
const effectValue = editFullscreen.querySelector('.effect-level__value');
const slider = editFullscreen.querySelector('.effect-level__slider');
const sliderBox = editFullscreen.querySelector('.img-upload__effect-level');
let checkBox;

const setInitialValues = () => {
  document.querySelectorAll('.text__error').forEach((el) => el.remove());

  inputImage.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  effectValue.value = '';
  submitButton.disabled = false;
  sizeImage.value = '100%';
  editImage.style.transform = 'scale(1)';
  editImage.style.filter = '';
  editImage.className = '';
  checkBox = 'effect-none';
  sliderBox.classList.add('hidden');
};

const closeCurrentImage = () => {
  editFullscreen.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeEditFullscreenOnEscape);
  closeButton.removeEventListener('click', closeCurrentImage);
  hashtagInput.removeEventListener('keydown', escapeStop);
  commentInput.removeEventListener('keydown', escapeStop);
  slider.noUiSlider.destroy();
};

function escapeStop(evt) {
  evt.stopPropagation();
}

const createSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100
  });
};

inputImage.addEventListener('change', () => {
  closeButton.addEventListener('click', closeCurrentImage);
  document.addEventListener('keydown', closeEditFullscreenOnEscape);
  document.body.classList.add('modal-open');
  editFullscreen.classList.remove('hidden');
  hashtagInput.addEventListener('keydown', escapeStop);
  commentInput.addEventListener('keydown', escapeStop);
  setInitialValues();
  resizeButton.addEventListener('click', resizeImage);
  zoomButton.addEventListener('click', zoomImage);
  effects.addEventListener('change', setPictureEffect);
  createSlider();
  slider.noUiSlider.on('update', () => {
    setEffect();
  });
});

function closeEditFullscreenOnEscape(evt) {
  if (keyEscape(evt)) {
    closeCurrentImage();
  }
}

function resizeImage() {
  let currentSize = parseInt(sizeImage.value.replace('%', ''), 10);
  if (currentSize > 0) {
    currentSize -= 25;
    sizeImage.value = `${currentSize}%`;
    editImage.style.transform = `scale(${currentSize / 100})`;
  }
}

function zoomImage() {
  let currentSize = parseInt(sizeImage.value.replace('%', ''), 10);
  if (currentSize < 100) {
    currentSize += 25;
    sizeImage.value = `${currentSize}%`;
    editImage.style.transform = `scale(${currentSize / 100})`;
  }
}

const updateSlider = (min, max, step, start) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step
  });
};

function setPictureEffect(evt) {
  checkBox = evt.target.id;
  let effect;
  switch (checkBox) {
    case 'effect-chrome':
      effect = 'effects__preview--chrome';
      updateSlider(0, 1, 0.1, 1);
      break;
    case 'effect-sepia':
      effect = 'effects__preview--sepia';
      updateSlider(0, 1, 0.1, 1);
      break;
    case 'effect-marvin':
      effect = 'effects__preview--marvin';
      updateSlider(0, 100, 1, 100);
      break;
    case 'effect-phobos':
      effect = 'effects__preview--phobos';
      updateSlider(0, 3, 0.1, 3);
      break;
    case 'effect-heat':
      effect = 'effects__preview--heat';
      updateSlider(1, 3, 0.1, 3);
      break;
  }
  if (checkBox !== 'effect-none') {
    sliderBox.classList.remove('hidden');
    editImage.className = effect;
  } else {
    sliderBox.classList.add('hidden');
    editImage.className = '';
    editImage.style.filter = '';
  }
}

function setEffect() {
  const sliderValue = slider.noUiSlider.get();
  effectValue.value = sliderValue;
  let filter;
  switch (checkBox) {
    case 'effect-chrome':
      filter = `grayscale(${sliderValue})`;
      break;
    case 'effect-sepia':
      filter = `sepia(${sliderValue})`;
      break;
    case 'effect-marvin':
      filter = `invert(${sliderValue}%)`;
      break;
    case 'effect-phobos':
      filter = `blur(${sliderValue}px)`;
      break;
    case 'effect-heat':
      filter = `brightness(${sliderValue})`;
      break;
  }
  editImage.style.filter = filter;
}

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
