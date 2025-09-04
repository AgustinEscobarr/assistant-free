
const { Mistral } = require('@mistralai/mistralai');


const mistral = new Mistral({
  apiKey: process.env.OPENAI_API_KEY,
});

const conversationHistory = {};

exports.handler = async (event, context) => {
  try {
    const { message, userId = "default" } = JSON.parse(event.body);

    if (!conversationHistory[userId]) {
      conversationHistory[userId] = [
        { role: "system", content: "Sé concreto con las respuestas, sin dar datos adicionales." },
      ];
    }
    conversationHistory[userId].push({ role: "user", content: message });
    const response = await mistral.chat.complete({
      model: "open-mistral-nemo", // Podés cambiar el modelo
      messages: conversationHistory[userId],
    });

    const assistantReply = response.choices[0].message.content;
    conversationHistory[userId].push({ role: "assistant", content: assistantReply });


    return {
      statusCode: 200,
      body: assistantReply,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al comunicarse con OpenAI" }),
    };
  }
};
