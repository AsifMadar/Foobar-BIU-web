import { useContext, useState } from 'react'
import { UserContent } from '../App/App.js'
import instance from '../utils/axios.js'
import Post from '../Post/Post.js'
import PostEditor from '../PostEditor/PostEditor.js'

/** @typedef {import('../data/posts.json').Post} Post */

/**
 * @param {object} props
 * @param {Post[]} props.posts
 * @param {(newPosts: Post[]) => void} props.updatePosts
 */
function PostList({ posts, updatePosts }) {
    const { user: currentUser } = useContext(UserContent)
    const [isEditingIndex, setIsEditingIndex] = useState(-1)
    const sortedPostsDetails = posts
        .sort((a, b) => a.timestamp - b.timestamp)
        .reverse()

    /**
     * @param {number} i
     * @param {Post} newPost
     * @param {'delete' | 'edit' | 'update'} updateType
     */
    function updatePost(i, newPost, updateType) {
        const newArray = [...posts]

        if (updateType === 'delete') {
            instance.delete(
                `/users/${currentUser.username}/posts/${newPost.id}`,
            )
            newArray.splice(i, 1)
        } else if (newPost) {
            if (updateType === 'edit') {
                instance.put(
                    `/users/${currentUser.username}/posts/${newPost.id}`,
                    newPost,
                )
            }

            newArray.splice(i, 1, newPost)
        }

        if (updateType !== 'update') {
            setIsEditingIndex(-1)
        }

        updatePosts(newArray)
    }

    return (
        <div className="post-list">
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
