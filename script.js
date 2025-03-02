document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const backToTopButton = document.getElementById("back-to-top");

    // Check Local Storage for Dark Mode
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
    }

    // Dark Mode Toggle
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Save Mode in Local Storage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
        } else {
            localStorage.setItem("dark-mode", "disabled");
        }
    });

    // Back to Top Button Visibility
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    // Back to Top Click Event
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Comment Section Logic
    const commentForm = document.getElementById("comment-form");
    const commentList = document.getElementById("comment-list");

    // Load Comments from Local Storage
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    function displayComments() {
        commentList.innerHTML = "";
        comments.forEach((comment, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${comment.name}</strong>: ${comment.text} <button class="delete-comment" data-index="${index}">❌</button>`;
            commentList.appendChild(li);
        });
    }

    commentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const commentText = document.getElementById("comment").value.trim();

        if (name && commentText) {
            comments.push({ name, text: commentText });
            localStorage.setItem("comments", JSON.stringify(comments));

            document.getElementById("name").value = "";
            document.getElementById("comment").value = "";

            displayComments();
        }
    });

    // Delete Comments
    commentList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-comment")) {
            const index = event.target.getAttribute("data-index");
            comments.splice(index, 1);
            localStorage.setItem("comments", JSON.stringify(comments));
            displayComments();
        }
    });

    displayComments(); // Show saved comments on page load
});
