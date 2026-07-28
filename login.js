const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;


    try {

        const response = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                email: email,

                password: password

            })

        });


        const data = await response.json();


    if (data.message === "Login successful") {

    window.location.href = "dashboard.html";

} else {

    document.getElementById("message").innerText =
    data.error;

}


    } catch(error) {

        console.log(error);

        document.getElementById("message").innerText =
        "Login failed.";

    }

});