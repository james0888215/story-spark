import invariant from "tiny-invariant";
import DOMPurify from "dompurify";
import OpenAI from "openai";

invariant(process.env.OPENAI_API_KEY, "OPENAI_API_KEY must be set");

const openai = new OpenAI({
    // eslint-disable-next-line no-undef
    apiKey: process.env.OPENAI_API_KEY,
  });
  
export async function submitPrompt(word = "", gender = "", time = "1") {
  console.log(gender, "gender") 
  console.log(time, "time")
  console.log(word, "word")
    // check if openai api key is set
    if (!openai.apiKey) {
      return Promise.reject({});
    }
  
    // sanitize input
    // word = DOMPurify.sanitize(word);
  
    // check if word is empty
    // if (word.trim().length === 0) {
    //   return Promise.reject({ message: "Please enter a valid word" });
    // }
  
    // call openai api with input
    try {
      const completion = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt : generatePrompt(word, gender, time),
        temperature: 0.6,
        max_tokens: 1000,
        top_p: 1,
        n: 1,
        logprobs: null,
        stop: "{}"
      });
      return completion.choices[0].text;
    } catch (error) {
      return Promise.reject({ error });
    }
  }
  
  // generate prompt for openai with user input
  function generatePrompt(word, gender, time) {
    return `Tell me a short ${time} minute kids story with a ${gender} named ${word}. ${word} is a ${gender} and the story should be child friendly, be full of adventure and have a happy ending. The story should not describe what ${word} looks like.
    
    Return text format paragraphed with html syntax`;
  }
  
