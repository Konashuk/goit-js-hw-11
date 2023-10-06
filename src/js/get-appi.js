import axios from 'axios';

async function getAppi(searchValue, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/?';
  const KEY = 'key=39751957-699f95fae17e6e2f35ebbbaf7';
  const TYPE_SEARCH = 'image_type=photo';
  const ORIENT_PHOTO = 'orientation=horizontal';
  try {
    const { data } = await axios.get(
      `${BASE_URL}${KEY}&${TYPE_SEARCH}&${ORIENT_PHOTO}&safesearch=true&q=${searchValue}&per_page=40&page=${page}`
    );
    return data;
  } catch (error) {
    console.log('Error in Your appi ');
  }
}
export { getAppi };
