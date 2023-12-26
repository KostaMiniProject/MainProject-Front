"use client";
export async function postEmailCheck(userData: any) {
  try {
    const res = await fetch("https://wass.itsop.shop/api/authNumCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      // 로그인 실패 처리
      throw new Error(`이메일 인증 실패: ${res.status}`);
    } else {
      alert("이메일 인증이 완료되었습니다.");
    }

    // const data = await res.json();
    // 토큰을 반환하거나 저장, 사용 등을 수행

    // return [data];
  } catch (error) {
    // 오류 처리
    console.error("이메일 인증 오류 발생:", error);
    throw error; // 호출자에게 오류 전파
  }
}
