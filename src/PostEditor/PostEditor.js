import '../Post/Post.css'
import './PostEditor.css'
import { createRef, useState } from 'react'
import ImagesInput from '../ImagesInput/ImagesInput.js'

/** @typedef {import('../data/posts.json.js').User} User */
/** @typedef {import('../data/posts.json.js').Post} Post */

const MAX_IMAGES_NUM = 1

/**
 * @param {object} props
 * @param {User} props.currentUser
 * @param {Post} props.details
 * @param {(newPost: Post) => void} props.updateDetails Will be called when the post data has to be changed
 */
function PostEditor({ currentUser, details, updateDetails }) {
    const newPostTextRef = createRef()
    const [newDetails, setNewDetails] = useState(details)

    function updateText() {
        const newDetailsCopy = structuredClone(newDetails)
        newDetailsCopy.contents = newPostTextRef.current.value.trim()
        setNewDetails(newDetailsCopy)
    }

    function updateImages(newImages) {
        const newDetailsCopy = structuredClone(newDetails)
        newDetailsCopy.images = newImages
        setNewDetails(newDetailsCopy)
    }

    function reset() {
        const newDetailsCopy = structuredClone(newDetails)
        newDetailsCopy.contents = ''
        newDetailsCopy.images = []
        newPostTextRef.current.value = newDetailsCopy.contents
        setNewDetails(newDetailsCopy)
    }

    function publishEdit() {
        updateDetails(newDetails)
        reset()
    }

    return (
        <div className="post post-edit border rounded mb-3">
            <header className="d-flex flex-row p-2">
                <img
                    className="post-author-img"
                    alt={'Profile picture of ' + currentUser.displayName}
                    src={currentUser.profileImage}
                />
                <div className="d-flex flex-column text-start ms-3">
                    <span className="post-author-name h5">
                        {currentUser.displayName}
                    </span>
                </div>
            </header>
            <article className="text-start p-3">
                <textarea
                    autoFocus={true}
                    className="border p-1 rounded"
                    defaultValue={newDetails.contents}
                    onChange={updateText}
                    placeholder={`What's on your mind, ${currentUser.displayName.split(' ')[0]}?`}
                    ref={newPostTextRef}
                />
            </article>
            <article className="post-images">
                <ImagesInput
                    maxImagesNum={MAX_IMAGES_NUM}
                    onUpdate={updateImages}
                />
            </article>
            <footer className="d-grid gap-2">
                <button
                    type="button"
                    className="btn btn-primary m-2"
                    onClick={publishEdit}
                    disabled={newDetails.contents === ''}>
                    Post
                </button>
            </footer>
        </div>
    )
}

export default PostEditor
