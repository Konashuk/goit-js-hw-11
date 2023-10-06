import axios from 'axios';

async function getAppi(searchValue, page = 1) {
  const BASE_URL = 'https://pixabay.com/api';
  const KEY = '39751957-699f95fae17e6e2f35ebbbaf7';

  try {
    const { data } = await axios.get(`${BASE_URL}/?`, {
      params: {
        key: KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 40,
        safesearch: true,
        q: searchValue,
        page: page,
      },
    });
    return data;
  } catch (error) {
    console.log('Error in Your appi ');
  }
}
export { getAppi };
