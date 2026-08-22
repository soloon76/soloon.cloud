exports.handler = async (event) => {

  // POST 요청만 허용
  if (event.httpMethod !== "POST") {

    return {
      statusCode: 405,
      body: JSON.stringify({
        error: "Method Not Allowed"
      })
    };

  }


  try {

    const data = JSON.parse(event.body);


    const name = data.name || "이름 없음";
    const email = data.email || "이메일 없음";


    // Netlify 환경변수
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;


    if (!botToken || !chatId) {

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Telegram 설정이 없습니다."
        })
      };

    }


    // Telegram으로 보낼 메시지
    const message = `
🔔 새로운 Google 로그인

👤 이름: ${name}
📧 이메일: ${email}
    `.trim();


    // Telegram Bot API
    const telegramURL =
      `https://api.telegram.org/bot${botToken}/sendMessage`;


    const response = await fetch(telegramURL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        chat_id: chatId,

        text: message

      })

    });


    const result = await response.json();


    if (!response.ok) {

      console.error("Telegram 오류:", result);

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Telegram 전송 실패"
        })
      };

    }


    return {

      statusCode: 200,

      body: JSON.stringify({
        success: true
      })

    };


  } catch (error) {

    console.error(error);

    return {

      statusCode: 500,

      body: JSON.stringify({
        error: "서버 오류"
      })

    };

  }

};