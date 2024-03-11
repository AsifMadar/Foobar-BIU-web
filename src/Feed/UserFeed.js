import './UserFeed.css'
import { useContext, useEffect, useState } from 'react'
import { UserContent } from '../App/App.js'
import instance from '../utils/axios.js'
import MenuSideBar from '../MenuSideBar/MenuSideBar.js'
import PostEditor from '../PostEditor/PostEditor.js'
import PostList from '../PostList/PostList.js'

/** @typedef {import('../data/posts.json').Post} Post */

function UserFeed() {
    const { user } = useContext(UserContent)
    const [prevUser, setPrevUser] = useState(user)
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

    useEffect(() => {
        if (
            user.displayName !== prevUser.displayName ||
            user.profileImage !== prevUser.profileImage
        ) {
            // Update "author" fields in relevant posts
        }
        setPrevUser(user)
    }, [user, prevUser])

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
