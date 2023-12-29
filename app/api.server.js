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

  const storyLines = [
    "The Lost Toy",
    "The Friendly Monster",
    "The Talking Animal",
    "The Magical Treehouse",
    "The Courageous Robot",
    "The Time-Traveling Adventure",
    "The Animal Superhero",
    "The Wishing Well",
    "The Traveling Puppet Show",
    "A lonely cloud finds comfort in the friendship of a group of curious children.",
    "A mischievous squirrel teaches a group of campers a valuable lesson about respecting nature's balance.",
    "A young kid's imagination transforms a ordinary backyard into a fantastical world filled with talking animals and magical creatures.",
    "A shy and timid snail discovers its hidden strength and courage during a daring race against time.",
    "A group of young friends embark on an extraordinary adventure to save a magical kingdom from a wicked sorcerer's spell.",
    "A tiny seed sprouts into an extraordinary tree that becomes a beacon of hope and friendship for the entire community.",
    "A young child discovers a hidden portal that leads her to a world of talking books, where she embarks on a series of adventures inspired by her favorite stories.",
    "A group of robots, programmed to serve and protect, develop their own sense of individuality and free will, leading them to question their purpose in the world.",
    "A young childs love for painting transforms her ordinary town into a vibrant canvas of colors and imaginative characters.",
    "A group of musical instruments come to life and form an orchestra, their melodies bringing harmony and joy to the world around them.",
    "A young kids's dream of flying is realized when he discovers a pair of magical wings that allow him to soar through the skies.",
    "A group of friends learn the importance of cooperation and teamwork when they join forces to build a giant sandcastle that becomes a symbol of their friendship.",
    "An ordinary toy bear comes to life and embarks on a series of hilarious misadventures, teaching a young kid the importance of imagination and creativity.",
    "A timid mouse discovers hidden courage when it faces the threat of a hungry cat, learning that even the smallest creatures can be brave.",
    "A group of children discover a lost treasure map leading to a hidden pirate ship filled with gold and jewels.",
    "An ordinary pet dog becomes an extraordinary hero when it saves its owner from a dangerous situation, proving that even the most humble creatures have extraordinary potential.",
    "A young child love for nature inspires her to create a garden that becomes a haven for wildlife and a source of inspiration for the entire community.",
    "A group of friends learn the value of forgiveness and understanding when they encounter a misunderstood creature that turns out to be more than they bargained for.",
  ]

  const random = Math.floor(Math.random() * storyLines.length);
  // generate prompt for openai with user input
  function generatePrompt(word, gender, time) {
    return `Tell me a short ${time} minute reading time kids story starring a ${gender} named ${word} (The story should not describe what ${word} looks like.). The story should be about ${storyLines[random]}. 
    
    Return text format paragraphed with html syntax`;
  }
  
