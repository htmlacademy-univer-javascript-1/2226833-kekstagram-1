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

const  checkStringLength = (string, maxLength) => string.length < maxLength;

const getRandomObj = (objects) => objects[getRandom(0, objects.length - 1)];

const keyEscape = (evt) => evt.key === 'Escape';

const showAlert = (message, alertTime) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  if (alertTime === 0) {
    document.body.append(alertContainer);
  } else {
    document.body.append(alertContainer);
    setTimeout(() => { alertContainer.remove(); }, alertTime);}
};

export {getRandom, getRandomObj, keyEscape, checkStringLength, showAlert};
