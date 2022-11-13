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

export {getRandom, getRandomObj};
