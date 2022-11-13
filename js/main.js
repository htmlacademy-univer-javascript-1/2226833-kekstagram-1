import {getPosts} from './data.js';
import {pictureRender} from './pictures.js';

const posts = getPosts();
for (const post of posts) {
  pictureRender(post);
}

