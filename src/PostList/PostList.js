import Post from '../Post/Post.js'
import posts from '../data/posts.json'
import { useState } from 'react'

/**
 * @typedef {import('../Post/Post.js').User} User
 */

/**
 * @param {object} props
 * @param {Record<string, User>} props.users A map of all users
 * @param {User} props.currentUser
 */
function PostList({ users, currentUser }) {
    const [postsDetails, setPostsDetails] = useState(posts)

    const addPost = () => {
        setPostsDetails([
            ...postsDetails,
            {
                author: currentUser.username,
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
        newArray.splice(i, 1, newPost)
        setPostsDetails(newArray)
    }

    return (
        <div id="post-list" className="container mt-3">
            <button onClick={addPost}>Add post</button>
            {postsDetails.map((details, i) => (
                <Post
                    key={i}
                    currentUser={currentUser}
                    details={details}
                    updateDetails={newPost => updatePost(i, newPost)}
                    users={users}
                />
            ))}
        </div>
    )
}

export default PostList
