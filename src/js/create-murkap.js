import { searchImage } from './get-api';

function createMarkupCard(data) {
  const hits = data.hits;
  console.log(data.totalHits);
  Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

  if (hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  const markup = hits
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => `
        <div class="photo-card">
          <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width='300' height='200' /></a>
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

  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: `alt`,
  });

  return markup;
}
export { createMarkupCard };
