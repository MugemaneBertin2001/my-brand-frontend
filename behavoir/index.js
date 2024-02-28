function openMenu() {
    document.getElementById('navbar').style.display= 'block';
    document.getElementById('openButton').style.display = 'none';
    document.getElementById('closeButton').style.display = 'block';
}

function closeMenu() {
    document.getElementById('openButton').style.display = 'block';
    document.getElementById('navbar').style.display='none';
    document.getElementById('closeButton').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve saved articles from localStorage
    var articles = JSON.parse(localStorage.getItem('articles')) || [];
    var blogCardsContainer = document.getElementById('blogCardsContainer');

    // Iterate through saved articles and display them
    articles.forEach(article => {
        // Create HTML structure for each article
        var blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');

        blogCard.innerHTML = `
            <img src="${article.image}" alt="Blog Image">
            <div class="blog-info">
                <h3>${article.title}</h3>
                <div class="content-body">
                    <p>${article.content}</p>
                </div>
                <div class="meta">
                    <a href="./dashboard/article.html">Read more</a>
                    <div class="comments-likes">
                        <span>${article.comments.length} Comments</span>
                        <span>${article.likes} Likes</span>
                    </div>
                </div>
            </div>
        `;

        // Append the blog card to the container
        blogCardsContainer.appendChild(blogCard);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var contactForm = document.getElementById("contact-form");
    var fullNameInput = document.getElementById("full-name");
    var emailInput = document.getElementById("email");
    var subjectInput = document.getElementById("subject");
    var messageInput = document.getElementById("message");

    // Error message spans
    var fullNameError = document.getElementById("full-name-error");
    var emailError = document.getElementById("email-error");
    var subjectError = document.getElementById("subject-error");
    var messageError = document.getElementById("message-error");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Clear previous error messages
        fullNameError.textContent = "";
        emailError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";

        // Validate full name
        if (fullNameInput.value.trim() === "") {
            fullNameError.textContent = "Full Name is required.";
        }

         // Validate subject
         if (subjectInput.value.trim() === "") {
            subjectError.textContent = "Subject  is required.";
        }
         // Validate Message body
         if (messageInput.value.trim() === "") {
            messageError.textContent = "Message  is required.";
            
        }
        // Validate email
        if (emailInput.value.trim() === "") {
            emailError.textContent = "Email is required.";
        } else if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = "Invalid email format.";
            return;
        }else{

            saveFormData();
        }
    });

    // Function to validate email format
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to save form data to local storage
    function saveFormData() {
        var formData = {
            fullName: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };

        // Retrieve existing messages from local storage
        var savedMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];

        // Add the new message to the array
        savedMessages.push(formData);

        // Save the updated array back to local storage
        localStorage.setItem('contactMessages', JSON.stringify(savedMessages));
        clearInput(fullNameInput);
        clearInput(emailInput);
        clearInput(subjectInput);
        clearInput(messageInput);
    }
    function clearInput(input){
        input.value = "";
    }
});
