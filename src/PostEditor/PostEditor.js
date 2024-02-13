import '../Post/Post.css'
import './PostEditor.css'
import { createRef, useState } from 'react'
import addImageIcon from '../img/add-image-icon.svg'

/** @typedef {import('../data/posts.json.js').User} User */
/** @typedef {import('../data/posts.json.js').Post} Post */

/**
 * @param {object} props
 * @param {User} props.currentUser
 * @param {Post} props.details
 * @param {(newPost: Post) => void} props.updateDetails Will be called when the post data has to be changed
 */

function PostEditor({ currentUser, details, updateDetails }) {
    const newPostTextRef = createRef()
    const fileInputRef = createRef()
    const [newDetails, setNewDetails] = useState(details)

    function deleteImage(i) {
        const newDetailsCopy = structuredClone(newDetails)
        newDetailsCopy.images.splice(i, 1)
        setNewDetails(newDetailsCopy)
    }

    function addImage(e) {
        const fileList = e.target.files
        if (fileList.length !== 1) return

        const img = fileList.item(0)
        const imgSrc = URL.createObjectURL(img)
        const newDetailsCopy = structuredClone(newDetails)
        newDetailsCopy.images.push(imgSrc)
        setNewDetails(newDetailsCopy)
    }

    function updateText() {
        const newDetailsCopy = structuredClone(newDetails)
        newDetailsCopy.contents = newPostTextRef.current.value.trim()
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
                    src={currentUser.imageURL}
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
                    className="new-comment-text border-0 p-1 rounded"
                    defaultValue={newDetails.contents}
                    onChange={updateText}
                    placeholder={`What's on your mind, ${currentUser.displayName.split(' ')[0]}?`}
                    ref={newPostTextRef}
                />
            </article>
            <article className="post-images">
                <button
                    className="add-image btn icon-link"
                    onClick={() => fileInputRef.current.click()}>
                    <img src={addImageIcon} alt="" />
                    Add an image...
                    <input
                        className="d-none"
                        type="file"
                        ref={fileInputRef}
                        onChange={addImage}
                        accept="image/*"
                    />
                </button>
                {newDetails.images.map((imageSrc, i) => (
                    <div key={i} className="m-1">
                        <button
                            className="btn btn-close delete-img"
                            onClick={() => deleteImage(i)}
                        />
                        <img src={imageSrc} className="img-fluid" alt="" />
                    </div>
                ))}
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
