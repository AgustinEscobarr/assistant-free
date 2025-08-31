// functions/chat.js
//const { OpenAI } = require("openai");
const { Mistral } = require('@mistralai/mistralai');

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   baseURL: process.env.OPENAI_BASE_URL,
// });
const mistral = new Mistral({
  apiKey: process.env.OPENAI_API_KEY,
  //baseURL: process.env.OPENAI_BASE_URL,
});

exports.handler = async (event, context) => {
  try {
    // Parseamos el body de la request
    const { message } = JSON.parse(event.body);

    // Generar la respuesta con OpenAI
    const response = await mistral.chat.complete({
      model: "magistral-small-2507", // Podés cambiar el modelo
      messages: [
        { role: "user", content: message },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.choices[0].message.content[1].text }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al comunicarse con OpenAI" }),
    };
  }
};
