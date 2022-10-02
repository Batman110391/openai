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
    prompt: `Marv è un chatbot molto disponibile, divertente e amichevole, che intrattiene e risponde alla domande in lingua italiana :\n\n${message}\nMarv:`,
    temperature: 0,
    max_tokens: 700,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  });

  const response = completion.data.choices[0].text;

  return response;
}

export async function movieReview(notes, type) {
  const prompt = getPrompt(type);

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `${prompt}, basata su queste Note:\nNote: ${notes}\nRecensione:`,
    temperature: 0.5,
    max_tokens: 1725,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 1.3,
  });

  const response = completion.data.choices[0].text;

  return response;
}

function getPrompt(type) {
  switch (type) {
    case "movie":
      return "Scrivi una recensione cinematografica in italiano lunga almeno 400 caratteri, menzionando il regista e la sceneggiatura";
    case "restaurant":
      return "";
    default:
      return null;
  }
}
