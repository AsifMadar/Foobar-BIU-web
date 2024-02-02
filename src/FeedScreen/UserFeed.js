// FacebookFeed.js
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu.js'
import { UserContent } from '../App/App.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './UserFeed.css'

function Feed({ initialPosts }) {
    const { user, setUser } = useContext(UserContent)
    const [posts, setPosts] = useState(initialPosts || [])
    const [newPostContent, setNewPostContent] = useState('')

    const handleAddPost = () => {
        if (newPostContent.trim() !== '') {
            const newPost = {
                id: posts.length + 1,
                user: user.username,
                content: newPostContent,
            }
            setPosts([...posts, newPost])
            setNewPostContent('')
        }
    }

    return (
        <div className="container">
            <Menu user={user} />

            <div className="post-input-section">
                <img src="profile.jpg" alt=" " className="profile-image" />
                <input
                    type="text"
                    id="postContent"
                    className="form-control mb-3"
                    placeholder="What's on your mind?"
                    value={newPostContent}
                    onChange={e => setNewPostContent(e.target.value)}
                />
                <button className="add-post-button" onClick={handleAddPost}>
                    Post
                </button>
            </div>

            {/* <div className="posts">
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div> */}

            <div className="posts">
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <p>{post.user}</p>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

Feed.propTypes = {
    user: PropTypes.string.isRequired,
    initialPosts: PropTypes.array,
}

export default Feed
