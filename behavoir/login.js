document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("loginForm").addEventListener("submit", validateForm);
    if (sessionStorage.getItem("role")==='admin') {
        window.location.href = "/dashboard"
    }else if( sessionStorage.getItem('role')==="user"){
        window.location.href = "/"
    }else{
        
        return;
    }
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
    else {
        document.querySelector('#loader').style.display = "block";
        fetch('https://my-brand-backend-lmk2.onrender.com/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming the response contains a token
            var token = data.token;
    
            // Decode the token to get the payload
            var decodedToken = decodeJwt(token);

    
            // Extract the user's role from the payload
            var role = decodedToken.userRole; // Assuming 'userRole' is the key for the role in the token payload
            var email = decodedToken.email;
            // Store the token and role in session storage
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('role', role);
            sessionStorage.setItem('email', email);
    
            // Redirect to the appropriate dashboard based on the user's role
            if (role === "admin") {
                window.location.href = "/dashboard"; // Redirect to admin dashboard
            } else {
                window.location.href = "/"; // Redirect to default dashboard
            }
        })
        .catch(error => {
            console.error('Error authenticating user:', error);
            showError("loginError", "An error occurred while logging in. Please try again later.");
        });
        document.querySelector('#loader').style.display = "block";
    }
}

function decodeJwt(token) {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
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
