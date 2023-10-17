import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai"; // Import the openai module
import cors from "cors"

//Enable CORS for all routes
const app = express();
app.use(cors({
    origin: 'http://localhost:5173/create-post', // Replace with your client's URL
    credentials: true,
  }));


dotenv.config();

const router = express.Router();

// Create an instance of the openai client with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      prompt,
        n: 1,
        size: "1024x1024",
        response_format: "url"
      });
      

    const image = aiResponse.data[0].url;
    
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong")
  }
});

export default router;



// import express from 'express';
// import * as dotenv from 'dotenv';
// import OpenAI from 'openai';

// dotenv.config();


// const router = express.Router();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// })

// router.route('/').get((req, res) =>{
//     res.send('Hello From Dalle')
// });

// router.route('/').post(async (req, res) => {
//     try {
//         const {prompt} = req.body;

//         const aiResponse = await openai.createImage({
//             prompt,
//             n: 1,
//             size: '512x512',
//             Authorization: process.env.OPENAI_API_KEY
//         });

//         //const image = aiResponse.data.data[0].url;

//         res.status(200).json({ photo: image});
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error?.response.data.error.message)
//     }
// })

// export default router;