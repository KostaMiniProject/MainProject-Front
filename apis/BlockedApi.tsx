"use client";
import { commonFetch } from "./commonApi/CommonFetch";

export async function getBlockedUsers(page: number = 0) {
  try {
    const result = await commonFetch(`https://itsop.shop/api/users/blocked`, {
      method: "GET",
      checkToken: true, // 토큰 체크 활성화
      // 기타 다른 옵션들...
    });

    // console.log(
    //   "Fetched data:",
    //   result,
    //   "Profile Image:",
    //   result.profileImage,
    //   "Name:",
    //   result.name
    // );
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
