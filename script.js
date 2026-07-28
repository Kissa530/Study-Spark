let currentQuiz = [];
let currentFlashcards = [];
let currentCard = 0;
let showingAnswer = false;

// Ask StudySpark

const askButton = document.getElementById("askButton");


askButton.addEventListener("click", async () => {

    const prompt = document.getElementById("prompt").value;


    if(prompt === ""){

        alert("Please enter a question.");

        return;

    }


    document.getElementById("answer").innerText =
    "StudySpark is thinking...";


    try {

        const response = await fetch("/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                prompt: prompt
            })

        });


        const data = await response.json();
        
        currentQuiz = data.quiz;

        document.getElementById("answer").innerText =
        data.answer;


    } catch(error) {

        console.log(error);


        document.getElementById("answer").innerText =
        "Something went wrong. Please try again.";

    }

});




// Quiz Feature

const quizButton = document.getElementById("quizButton");


quizButton.addEventListener("click", async () => {


    const topic = document.getElementById("prompt").value;


    if(topic === ""){

        alert("Please enter a topic.");

        return;

    }


    try {


        const response = await fetch("/quiz", {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({
                topic: topic
            })

        });



        const data = await response.json();


        // Save quiz for checking answers
        currentQuiz = data.quiz;



        let quizHTML = "";



        data.quiz.forEach((q,index)=>{


            quizHTML += `

            <div class="quizQuestion">

                <h3>
                ${index + 1}. ${q.question}
                </h3>


                ${q.options.map(option => `

                    <label>

                        <input
                        type="radio"
                        name="q${index}"
                        value="${option}">

                        ${option}

                    </label>

                    <br>


                `).join("")}


            </div>

            <br>

            `;


        });



        quizHTML += `

        <button id="submitQuizButton">
            Submit Quiz
        </button>

        `;



        document.getElementById("quiz").innerHTML =
        quizHTML;



        // Attach submit button after it is created
        document.getElementById("submitQuizButton")
        .addEventListener("click", checkQuiz);



    } catch(error){


        console.log("Quiz Error:", error);


        document.getElementById("quiz").innerText =
        "Quiz generation failed.";


    }


});




// Check Quiz Answers


function checkQuiz(){


    let score = 0;


    let resultsHTML = "";



    currentQuiz.forEach((q,index)=>{


        const selected =
        document.querySelector(
            `input[name="q${index}"]:checked`
        );



        const userAnswer =
        selected ? selected.value : "No answer selected";



        const correct =
        userAnswer === q.answer;



        if(correct){

            score++;

        }



        resultsHTML += `


        <div class="quizResult">


            <h3>
            Question ${index + 1}
            </h3>


            <p>
            ${q.question}
            </p>


            <p>

            <strong>Your Answer:</strong>

            <span style="color:${correct ? "green" : "red"}">

            ${userAnswer}

            </span>

            </p>



            <p>

            <strong>Correct Answer:</strong>

            <span style="color:green">

            ${q.answer}

            </span>

            </p>


            <hr>


        </div>


        `;


    });



    document.getElementById("answer").innerHTML = `


    <h2>
    Score: ${score}/${currentQuiz.length}
    </h2>


    ${resultsHTML}


    `;


}



// Summarize Feature

const summarizeButton = document.getElementById("summarizeButton");


summarizeButton.addEventListener("click", async () => {

    const text = document.getElementById("prompt").value;


    if(text === ""){

        alert("Please enter text to summarize.");

        return;

    }


    document.getElementById("summary").innerText =
    "Creating summary...";


    try {

        const response = await fetch("/summarize", {

            method: "POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({
                text: text
            })

        });


        const data = await response.json();


        document.getElementById("summary").innerText =
        data.summary;


    } catch(error){

        console.log(error);


        document.getElementById("summary").innerText =
        "Summary generation failed.";

    }

});




// Flashcards Feature

const flashcardButton = document.getElementById("flashcardButton");

flashcardButton.addEventListener("click", async () => {

    const topic = document.getElementById("prompt").value;

    if(topic === ""){

        alert("Please enter a topic.");
        return;

    }

    document.getElementById("flashcards").innerHTML =
    "Creating flashcards...";

    try{

        const response = await fetch("/flashcards",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({
                topic: topic
            })

        });

        const data = await response.json();

        currentFlashcards = data.flashcards;

        currentCard = 0;

        showingAnswer = false;

        displayFlashcard();

    }

    catch(error){

        console.log(error);

        document.getElementById("flashcards").innerHTML =
        "Flashcard generation failed.";

    }

});

function displayFlashcard(){

    const flashcard = currentFlashcards[currentCard];

    document.getElementById("flashcards").innerHTML = `

        <div class="flashcard">

            <h2>
            Card ${currentCard + 1} of ${currentFlashcards.length}
            </h2>

            <h3>

            ${
                showingAnswer ?
                flashcard.answer :
                flashcard.question
            }

            </h3>

            <br>

            <button id="flipButton">

                ${
                    showingAnswer ?
                    "Show Question" :
                    "Show Answer"
                }

            </button>

            <button id="previousButton">

                Previous

            </button>

            <button id="nextButton">

                Next

            </button>

        </div>

    `;

    document.getElementById("flipButton").onclick = () => {

        showingAnswer = !showingAnswer;

        displayFlashcard();

    };

    document.getElementById("previousButton").onclick = () => {

        if(currentCard > 0){

            currentCard--;

            showingAnswer = false;

            displayFlashcard();

        }

    };

    document.getElementById("nextButton").onclick = () => {

        if(currentCard < currentFlashcards.length - 1){

            currentCard++;

            showingAnswer = false;

            displayFlashcard();

        }

    };

}

// Fill in the Blank

let fillQuestions = [];


const fillButton = 
document.getElementById("FillInTheBlankButton");


fillButton.addEventListener("click", async () => {


    const topic = 
    document.getElementById("prompt").value;


    if(topic === ""){

        alert("Please enter a topic.");

        return;

    }


    document.getElementById("fillInTheBlank").innerHTML =
    "Generating questions...";


    try {


        const response = await fetch("/fillblanks", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                topic: topic

            })

        });



        const data = await response.json();



        fillQuestions = data.fillblanks;



        let html = "";



        fillQuestions.forEach((item, index) => {


            html += `

            <div class="fillCard">

                <h3>
                    Question ${index + 1}
                </h3>


                <p>
                    ${item.question}
                </p>


                <input 
                    type="text"
                    id="fillAnswer${index}"
                    placeholder="Enter your answer"
                >


                <button onclick="checkFillAnswer(${index})">
                    Check Answer
                </button>


                <p id="fillResult${index}">
                    
                </p>


            </div>

            <br>

            `;


        });



        document.getElementById("fillInTheBlank").innerHTML =
        html;



    } catch(error){


        console.log("Fill in the Blank Error:", error);


        document.getElementById("fillInTheBlank").innerHTML =
        "Failed to generate questions.";


    }


});




// Check Answers


function checkFillAnswer(index){


    const userAnswer =

    document.getElementById(`fillAnswer${index}`)
    .value
    .trim()
    .toLowerCase();



    const correctAnswer =

    fillQuestions[index]
    .answer
    .trim()
    .toLowerCase();



    const result =

    document.getElementById(`fillResult${index}`);



    if(userAnswer === correctAnswer){


        result.innerHTML =

        "✅ Correct!";


    }
    else{


        result.innerHTML =

        `
        ❌ Incorrect!
        <br>
        Correct answer: ${fillQuestions[index].answer}
        `;


    }

}
// Logout Feature
const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", () => {

    window.location.href = "index.html";

});