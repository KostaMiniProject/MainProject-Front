import { commonFetch } from './commonApi/CommonFetch';

export async function postReview(exchangeId: number, body: any) {
  try {
    const result = await commonFetch(
      `https://wass.itsop.shop/api/reviews/${exchangeId}`,
      {
        method: 'POST',
        checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
        // 기타 다른 옵션들...
        body: body,
      }
    );

    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
