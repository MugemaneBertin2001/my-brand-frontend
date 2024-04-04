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



    closeBtn.onclick = function() {
        modal.style.display = "none";
        resetForm();
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
    
        var formData = new FormData();
    
        formData.append('title', titleInput.value.trim());
        formData.append('content', contentInput.value.trim());
        formData.append('file', imageInput.files[0]); 
    
        var token = sessionStorage.getItem('token');
        
        fetch('https://my-brand-backend-lmk2.onrender.com/api/v1/blogs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}` 
            },
            body: formData 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            resetForm();
            articlePopulation();
        })
        .catch(error => {
            console.error('Error creating article:', error);
        });
    
        function validateForm() {
            var isValid = true;
    
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
        blogContainer.innerHTML = ''; 
    
        try {
            document.querySelector('#loader').style.display = "block"
        
            const response = await fetch('https://my-brand-backend-lmk2.onrender.com/api/v1/blogs');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const articles = await response.json();
    
            
            articles.forEach((article, index) => {
                const blogCard = document.createElement('div');
                blogCard.classList.add('blog-card');
    
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
    
                blogContainer.appendChild(blogCard);
                document.querySelector('#loader').style.display = "none"
    
                const deleteBtn = blogCard.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', async () => {
                    document.querySelector('#loader').style.display = "block"
                    try {
                        const token = sessionStorage.getItem('token');
    
                        if (!token) {
                            throw new Error('Token not found');
                        }
                        const deleteResponse = await fetch(`https://my-brand-backend-lmk2.onrender.com/api/v1/blogs/${article._id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        });
    
                        if (!deleteResponse.ok) {
                            throw new Error('Failed to delete article');
                        }
    
                        articlePopulation();
                    } catch (error) {
                        console.error('Error deleting article:', error);
                        
                    }
                    document.querySelector('#loader').style.display = "none"
                
                });
    
            
                const editBtn = blogCard.querySelector('.edit-btn');
                editBtn.addEventListener('click', () => {
                    renderEditModal(article, article._id);
                });
            });
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }
});
function renderEditModal(article, index) {
    var modal = document.getElementById("myModal-edit");
    var closeBtn = document.getElementById("close-edit");
    closeBtn.onclick = function() {
        document.getElementById("myModal-edit").style.display = "none";
    };
    modal.style.display = "block";
    const indexHolder = document.getElementById('index');
    const titleInput = document.getElementById('title-edit');
    const contentInput = document.getElementById('content-edit');
    const imageInput = document.getElementById('image-edit');
    
    indexHolder.innerHTML = index;
    titleInput.value = article.title;
    contentInput.value = article.content.trim();
    imageInput.value = article.image
    modalContent.style.display = 'block';
}


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

    saveEditButton.addEventListener('click', async function(event) {
        event.preventDefault();
        const blogId = indexHolder.textContent; 
        const formData = new FormData();
        formData.append('title', titleInput.value.trim());
        formData.append('content', contentInput.value.trim());
        formData.append('file', imageInput.files[0]);

        if (!validateForm()) {
            return;
        }

        const token = sessionStorage.getItem('token'); 

        try {
            const response = await fetch(`https://my-brand-backend-lmk2.onrender.com/api/v1/blogs/${blogId}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }   
            });

            if (!response.ok) {
                throw new Error('Failed to update blog post.');
            }
            document.querySelector("#editor1").innerHTML = "";

            resetForm();
            window.location.reload(); 
        } catch (error) {
            alert('Error updating blog post:'.concat( error.message));
        }
    });

    function validateForm() {
        let isValid = true;
 
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


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#home-render").addEventListener('click', () => {
        window.location.href = "/"; 
    });
    document.querySelector("#home-render").innerHTML = sessionStorage.getItem('email')

    document.querySelector("#home-render").style.fontSize = "1.2rem"
    document.querySelector("#home-render").style.textAlignment = "center"

});

document.addEventListener('DOMContentLoaded', () => {
    
const tex = window.tex;

    tex.init({
        element: document.querySelector('.editor1'),
        buttons: [
            'fontSize', 'bold', 'italic', 'underline', 'strikethrough', 'heading1', 
            'heading2', 'paragraph', 'removeFormat', 'quote', 'olist', 'ulist', 'code', 
            'line', 'link', 'image', 'html', 'textColor', 'textBackColor', 'indent', 
            'outdent', 'undo', 'redo', 'justifyCenter', 'justifyFull', 'justifyLeft', 
            'justifyRight'
        ],   
        onChange: (content) => {
            console.log("Editor:", content);
        }
    });
 

    

});
