import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export async function suggestionsText(inputSearch) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: inputSearch.toUpperCase(),
    temperature: 0.6,
  });
  //res.status(200).json({ result: completion.data.choices[0].text });

  const response = completion.data.choices[0].text;

  return response;
}

export async function suggestionsGrammaticalText(inputSearch) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Correct the text in grammatically correct Italian:\n\n ${inputSearch}`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  const response = completion.data.choices[0].text;

  return response;
}

export async function marvChatBot(message) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Marv is a chatbot that reluctantly answers questions with sarcastic responses in italian language:\n\n${message}\nMarv:`,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });

  const response = completion.data.choices[0].text;

  return response;
}
