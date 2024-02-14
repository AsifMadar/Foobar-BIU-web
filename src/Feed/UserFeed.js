import '../Feed/UserFeed.css'
import { useContext, useState } from 'react'
import { UserContent } from '../App/App.js'
import MenuSide from './MenuSide.js'
import MenuTop from './MenuTop.js'
import PostEditor from '../PostEditor/PostEditor.js'
import PostList from '../PostList/PostList.js'
import posts from '../data/posts.json'

/** @typedef {import('../data/posts.json').Post} Post */

function UserFeed() {
    const { user } = useContext(UserContent)
    const [postsDetails, setPostsDetails] = useState(
        /** @type {Post[]} */ (posts),
    )

    const dummyDetails = {
        author: user,
        comments: [],
        contents: '',
        images: [],
        likes: [],
        shares: [],
        timestamp: Date.now(),
    }

    function publishPost(/** @type {Post}*/ postDetails) {
        postDetails.timestamp = Date.now()
        setPostsDetails([...postsDetails, postDetails])
    }

    return (
        <div className="user-feed-container">
            <MenuTop user={user} />
            <div className="wrapper">
                <MenuSide user={user} />
                <div className="container mt-3">
                    <PostEditor
                        id="create-post-area"
                        currentUser={user}
                        details={dummyDetails}
                        updateDetails={publishPost}
                    />
                    <PostList
                        posts={postsDetails}
                        updatePosts={setPostsDetails}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserFeed
