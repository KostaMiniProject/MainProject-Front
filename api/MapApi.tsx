//입찰 리스트 관련 API
import { commonFetch } from './commonApi/CommonFetch';

export async function getExchangePostsForMap() {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/exchange-posts/exchangePostMap`,
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
