// functions/chat.js
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

exports.handler = async (event, context) => {
  try {
    // Parseamos el body de la request
    const { message } = JSON.parse(event.body);

    // Generar la respuesta con OpenAI
    const response = await openai.chat.completions.create({
      model: "z-ai/glm-4.5-air:free", // Podés cambiar el modelo
      messages: [
        { role: "user", content: message },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.choices[0].message.content }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al comunicarse con OpenAI" }),
    };
  }
};
