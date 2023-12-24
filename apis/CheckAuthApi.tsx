import { commonFetch } from './commonApi/CommonFetch';

export async function postCheckAuth(body: any) {
  try {
    const result = await commonFetch('https://itsop.shop/api/check-token', {
      method: 'POST',
      body: body,
    });

    console.log('Upload successful:', result);
    return result;
  } catch (error) {
    console.error('Error uploading:', error);
    throw error;
  }
}
