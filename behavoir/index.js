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
    var loader = document.querySelector('#loader');
    loader.style.display = "block";

    fetch('https://my-brand-backend-lmk2.onrender.com/api/v1/blogs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            var articles = data || [];
            articles.forEach((article, index) => {
                var blogCard = document.createElement('div');
                blogCard.classList.add('blog-card');

                blogCard.innerHTML = `
                    <img src="${article.blogImage}" alt="Blog Image">
                    <div class="blog-info">
                        <h3>${article.title}</h3>
                        <div class="content-body">
                            <p class="blog-cont" id="articleContent">${article.content.substring(0, 500) + "..."}</p>
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
        })
        .finally(() => {
            loader.style.display = "none";
        });

});


document.addEventListener('DOMContentLoaded', function() {
    var contactForm = document.getElementById("contact-form");
    var fullNameInput = document.getElementById("full-name");
    var emailInput = document.getElementById("email");
    var subjectInput = document.getElementById("subject");
    var messageInput = document.getElementById("message");


    var fullNameError = document.getElementById("full-name-error");
    var emailError = document.getElementById("email-error");
    var subjectError = document.getElementById("subject-error");
    var messageError = document.getElementById("message-error");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        
        fullNameError.textContent = "";
        emailError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";


        if (fullNameInput.value.trim() === "") {
            fullNameError.textContent = "Full Name is required.";
        }

    
         if (subjectInput.value.trim() === "") {
            subjectError.textContent = "Subject  is required.";
        }

         if (messageInput.value.trim() === "") {
            messageError.textContent = "Message  is required.";
            
        }

        if (emailInput.value.trim() === "") {
            emailError.textContent = "Email is required.";
        } else if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = "Invalid email format.";
            return;
        }else{

            saveFormData();
        }
    });

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function saveFormData() {
        var formData = {
            fullName: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            messageBody: messageInput.value.trim(),
        };

        console.log(formData);
        
        var loader = document.querySelector('#loader');
        loader.style.display = "block";

        fetch('https://my-brand-backend-lmk2.onrender.com/api/v1/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    alert('Failed to send message. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An unexpected error occurred: '.concat(error));
            })
            .finally(() => {
                loader.style.display = "none";
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
