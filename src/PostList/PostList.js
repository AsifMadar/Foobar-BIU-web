import Post from '../Post/Post.js'
import posts from '../data/posts.json'
import { useState } from 'react'

/** @typedef {import('../data/posts.json').User} User */

/**
 * @param {object} props
 * @param {User} props.currentUser
 */
function PostList({ currentUser }) {
    const [postsDetails, setPostsDetails] = useState(posts)
    const sortedPostsDetails = postsDetails
        .sort((a, b) => a.timestamp - b.timestamp)
        .reverse()

    const addPost = () => {
        setPostsDetails([
            ...postsDetails,
            {
                author: currentUser,
                comments: [],
                contents: 'second try',
                likes: [],
                shares: [],
                timestamp: Date.now(),
            },
        ])
    }

    function updatePost(i, newPost) {
        const newArray = [...postsDetails]
        if (newPost) {
            newArray.splice(i, 1, newPost)
        } else {
            newArray.splice(i, 1)
        }
        setPostsDetails(newArray)
    }

    return (
        <div id="post-list" className="container mt-3">
            <button onClick={addPost}>Add post</button>
            {sortedPostsDetails.map((details, i) => (
                <Post
                    key={i}
                    currentUser={currentUser}
                    details={details}
                    updateDetails={newPost => updatePost(i, newPost)}
                />
            ))}
        </div>
    )
}

export default PostList
