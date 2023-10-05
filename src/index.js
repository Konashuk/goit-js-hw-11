import Notiflix from 'notiflix';
import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createMarkupCard } from './js/create-murkap';
import { searchImage } from './js/get-api';

const test = createMarkupCard();

console.log(test);

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

formEl.addEventListener('submit', function (event) {
  event.preventDefault();
  searchImage();
});

loadMoreBtn.addEventListener('click', loadMore);

let page = 0;
let totalHits = 0;

function loadMore() {
  page += 1;
  searchImage(page);
}

// async function searchImage(page = 1) {
//   const inputValue = inputEl.value.trim();
//   const BASE_URL = 'https://pixabay.com/api/?';
//   const KEY = 'key=39751957-699f95fae17e6e2f35ebbbaf7';
//   const TYPE_SEARCH = 'image_type=photo';
//   const ORIENT_PHOTO = 'orientation=horizontal';
//   const WHAT_SEARCH = inputValue;
//   if (inputValue === '') {
//     Notiflix.Notify.warning('Please enter a search query.');
//     return;
//   }
//   axios
//     .get(
//       `${BASE_URL}${KEY}&${TYPE_SEARCH}&${ORIENT_PHOTO}&safesearch=true&q=${WHAT_SEARCH}&per_page=40&page=${page}`
//     )
//     .then(response => {
//       return response.data;
//     })
//     .then(data => {
//       totalHits = data.totalHits;
//       createMarkupCard(data);
//       console.log(data);
//     })
//     .catch(error => {
//       console.log(error);
//       Notiflix.Notify.failure('Sorry, error ...');
//     });
// }

// function createMarkupCard(data) {
//   const hits = data.hits;
//   console.log(data.totalHits);
//   Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

//   if (hits.length === 0) {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//     return;
//   }

//   const markup = hits
//     .map(
//       ({
//         webformatURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//         largeImageURL,
//       }) => `
//         <div class="photo-card">
//           <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width='300' height='200' /></a>
//           <div class="info">
//             <p class="info-item">
//               <b>Likes: ${likes}</b>
//             </p>
//             <p class="info-item">
//               <b>Views: ${views}</b>
//             </p>
//             <p class="info-item">
//               <b>Comments: ${comments}</b>
//             </p>
//             <p class="info-item">
//               <b>Downloads: ${downloads}</b>
//             </p>
//           </div>
//         </div>`
//     )
//     .join('');

//   const lightbox = new SimpleLightbox('.gallery a', {
//     captionDelay: 250,
//     captionsData: `alt`,
//   });
// }
// if (page === 1) {
//   galleryEl.innerHTML = markup;
// } else {
//   galleryEl.insertAdjacentHTML('beforeend', markup);
// }
// loadMoreBtn.classList.remove('is-hidden');

// if (page * 40 >= totalHits) {
//   loadMoreBtn.classList.add('is-hidden');
//   Notiflix.Notify.info(
//     "We're sorry, but you've reached the end of search results."
//   );
// } else {
//   loadMoreBtn.classList.remove('is-hidden');
// }
