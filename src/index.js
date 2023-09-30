import axios from 'axios';
import Notiflix, { Loading } from 'notiflix';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const galeryEl = document.querySelector('.gallery');
formEl.addEventListener('submit', searchImage);

function searchImage(ev) {
  ev.preventDefault();
  const ipnutText = inputEl.value;
  const BASE_URL = 'https://pixabay.com/api/?';
  const KEY = '39751957-699f95fae17e6e2f35ebbbaf7';
  const TYPE_SEARCH = 'photo';
  const ORIENT_PHOTO = 'horizontal';
  const WHAT_SHEARCH = ipnutText;

  axios
    .get(
      `${BASE_URL}key=${KEY}&image_type=${TYPE_SEARCH}&orientation=${ORIENT_PHOTO}&safesearch=true&q=${WHAT_SHEARCH}`
    )
    .then(resp => createMarcupCard(resp))
    .catch(err => console.log(err.statusText));
}

function createMarcupCard(resp) {
  const data = resp.data.hits;

  if (data.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  const markup = data.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `
          <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width='300' height='200' />
  <div class="info">
    <p class="info-item">
      <b>Likes${likes}</b>
    </p>
    <p class="info-item">
      <b>Views${views}</b>
    </p>
    <p class="info-item">
      <b>Comments${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
    </p>
  </div>
</div>`
  );
  return (galeryEl.innerHTML = markup.join(''));
}
