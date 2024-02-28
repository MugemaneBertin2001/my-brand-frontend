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
        const articles = JSON.parse(localStorage.getItem('articles')) || [];

        // Populate blog container with articles
        articles.forEach(article => {
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
