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

    if(!sessionStorage.getItem("token")){
        window.location.href = "/admin/login.html"
    }
    document.querySelector('.user-logo').addEventListener('click', function(){
        sessionStorage.removeItem('userEmail')
        sessionStorage.removeItem('role')
        window.location.reload();
    })
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
    addBlogBtn.onclick = function(){
        modal.style.display = "block"
    }

    articlePopulation();



  
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
    
        var formData = new FormData(); // Create FormData object to store form data
    
        // Add form fields to FormData object
        formData.append('title', titleInput.value.trim());
        formData.append('content', contentInput.value.trim());
        formData.append('image', imageInput.files[0]); // Add image file
    
        // Fetch endpoint with Bearer token and FormData for file upload
        var token = sessionStorage.getItem('token');
        fetch('https://my-brand-backend-lmk2.onrender.com/api/v1/blogs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}` // Include Bearer token in headers
            },
            body: formData // Use FormData object for file upload
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Article created successfully, reset form and update UI
            resetForm();
            articlePopulation(); // Update the displayed articles after adding a new one
        })
        .catch(error => {
            console.error('Error creating article:', error);
            // Handle error gracefully
        });
    
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
    
            if (!imageInput.files[0]) {
                imageError.textContent = "Image file is required.";
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
            modal.style.display = "none";
        }
    });
    

    async function articlePopulation() {
        const blogContainer = document.querySelector('#blog-container');
        blogContainer.innerHTML = ''; // Clear the previous content
    
        try {
            // Fetch articles from the backend API
            const response = await fetch('https://my-brand-backend-lmk2.onrender.com/api/v1/blogs');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const articles = await response.json();
    
            // Populate blog container with articles
            articles.forEach((article, index) => { // Add index parameter to keep track of article index
                // Create a new blog card element
                const blogCard = document.createElement('div');
                blogCard.classList.add('blog-card');
    
                // Set HTML content for the blog card
                blogCard.innerHTML = `
                    <img src="${article.blogImage}" alt="Blog Image">
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
                                <span><i class="fas fa-thumbs-up"></i> ${article.likes.length} Likes</span>
                            </div>
                        </div>
                    </div>
                `;
    
                // Append the blog card to the blog container
                blogContainer.appendChild(blogCard);
    
                // Add event listener to delete button
                const deleteBtn = blogCard.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', async () => {
                    try {
                        // Make a DELETE request to remove the article from the backend
                        const deleteResponse = await fetch(`https://my-brand-backend-lmk2.onrender.com/api/v1/blogs/${article.id}`, {
                            method: 'DELETE',
                        });
                        if (!deleteResponse.ok) {
                            throw new Error('Failed to delete article');
                        }
    
                        // Re-populate the blog container to reflect the changes
                        articlePopulation();
                    } catch (error) {
                        console.error('Error deleting article:', error);
                        // Handle error gracefully
                    }
                });
    
                // Add event listener to edit button
                const editBtn = blogCard.querySelector('.edit-btn');
                editBtn.addEventListener('click', () => {
                    renderEditModal(article, index);
                });
            });
        } catch (error) {
            console.error('Error fetching articles:', error);
            // Handle error gracefully
        }
    }
});
function renderEditModal(article, index) {
    // Select the modal content
    var modal = document.getElementById("myModal-edit");
    var closeBtn = document.getElementById("close-edit");
       // Close modal
    closeBtn.onclick = function() {
        document.getElementById("myModal-edit").style.display = "none";
    };
    modal.style.display = "block";
    // Populate the form fields with existing article information
    const indexHolder = document.getElementById('index');
    const titleInput = document.getElementById('title-edit');
    const contentInput = document.getElementById('content-edit');
    const imageInput = document.getElementById('image-edit');
    
    indexHolder.innerHTML = index;
    titleInput.value = article.title;
    contentInput.value = article.content;
    imageInput.value = article.image
    // Show the modal
    modalContent.style.display = 'block';
}
document.addEventListener('DOMContentLoaded', function() {
    const messageCardsContainer = document.querySelector('.message-cards');

    // Retrieve messages from the server
    fetch('https://my-brand-backend-lmk2.onrender.com/api/v1/message')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            return response.json();
        })
        .then(messages => {
            // Handle the retrieved messages
            console.log('All messages:', messages);
            // Render message cards with the retrieved messages
            renderMessageCards(messages);
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors, such as displaying an error message to the user
            alert('An error occurred while fetching messages. Please try again later.');
        });

    // Function to render message cards
    function renderMessageCards(messages) {
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
                        <p>${message.messageBody}</p>
                    </div> 
                </div>
                <div class="meta">
                    <div class="message-timestamp">${message.timestamp}</div>
                    <button class="respond-btn">Respond</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
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
});

document.addEventListener('DOMContentLoaded', function() {
    const saveEditButton = document.getElementById('saveEditButton');
    const indexHolder = document.getElementById('index');
    const titleInput = document.getElementById('title-edit');
    const imageInput = document.getElementById('image-edit');
    const contentInput = document.getElementById('content-edit');
    const editTitleError = document.getElementById('edit-titleError');
    const editImageError = document.getElementById('edit-imageError');
    const editContentError = document.getElementById('edit-contentError');
    const modalEdit = document.getElementById('myModal-edit');

    saveEditButton.addEventListener('click', function(event) {
        event.preventDefault();

        const articleIndex = parseInt(indexHolder.textContent);
        let articles = JSON.parse(localStorage.getItem('articles')) || [];
        const article = articles[articleIndex];

        if (!validateForm()) {
            return;
        }

        // Update article data
        article.title = titleInput.value.trim();
        article.content = contentInput.value.trim();

        // Check if an image is selected
        if (imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageBase64 = event.target.result;
                article.image = imageBase64; // Update image only if a new image is selected
                updateArticle();
            };
            // Read the selected image file as data URL
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            updateArticle(); // No new image selected, proceed with updating article
        }

        function updateArticle() {
            // Update the article in the articles array
            articles[articleIndex] = article;
            localStorage.setItem('articles', JSON.stringify(articles));
            resetForm();
            window.location.reload();
        }

        function validateForm() {
            let isValid = true;

            // Reset error messages
            editTitleError.textContent = "";
            editImageError.textContent = "";
            editContentError.textContent = "";

            if (titleInput.value.trim() === "") {
                editTitleError.textContent = "Title is required.";
                isValid = false;
            }

            if (contentInput.value.trim() === "") {
                editContentError.textContent = "Content is required.";
                isValid = false;
            }

            return isValid;
        }

        function resetForm() {
            titleInput.value = "";
            imageInput.value = "";
            contentInput.value = "";
            editTitleError.textContent = "";
            editImageError.textContent = "";
            editContentError.textContent = "";
            modalEdit.style.display = "none";
        }
    });
});
