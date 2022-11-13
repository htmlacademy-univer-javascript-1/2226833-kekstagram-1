import {getPosts} from './data.js';
import {pictureRender} from './pictures.js';

const posts = getPosts();
console.log(posts);
for (const post of posts) {
  pictureRender(post);
}

