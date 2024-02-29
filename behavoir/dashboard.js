function toggleSidebar() {
    var sidebarLeft = document.getElementById("sidebarLeft");
    var barsIcon = document.querySelector('.fa-bars');
    var closeIcon = document.querySelector('.fa-window-close');

    sidebarLeft.classList.toggle("show-sidebar");

    if (sidebarLeft.classList.contains("show-sidebar")) {
        barsIcon.style.display = "none";
        closeIcon.style.display = "block";
    } else {
        barsIcon.style.display = "block";
        closeIcon.style.display = "none";
    }
}
document.addEventListener('DOMContentLoaded', function() {

    if (!sessionStorage.getItem("userEmail")) {
        window.location.href = "/admin/login.html"
    }

    articlePopulation();

    document.querySelector('.user-logo').addEventListener('click', function() {
        sessionStorage.removeItem("userEmail");
        window.location.href = "/admin/login.html"
    });

    var modal = document.getElementById("myModal");
    var addBlogBtn = document.getElementById("addBlogBtn");
    var closeBtn = document.getElementsByClassName("close")[0];
    var form = document.getElementById("newBlogForm");
    var titleInput = document.getElementById("title");
    var imageInput = document.getElementById("image");
    var contentInput = document.getElementById("content");
    var titleError = document.getElementById("titleError");
    var imageError = document.getElementById("imageError");
    var contentError = document.getElementById("contentError");

    // Open modal
    addBlogBtn.onclick = function() {
        modal.style.display = "block";
    };

    // Close modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
        resetForm();
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        var articles = JSON.parse(localStorage.getItem('articles')) || [];

        var reader = new FileReader();
        reader.onload = function(event) {
            var image = event.target.result;
            var newArticle = {
                title: titleInput.value.trim(),
                image: image,
                content: contentInput.value.trim(),
                likes: 0,
                comments: []
            };
            articles.push(newArticle);
            localStorage.setItem('articles', JSON.stringify(articles));
            resetForm();
            articlePopulation(); // Update the displayed articles after adding a new one
        };
        reader.readAsDataURL(imageInput.files[0]);

        function validateForm() {
            var isValid = true;

            // Reset error messages
            titleError.textContent = "";
            imageError.textContent = "";
            contentError.textContent = "";

            if (titleInput.value.trim() === "") {
                titleError.textContent = "Title is required.";
                isValid = false;
            }

            if (imageInput.value.trim() === "") {
                imageError.textContent = "Image URL is required.";
                isValid = false;
            }

            if (contentInput.value.trim() === "") {
                contentError.textContent = "Content is required.";
                isValid = false;
            }

            return isValid;
        }

        function resetForm() {
            form.reset();
            titleError.textContent = "";
            imageError.textContent = "";
            contentError.textContent = "";
            contentInput.value = "";
        }
    });

    function articlePopulation() {
        const blogContainer = document.querySelector('#blog-container');
        blogContainer.innerHTML = ''; // Clear the previous content
    
        // Retrieve articles from local storage
        let articles = JSON.parse(localStorage.getItem('articles')) || [];
    
        // Populate blog container with articles
        articles.forEach((article, index) => { // Add index parameter to keep track of article index
            // Create a new blog card element
            const blogCard = document.createElement('div');
            blogCard.classList.add('blog-card');
    
            // Set HTML content for the blog card
            blogCard.innerHTML = `
                <img src="${article.image}" alt="Blog Image">
                <div class="blog-info">
                    <h3>${article.title}</h3>
                    <div class="content-body">
                        <p>${article.content}</p>
                    </div>
                    <div class="meta">
                        <button class="delete-btn"><i class="fas fa-trash"></i> Delete</button>
                        <button class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
                        <div class="comments-likes">
                            <span><i class="fas fa-comment"></i> ${article.comments.length} Comments</span>
                            <span><i class="fas fa-thumbs-up"></i> ${article.likes} Likes</span>
                        </div>
                    </div>
                </div>
            `;
    
            // Append the blog card to the blog container
            blogContainer.appendChild(blogCard);
    
            // Add event listener to delete button
            const deleteBtn = blogCard.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                // Remove the article from the articles array
                articles.splice(index, 1);
    
                // Update local storage with the modified articles array
                localStorage.setItem('articles', JSON.stringify(articles));
    
                // Re-populate the blog container to reflect the changes
                articlePopulation();
            });
        });
    }
    
 


    function editCapability(blogCard, article) {
        const editBtn = blogCard.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            // Display the edit modal or form pre-filled with the article's information
            // Allow the user to edit the article and update it in the local storage
            // Update the DOM to reflect the changes
            // You can implement this part based on your specific requirements
            console.log('Edit button clicked for article:', article);
        });
    }

});
document.addEventListener('DOMContentLoaded', function() {
    const messageCardsContainer = document.querySelector('.message-cards');

    // Retrieve messages from local storage
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

    // Function to render message cards
    function renderMessageCards() {
        // Clear existing message cards
        messageCardsContainer.innerHTML = '';

        // Iterate over messages and populate message cards container
        messages.forEach((message, index) => {
            // Create a new message card element
            const messageCard = document.createElement('div');
            messageCard.classList.add('message-card');

            // Set HTML content for the message card
            messageCard.innerHTML = `
                <div class="sender-info">
                    <div class="sender-name">${message.fullName}</div>
                </div>
                <div class="message-info">
                    <div class="message-subject">${message.subject}</div>
                    <div class="message-body">
                        <p>${message.message}</p>
                    </div> 
                    </div>
                    <div class="meta">
                    <div class="message-timestamp">${message.timestamp}</div>
                    <button class="respond-btn">Respond</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                    <div>
                </div>
            `;

            // Append the message card to the message cards container
            messageCardsContainer.appendChild(messageCard);
        });

        // Add event listeners for delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', () => {
                // Get the index of the message to delete
                const index = parseInt(deleteBtn.getAttribute('data-index'));

                // Remove the message from the messages array
                messages.splice(index, 1);

                // Update local storage with the modified messages array
                localStorage.setItem('contactMessages', JSON.stringify(messages));

                // Reload the page to reflect the changes
                location.reload();
            });
        });
    }

    // Render initial message cards
    renderMessageCards();
});
