import React, { useContext, useState } from 'react'
import MenuTop from './MenuTop.js'
import MenuSide from './MenuSide.js'
import { UserContent } from '../App/App.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './UserFeed.css'

function UserFeed() {
    const { user } = useContext(UserContent)
    const [posts, setPosts] = useState([])
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
        <div className="user-feed-container">
            <MenuTop user={user} />
            <div className="wrapper">
                <MenuSide user={user} />
                <div className="content-container">
                    <div className="post-input-section">
                        <img src={user.img} alt=" " className="profile-image" />
                        <input
                            type="text"
                            id="postContent"
                            className="form-control mb-3"
                            placeholder="What's on your mind?"
                            value={newPostContent}
                            onChange={e => setNewPostContent(e.target.value)}
                        />
                        <button
                            className="add-post-button"
                            onClick={handleAddPost}>
                            Post
                        </button>
                    </div>
                    <div className="posts">
                        {posts.map(post => (
                            <div key={post.id} className="post">
                                <p>{post.user}</p>
                                <p>{post.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserFeed
