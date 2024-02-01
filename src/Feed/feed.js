// An array to store posts
const posts = []

// Function to create a new post
function createPost() {
    // Get the content from the input field
    const postContent = document.getElementById('postContent').value

    // Check if the content is not empty
    if (postContent.trim() !== '') {
        // Create a new post object with a default username
        const newPost = { username: 'Your Username', content: postContent }

        // Add the new post to the beginning of the posts array
        posts.unshift(newPost)

        // Render the updated feed
        renderFeed()

        // Clear the input field
        document.getElementById('postContent').value = ''
    }
}

// Function to render the feed
function renderFeed() {
    // Get the feed container element
    const feedContainer = document.getElementById('feed')
    feedContainer.innerHTML = ''

    // Iterate through the posts array and create a card for each post
    posts.forEach(post => {
        const postReady = PostToShow(post) //returns an HTML structure representing a post
        feedContainer.appendChild(postReady) // add iy to the visible content
    })
}

// Function to create a card for a post
function PostToShow(post) {
    // Create elements for the post card
    const card = document.createElement('div')
    card.className = 'card mb-3'

    const cardBody = document.createElement('div')
    cardBody.className = 'card-body'

    const username = document.createElement('h5')
    username.className = 'card-title'
    username.textContent = post.username

    const content = document.createElement('p')
    content.className = 'card-text'
    content.textContent = post.content

    // Append elements to the post card
    cardBody.appendChild(username)
    cardBody.appendChild(content)
    card.appendChild(cardBody)

    return card
}

// Initial rendering of the feed
renderFeed()
