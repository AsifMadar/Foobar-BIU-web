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
                contents: 'second try',
                likes: [],
                shares: [],
                timestamp: Date.now(),
            },
        ])
    }

    function likePost(i, like) {
        const newPostsDetails = [...postsDetails]
        if (like) {
            newPostsDetails[i].likes.push(currentUser.username)
        } else {
            const currentUserIndex = newPostsDetails[i].likes.findIndex(
                username => username === currentUser.username,
            )
            newPostsDetails[i].likes.splice(currentUserIndex, 1)
        }
        setPostsDetails(newPostsDetails)
    }

    return (
        <div id="post-list" className="container mt-3">
            <button onClick={addPost}>Add post</button>
            {postsDetails.map((details, i) => (
                <Post
                    key={i}
                    currentUser={currentUser}
                    details={details}
                    toggleLike={like => likePost(i, like)}
                    users={users}
                />
            ))}
        </div>
    )
}

export default PostList
