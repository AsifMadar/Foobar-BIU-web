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
        console.log('Publishing post with details:', postDetails)

        instance
            .post(`/users/${user.username}/posts`, postDetails)
            .then(response => {
                if (response.status === 200) {
                    // Process the successful response
                    console.log('Post published successfully:', response.data)
                    setPostsDetails([...postsDetails, response.data])
                }
            })
            .catch(error => {
                console.error('Error:', error)
                if (error.response) {
                    const { status, data } = error.response
                    console.log('Error response:', status, data)
                    if (status === 409 && data.message === 'Not authorized') {
                        alert('You are not authorized to perform this action.')
                    } else if (status === 451) {
                        alert(
                            'The post contains a blacklisted link. Please remove it.',
                        )
                    }
                } else {
                    alert(
                        'An unexpected error occurred while publishing the post.',
                    )
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
