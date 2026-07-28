const signupForm = document.getElementById("signupForm");


signupForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    if(password !== confirmPassword){

        alert("Passwords do not match!");

        return;

    }


    try {

        const response = await fetch("/signup", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                username,
                email,
                password

            })

        });


        const data = await response.json();


        if(response.ok){

            alert("Signup successful! Please login.");

            window.location.href = "login.html";

        } else {

            alert(data.error);

        }


    } catch(error){

        console.log(error);

        alert("Signup failed.");

    }


});