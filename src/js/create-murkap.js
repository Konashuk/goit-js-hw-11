function createMarkupCard(data) {
  const markup = data
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

  return markup;
}
export { createMarkupCard };
