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
    var blogCardsContainer = document.getElementById('blogCardsContainer');

    fetch('https://my-brand-backend-lmk2.onrender.com/api/v1/blogs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming data is an array of articles
            var articles = data || [];
            articles.forEach((article, index) => {
                var blogCard = document.createElement('div');
                blogCard.classList.add('blog-card');

                blogCard.innerHTML = `
                    <img src="${article.blogImage}" alt="Blog Image">
                    <div class="blog-info">
                        <h3>${article.title}</h3>
                        <div class="content-body">
                            <p>${article.content}</p>
                        </div>
                        <div class="meta">
                            <a href="./dashboard/article.html?articleId=${article._id}">Read more</a>
                            <div class="comments-likes">
                                <span>${article.comments.length} Comments</span>
                                <span>${article.likes.length} Likes</span>
                            </div>
                        </div>
                    </div>
                `;

                blogCardsContainer.appendChild(blogCard);
            });
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
            // Handle errors gracefully, e.g., display an error message to the user
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
            messageBody: messageInput.value.trim(),
        };

        console.log(formData)
        
        fetch('https://my-brand-backend-lmk2.onrender.com/api/v1/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    // Display a success message
                    alert('Message sent successfully');
                    window.location.reload();
                } else {
                    // Display an error message
                    alert('Failed to send message. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An unexpected error occurred: '.concat(error));
});




        clearInput(fullNameInput);
        clearInput(emailInput);
        clearInput(subjectInput);
        clearInput(messageInput);
    }
    function clearInput(input){
        input.value = "";
    }
});
