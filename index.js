const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
const API_KEY = process.env.REACT_APP_API_KEY;

const configuration = new Configuration({
  organization: "org-vZPZUPWfSoBMGldgiJr15CXw",
  //apiKey: "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",
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  const respose = await openai.createCompletion({
    model: "text-davinci-003",
    //prompt: "what is the capital city of India?",
    prompt: `Pretend you are like Doctor. You are an expert physician. You have been helping patients with advising more than 20 years.
        Doctor: How can I help you today? 
        Patient: I need some medical advice, please.
        Doctor: Sure, . 
        Patient:${message}`,
    // message,
    //prompt: { message },
    max_tokens: 1000,
    temperature: 0.9,
  });

  console.log(message);
  console.log(respose.data.model);
  if (respose.data.choices[0].text) {
    res.json({ message: respose.data.choices[0].text });
  } else {
    res.json({ message: "Hello World...!" });
  }
});

app.listen(port, () => {
  console.log("Example app listening...");
});
