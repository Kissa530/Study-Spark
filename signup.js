const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {

    const password = document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        event.preventDefault();

        alert("Passwords do not match!");

    }

});