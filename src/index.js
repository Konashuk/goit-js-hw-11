import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

formEl.addEventListener('submit', function (event) {
  event.preventDefault();
  searchImage();
});

loadMoreBtn.addEventListener('click', loadMore);

let page = 1;

function loadMore() {
  page += 1;
  searchImage();
}

function searchImage() {
  const inputValue = inputEl.value;
  const BASE_URL = 'https://pixabay.com/api/?';
  const KEY = '39751957-699f95fae17e6e2f35ebbbaf7';
  const TYPE_SEARCH = 'photo';
  const ORIENT_PHOTO = 'horizontal';
  const WHAT_SEARCH = inputValue;

  fetch(
    `${BASE_URL}key=${KEY}&image_type=${TYPE_SEARCH}&orientation=${ORIENT_PHOTO}&safesearch=true&q=${WHAT_SEARCH}&per_page=40&page=${page}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      totalHits = data.totalHits;

      createMarkupCard(data);
    })

    .catch(error => {
      console.log(error.statusText);
    });
}

function createMarkupCard(data) {
  const hits = data.hits;

  if (hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  const markup = hits
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) => `
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" width='300' height='200' />
          <div class="info">
            <p class="info-item">
              <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
              <b>Views: ${views}</b>
            </p>
            <p class="info-item">
              <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads: ${downloads}</b>
            </p>
          </div>
        </div>`
    )
    .join('');

  if (page === 1) {
    galleryEl.innerHTML = markup;
  } else {
    galleryEl.insertAdjacentHTML('beforeend', markup);
  }
  loadMoreBtn.classList.remove('is-hidden');

  if (page * 40 >= totalHits) {
    loadMoreBtn.classList.add('is-hidden'); // Ховаємо кнопку
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    loadMoreBtn.classList.remove('is-hidden');
  }
}
