// Function to open comments popup and fetch comments for a specific blog
async function openComments(blogId) {
    const commentsContainer = document.getElementById(`comments-${blogId}`);
    commentsContainer.style.display = "block";

    try {
        // Fetch comments for the blog from the server
        const response = await fetch(`http://localhost:3000/api/blogs/${blogId}/comments`);
        const comments = await response.json();

        // Clear previous comments
        commentsContainer.innerHTML = '';

        // Append the fetched comments to the comments container
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.textContent = comment.text;
            commentsContainer.appendChild(commentElement);
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}



// Function to close comments popup
function closeComment(blogId) {
    const commentsContainer = document.getElementById(`comments-${blogId}`);
    commentsContainer.style.display = "none";
}

// Function to open the blog for detailed view
function openBlog(blogId) {
    const blog = document.getElementById(blogId);
    blog.style.display = "block";

    // Hide other blogs except the clicked one
    const allBlogs = document.querySelectorAll('.blog');
    allBlogs.forEach((item) => {
        if (item.id !== blogId) {
            item.style.display = "none";
        }
    });

    // Show the close icon for the clicked blog
    const closeIcon = document.createElement('a');
    closeIcon.innerHTML = '&times;';
    closeIcon.setAttribute('href', 'javascript:void(0)');
    closeIcon.setAttribute('id', 'closebtn');
    closeIcon.setAttribute('onclick', `closeBlog('${blogId}')`);
    blog.appendChild(closeIcon);
}

// Function to close the detailed view of the blog
function closeBlog(blogId) {
    const blog = document.getElementById(blogId);
    blog.style.display = "none";

    // Show all blogs again
    const allBlogs = document.querySelectorAll('.blog');
    allBlogs.forEach((item) => {
        item.style.display = "block";
    });

    // Remove the close icon from the clicked blog
    const closeIcon = document.getElementById('closebtn');
    closeIcon.parentNode.removeChild(closeIcon);
}
