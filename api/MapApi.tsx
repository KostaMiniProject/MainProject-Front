//입찰 리스트 관련 API
import { commonFetch } from './commonApi/CommonFetch';

export async function getExchangePostsForMap () {
  try {
    const result = await commonFetch(
      `http://localhost:8080/api/exchange-posts/map`,
      {
        method: 'GET',
      }
    );

    console.log('Fetched data:', result);
    return result.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}