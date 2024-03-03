
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("signupForm").addEventListener("submit", validateForm);
    if (sessionStorage.getItem("role")==='admin') {
        window.location.href = "/dashboard"
    }else if( sessionStorage.getItem('role')==="user"){
        window.location.href = "/"
    }else{
        
        window.location.href = "/admin/login.html"
    }
});

function validateForm(event) {
    event.preventDefault();

    // Reset error messages
    resetErrors();

    // Get form input values
    var fullName = document.getElementById("fullName").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
    var confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Validate full name
    if (fullName === "") {
        showError("fullNameError", "Please enter your full name.");
    }

    // Validate email
    if (email === "") {
        showError("emailError", "Please enter your email address.");
    } else if (!isValidEmail(email)) {
        showError("emailError", "Please enter a valid email address.");
    }

    // Validate password
    if (password === "") {
        showError("passwordError", "Please enter a password.");
    } else if (password.length < 8) {
        showError("passwordError", "Password must be at least 8 characters long.");
    }

    // Validate confirm password
    if (confirmPassword === "") {
        showError("confirmPasswordError", "Please confirm your password.");
    } else if (confirmPassword !== password) {
        showError("confirmPasswordError", "Passwords do not match.");
    }
    else{
        var users = JSON.parse(localStorage.getItem("users")) || [];

        // Add new user data to the array
        var newUser = { 
            fullName: fullName, 
            email: email, 
            password: password ,
            role : 'user'
        };
        users.push(newUser);

        // Save updated user data back to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Redirect to the login page
        window.location.href = "login.html";

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
