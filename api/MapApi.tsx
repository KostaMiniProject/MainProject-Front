//입찰 리스트 관련 API
import { commonFetch } from './commonApi/CommonFetch';

export async function getExchangePostsForMap(longitude: string, latitude: string) {
  try {
    const url = `http://localhost:8080/api/exchange-posts/exchangePostMap?longitude=${encodeURIComponent(longitude)}&latitude=${encodeURIComponent(latitude)}`;
    const result = await commonFetch(
      url,
      {
        method: 'GET',
      }
    );

    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
