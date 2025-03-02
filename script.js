document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    // Load Dark Mode Preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Comment Section Functionality
    document.getElementById('comment-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const commentText = document.getElementById('comment').value.trim();

        if (name === "" || commentText === "") {
            alert("Please enter both name and comment.");
            return;
        }

        const commentItem = document.createElement('li');
        commentItem.innerHTML = `<strong>${name}:</strong> ${commentText}`;
        document.getElementById('comment-list').appendChild(commentItem);

        document.getElementById('name').value = "";
        document.getElementById('comment').value = "";
    });

    // Back-to-Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
