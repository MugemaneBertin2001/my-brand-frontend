document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("loginForm").addEventListener("submit", validateForm);
});

function validateForm(event) {
    event.preventDefault();

    // Reset error messages
    resetErrors();

    // Get form input values
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();

    // Validate email
    if (email === "") {
        showError("emailError", "Please enter your email address.");
    } else if (!isValidEmail(email)) {
        showError("emailError", "Please enter a valid email address.");
    }

    // Validate password
    if (password === "") {
        showError("passwordError", "Please enter your password.");
    }

    // If no errors, submit the form
    if (!emailError && !passwordError) {
        document.getElementById("loginForm").submit();
    }
}

function showError(id, message) {
    var errorElement = document.getElementById(id);
    errorElement.textContent = message;
}

function resetErrors() {
    var errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach(function(element) {
        element.textContent = "";
    });
}

function isValidEmail(email) {
    var emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}
