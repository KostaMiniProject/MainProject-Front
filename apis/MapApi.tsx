//입찰 리스트 관련 API
import { commonFetch } from './commonApi/CommonFetch';

export async function getExchangePostsForMap(
  longitude: string,
  latitude: string
) {
  try {
    const url = `https://wass.itsop.shop/api/exchange-posts/exchangePostMap?longitude=${longitude}&latitude=${latitude}`;
    const result = await commonFetch(url, {
      method: 'GET',
      checkToken: true,
    });

    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
