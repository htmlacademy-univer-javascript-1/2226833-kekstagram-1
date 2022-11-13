
const pictureTemplate = document.querySelector('#picture').content;
const skinPictures = document.querySelector('.pictures');
const picture = pictureTemplate.querySelector('.picture');

const pictureRender = (post) => {
  const elements = picture.cloneNode(true);
  elements.querySelector('.picture__img').src = post.url;
  elements.querySelector('.picture__likes').textContent = post.likes;
  elements.querySelector('.picture__comments').textContent = post.comments.length;
  skinPictures.appendChild(elements);
};


export { pictureRender };

