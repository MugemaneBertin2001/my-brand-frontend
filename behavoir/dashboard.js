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
    var modal = document.getElementById("myModal");
    var addBlogBtn = document.getElementById("addBlogBtn");
    var closeBtn = document.getElementsByClassName("close")[0];
    var form = document.getElementById("newBlogForm");
    var titleInput = document.getElementById("title");
    var imageInput = document.getElementById("image");
    var contentInput = document.getElementById("content");
    var errorMessage = document.getElementById("error-message");

    // Open modal
    addBlogBtn.onclick = function() {
        modal.style.display = "block";
    }

    // Close modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
        errorMessage.textContent = "";
        form.reset();
    }

    // Validate form on submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        // Submit form if validation passes
        // Add your code to submit the form data here
    });

    // Function to validate form inputs
    function validateForm() {
        var isValid = true;
        errorMessage.textContent = "";

        if (titleInput.value.trim() === "") {
            errorMessage.textContent += "Title is required. ";
            isValid = false;
        }

        if (imageInput.value.trim() === "") {
            errorMessage.textContent += "Image URL is required. ";
            isValid = false;
        }

        if (contentInput.value.trim() === "") {
            errorMessage.textContent += "Content is required. ";
            isValid = false;
        }

        return isValid;
    }
});

