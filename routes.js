const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const { GoogleGenAI } = require("@google/genai");


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }

});


const User = mongoose.model("User", userSchema);


// Ask StudySpark
router.post("/generate", async (req, res) => {

    try {

        const prompt = req.body.prompt;


        if (!prompt) {
            return res.status(400).json({
                error: "No prompt provided"
            });
        }


        const result = await ai.models.generateContent({

            model: "gemini-3.5-flash-lite",

            contents: prompt

        });


        res.json({
            answer: result.text
        });


    } catch (error) {

        console.log("Gemini Error:", error);


        res.status(500).json({
            error: error.message
        });

    }

});




// Generate Quiz
router.post("/quiz", async (req, res) => {

    try {

        const topic = req.body.topic;


        if (!topic) {
            return res.status(400).json({
                error: "No topic provided"
            });
        }


        const result = await ai.models.generateContent({

            model: "gemini-3.5-flash-lite",

            contents: `
            Create a 5 question multiple choice quiz about ${topic}.

            Return ONLY JSON in this format:

            [
              {
                "question": "Question text",
                "options": [
                    "Option A",
                    "Option B",
                    "Option C",
                    "Option D"
                ],
                "answer": "Option A"
              }
            ]
            `

        });


        const quiz = JSON.parse(result.text);


        res.json({
            quiz: quiz
        });


    } catch (error) {

        console.log("Quiz Error:", error);


        res.status(500).json({
            error: error.message
        });

    }

});
// Summarize Text
router.post("/summarize", async (req, res) => {

    try {

        const text = req.body.text;


        const result = await ai.models.generateContent({

            model: "gemini-3.5-flash-lite",

            contents:
            `
            Summarize this for a student:

            ${text}
            `

        });


        res.json({
            summary: result.text
        });


    } catch(error){

        console.log("Summary Error:", error);

        res.status(500).json({
            error: error.message
        });

    }

});
// Generate Flashcards
router.post("/flashcards", async (req, res) => {

    try {

        const topic = req.body.topic;


        const result = await ai.models.generateContent({

            model: "gemini-3.5-flash-lite",

            contents: `
            Create 10 study flashcards about ${topic}.

            Return ONLY JSON in this format:

            [
                {
                    "question": "Question here",
                    "answer": "Answer here"
            }
          ]
`

        });


        const flashcards = JSON.parse(result.text);

        res.json({
            flashcards: flashcards
     });


    } catch(error){

        console.log("Flashcard Error:", error);

        res.status(500).json({
            error: error.message
        });

    }

});
// Fill in the Blank
router.post("/fillblanks", async (req,res)=>{

    try{

        const topic = req.body.topic;


        if(!topic){

            return res.status(400).json({
                error:"No topic provided"
            });

        }


        const result = await ai.models.generateContent({

            model:"gemini-3.5-flash-lite",

            contents: `

Create 5 fill in the blank questions about ${topic}.

Return ONLY JSON.

Use this exact format:

[
    {
        "question": "Question with ______ blank",
        "answer": "correct answer"
    }
]

`

        });


        const fillblanks = JSON.parse(result.text);


        res.json({

            fillblanks: fillblanks

        });


    }catch(error){


        console.log("Fill Blank Error:", error);


        res.status(500).json({

            error:error.message

        });

    }

});

// Signup
router.post("/signup", async (req, res) => {

    try {

        const { username, email, password } = req.body;


        if (!username || !email || !password) {

            return res.status(400).json({
                error: "Missing fields"
            });

        }


        const existingUser = await User.findOne({
            email: email
        });


        if (existingUser) {

            return res.status(400).json({
                error: "Email already exists"
            });

        }


        const newUser = new User({

            username,
            email,
            password

        });


        await newUser.save();


        res.json({

            message: "Signup successful"

        });


    } catch(error) {

        console.log("Signup Error:", error);


        res.status(500).json({

            error: "Signup failed"

        });

    }

});

// Login
router.post("/login", async (req,res)=>{

    try {

        const {email, password} = req.body;


        const user = await User.findOne({
            email: email
        });


        if(!user){

            return res.status(400).json({
                error:"User not found"
            });

        }


        if(user.password !== password){

            return res.status(400).json({
                error:"Incorrect password"
            });

        }


        res.json({

            message:"Login successful"

        });


    } catch(error){

        console.log("Login error:", error);

        res.status(500).json({
            error:"Login failed"
        });

    }

});

//Logout
router.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/index.html");

    });

});
module.exports = router;