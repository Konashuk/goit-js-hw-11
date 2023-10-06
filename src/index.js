import Notiflix from 'notiflix';
import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createMarkupCard } from './js/create-murkap';
import { getAppi } from './js/get-appi';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let searchValue;

formEl.addEventListener('submit', searchImages);
loadMoreBtn.addEventListener('click', loadMore);

async function searchImages(event) {
  event.preventDefault();
  page = 1;
  searchValue = inputEl.value.trim();
  if (!searchValue) {
    Notiflix.Notify.warning('Please enter a what search.');
    return;
  }
  try {
    const { hits, totalHits } = await getAppi(searchValue, page);
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const murkap = createMarkupCard(hits);
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    galleryEl.innerHTML = murkap;

    loadMoreBtn.classList.remove('is-hidden');

    if (totalHits < 40) {
      loadMoreBtn.classList.add('is-hidden');
    }

    const lightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
      captionsData: `alt`,
    });
    lightbox.refresh();
  } catch (error) {
    console.dir(error.statusText);
  }
}

async function loadMore() {
  try {
    page += 1;
    const { hits, totalHits } = await getAppi(searchValue, page);
    const murkap = createMarkupCard(hits);
    if (page * 40 >= totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    galleryEl.insertAdjacentHTML('beforeend', murkap);
    const lightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
      captionsData: `alt`,
    });
    lightbox.refresh();
  } catch (error) {
    console.dir(error.statusText);
  }
}
