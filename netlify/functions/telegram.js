exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }

    const { question } = JSON.parse(event.body);

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const userAgent = event.headers["user-agent"] || "알 수 없음";
    const ip =
        event.headers["x-nf-client-connection-ip"] ||
        event.headers["client-ip"] ||
        "알 수 없음";

    const message = `
📩 새 질문

💬 질문:
${question}

🌐 IP:
${ip}

💻 브라우저/OS:
${userAgent}
`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
    };
};