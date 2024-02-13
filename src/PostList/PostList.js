import Post from '../Post/Post.js'
import PostEditor from '../PostEditor/PostEditor.js'
import posts from '../data/posts.json'
import { useState } from 'react'

/** @typedef {import('../data/posts.json').User} User */
/** @typedef {import('../data/posts.json').Post} Post */

/**
 * @param {object} props
 * @param {User} props.currentUser
 */
function PostList({ currentUser }) {
    const [isEditingIndex, setIsEditingIndex] = useState(-1)
    const [postsDetails, setPostsDetails] = useState(
        /** @type {Post[]} */ (posts),
    )
    const sortedPostsDetails = postsDetails
        .sort((a, b) => a.timestamp - b.timestamp)
        .reverse()

    /**
     * @param {number} i
     * @param {Post | null} newPost
     * @param {'delete' | 'edit' | 'update'} updateType
     */
    function updatePost(i, newPost, updateType) {
        const newArray = [...postsDetails]

        if (!newPost || updateType === 'delete') {
            newArray.splice(i, 1)
        } else if (newPost) {
            newArray.splice(i, 1, newPost)
        }

        if (updateType !== 'update') {
            setIsEditingIndex(-1)
        }

        setPostsDetails(newArray)
    }

    const dummyDetails = {
        author: currentUser,
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
        <div id="post-list" className="container mt-3">
            <PostEditor
                id="create-post-area"
                currentUser={currentUser}
                details={dummyDetails}
                updateDetails={publishPost}
            />
            {sortedPostsDetails.map((details, i) =>
                isEditingIndex === i ? (
                    <PostEditor
                        key={i}
                        currentUser={currentUser}
                        details={details}
                        updateDetails={newPost =>
                            updatePost(i, newPost, 'edit')
                        }
                    />
                ) : (
                    <Post
                        key={i}
                        currentUser={currentUser}
                        details={details}
                        updateDetails={(newPost, type) =>
                            updatePost(i, newPost, type)
                        }
                        editRequested={() => setIsEditingIndex(i)}
                    />
                ),
            )}
        </div>
    )
}

export default PostList
