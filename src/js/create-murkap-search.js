// function createMarcupCard(resp) {
//   const data = resp.data.hits;

//   if (data.length === 0) {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//     return;
//   }
//   const markup = data.map(
//     ({
//       webformatURL,
//       largeImageURL,
//       tags,
//       likes,
//       views,
//       comments,
//       downloads,
//     }) => `
//           <div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" width='300' height='200' />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads${downloads}</b>
//     </p>
//   </div>
// </div>`
//   );
//   laodMore.classList.remove('is-hidden');

//   return (galeryEl.innerHTML = markup.join(''));
// }
// export { createMarcupCard };
