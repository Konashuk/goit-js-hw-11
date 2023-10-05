import axios from 'axios';

async function searchImage(page = 1) {
  const inputValue = inputEl.value.trim();
  const BASE_URL = 'https://pixabay.com/api/?';
  const KEY = 'key=39751957-699f95fae17e6e2f35ebbbaf7';
  const TYPE_SEARCH = 'image_type=photo';
  const ORIENT_PHOTO = 'orientation=horizontal';
  const WHAT_SEARCH = inputValue;
  if (inputValue === '') {
    Notiflix.Notify.warning('Please enter a search query.');
    return;
  }
  axios
    .get(
      `${BASE_URL}${KEY}&${TYPE_SEARCH}&${ORIENT_PHOTO}&safesearch=true&q=${WHAT_SEARCH}&per_page=40&page=${page}`
    )
    .then(response => {
      return response.data;
    })
    .then(data => {
      totalHits = data.totalHits;
      createMarkupCard(data);
      console.log(data);
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Sorry, error ...');
    });
}
export { searchImage };
