//입찰 리스트 관련 API
import { commonFetch } from './commonApi/CommonFetch';

export async function getExchangePostsForMap(longitude: string, latitude: string) {
  try {
    const result = await commonFetch(
      `http://localhost:8080/api/exchange-posts/exchangePostMap`,
      {
        method: 'GET',
        body: JSON.stringify({
          longitude: longitude,
          latitude: latitude,
        }),
      }
    );

    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
