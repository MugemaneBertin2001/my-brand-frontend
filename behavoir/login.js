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
    else{
        var users = JSON.parse(localStorage.getItem("users")) || [];

        // Find user by email
        var user = users.find(function(user) {
        return user.email === email;
        });

        // If user not found or password is incorrect, show error
        if (!user || user.password !== password) {
            showError("loginError", "Invalid email or password.");
            return;
        }

        // If no errors, redirect to dashboard (replace "dashboard.html" with actual dashboard URL)
        sessionStorage.setItem('userEmail', email);
        window.location.href = "/dashboard";
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
