document.addEventListener("DOMContentLoaded", function () {
    const blogContainer = document.getElementById("more-blog-posts");

    fetch("https://dev.to/api/articles?per_page=30")
        .then(response => response.json())
        .then(posts => {
            const filteredPosts = posts.filter(post => post.cover_image);

            const shownBlogIds = JSON.parse(localStorage.getItem("shownBlogs")) || [];

            const newPosts = filteredPosts.filter(post => !shownBlogIds.includes(post.id)).slice(0, 30);

            newPosts.forEach(post => {
                const postHTML = `
                    <div class="card">
                        <img src="${post.cover_image}" alt="${post.title}" class="card-img">
                        <div class="card-body">
                            <h3 class="card-title">${post.title}</h3>
                            <p class="card-text">${post.description || "No description available."}</p>
                            <a href="${post.url}" target="_blank" class="btn">Read More</a>
                        </div>
                    </div>    
                `;
                blogContainer.innerHTML += postHTML;
            });

            if (newPosts.length === 0) {
                blogContainer.innerHTML = "<p>No additional blogs available.</p>";
            }
        })
        .catch(error => console.error("Error fetching more blog posts:", error));
});
