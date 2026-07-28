# Study-Spark

StudySpark is an AI-powered study assistant web application that helps students learn more efficiently using Google's Gemini AI. Users can create accounts, ask questions, generate quizzes, summarize notes, create flashcards, and practice with fill-in-the-blank questions.

---

# Features

## User Authentication
- User signup and login system
- Stores user information in MongoDB
- Prevents duplicate email registrations
- User logout functionality

## AI Question Answering
- Users can ask StudySpark questions
- Uses Google Gemini AI to generate responses

## AI Quiz Generator
- Generates multiple-choice quizzes based on a chosen topic
- Users can select answers
- Automatically grades quiz responses
- Displays score and correct answers

## AI Summarization
- Summarizes user-provided text into shorter study notes

## AI Flashcard Generator
- Creates study flashcards from a selected topic
- Helps users review important concepts

## Fill in the Blank Practice
- Generates fill-in-the-blank questions
- Users enter their answers
- Provides immediate feedback with correct answers

## User Interface
- Responsive web design
- Landing page
- Dashboard interface
- Styled login/signup pages
- Interactive AI study tools

---

# Technologies Used

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose

## AI API
- Google Gemini API

---

# API Used

 - Google Gemini API

StudySpark uses Google's Gemini AI model to generate:
- Answers
- Quizzes
- Summaries
- Flashcards
- Fill-in-the-blank questions

Gemini is accessed through the Google GenAI Node.js package:

@google/genai


---

# Database Schema

## Users Collection

MongoDB stores user account information using the following schema:

```javascript
{
    username: String,
    email: String,
    password: String
}
---

# Database CRUD Operations

StudySpark uses MongoDB Atlas with Mongoose to perform CRUD (Create, Read, Update, Delete) operations on the Users collection.

## Create

Creates a new user account during signup.

### Operation:
- Adds a new document to the Users collection

### Example:

```javascript
const newUser = new User({

    username,
    email,
    password

});

await newUser.save();
