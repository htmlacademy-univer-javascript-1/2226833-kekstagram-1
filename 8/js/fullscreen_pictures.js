const bigPicture = document.querySelector('.big-picture');


const fullscreenOpen = (post) => {
  const fullscreenComments = bigPicture.querySelector('.social__comments');
  const comments = bigPicture.querySelectorAll('.social__comment');

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = post.url;
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  bigPicture.querySelector('.comments-count').textContent = post.comments.length;
  bigPicture.querySelector('.social__caption').textContent = post.description;


  for (const comment of comments) {
    comment.remove();
  }
  for (const comment of post.comments) {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comment.message;
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    li.appendChild(img);
    li.appendChild(p);
    fullscreenComments.appendChild(li);
  }
};

export {fullscreenOpen, bigPicture};
