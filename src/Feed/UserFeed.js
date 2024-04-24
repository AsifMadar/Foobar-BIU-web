import './UserFeed.css'
import { useContext, useState } from 'react'
import { UserContent } from '../App/App.js'
import instance from '../utils/axios.js'
import MenuSideBar from '../MenuSideBar/MenuSideBar.js'
import PostEditor from '../PostEditor/PostEditor.js'
import PostList from '../PostList/PostList.js'

/** @typedef {import('../data/posts.json').Post} Post */

function UserFeed() {
    const { user } = useContext(UserContent)
    const [postsDetails, setPostsDetails] = useState(() => {
        instance
            .get('/posts')
            .then(postList =>
                setPostsDetails(
                    postList.data.map(post => ({ ...post, comments: [] })),
                ),
            ) // Will happen at some later point
        return []
    })

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
        instance
            .post(`/users/${user.username}/posts`, postDetails)
            .then(({ data: createdPost }) => {
                setPostsDetails([...postsDetails, createdPost])
            })
            .catch(error => {
                if (
                    error.response &&
                    error.response.data.message ===
                        '451 Unavailable For Legal Reasons'
                ) {
                    alert(
                        'The post contains a blacklisted link. Please remove it.',
                    )
                } else {
                    console.error('Error:', error)
                }
            })
    }

    return (
        <div className="user-feed-container">
            <MenuSideBar />
            <div className="container m-3">
                <PostEditor
                    id="create-post-area"
                    currentUser={user}
                    details={dummyDetails}
                    updateDetails={publishPost}
                />
                <PostList posts={postsDetails} updatePosts={setPostsDetails} />
            </div>
        </div>
    )
}

export default UserFeed
