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
    var form = document.getElementById('contact-form');
    var errorLabel = document.getElementById('error-label');

    form.addEventListener('submit', function(event) {
        var fullNameInput = document.getElementById('full-name');
        var emailInput = document.getElementById('email');
        var messageInput = document.getElementById('message');
        var errors = [];

        if (fullNameInput.value.trim() === '') {
            errors.push('Full Name is required');
            fullNameInput.classList.add('invalid');
        } else {
            fullNameInput.classList.remove('invalid');
        }

        if (emailInput.value.trim() === '') {
            errors.push('Email is required');
            emailInput.classList.add('invalid');
        } else {
            emailInput.classList.remove('invalid');
        }

        if (messageInput.value.trim() === '') {
            errors.push('Message is required');
            messageInput.classList.add('invalid');
        } else {
            messageInput.classList.remove('invalid');
        }

        if (errors.length > 0) {
            event.preventDefault(); // Prevent form submission
            errorLabel.textContent = errors.join(', ');
        } else {
            errorLabel.textContent = '';
        }
    });
});
