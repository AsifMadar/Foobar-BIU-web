import './Comment.css'
import { createRef } from 'react'
import { timestampToStr } from '../utils/timestampToStr.js'
import { useState } from 'react'
import deleteIcon from '../img/trash-icon.svg'
import editIcon from '../img/pencil-icon.svg'
import likeBtnBlue from '../img/like-btn-blue.svg'
import likeBtnWhite from '../img/like-btn-white.svg'

/** @typedef {import('../data/posts.json').User} User */
/** @typedef {import('../data/posts.json').Comment} Comment */

/**
 * @param {object} props
 * @param {Comment} props.details
 * @param {(newDetails: Comment | null) => void} props.updateDetails Will be called when the comment data has to be changed
 * @param {() => void} props.editFailed Will be called when an edit to the comment was cancelled or posted with empty contents
 * @param {Record<string, User>} props.users A map of all users
 * @param {User} props.currentUser
 * @param {boolean} props.editImmediately Immediately open the comment in "edit" mode
 */
function Comment({
    currentUser,
    updateDetails,
    details,
    editImmediately,
    editFailed,
}) {
    const [isEditing, setIsEditing] = useState(!!editImmediately)
    const author = details.author
    const isLikedByMe = details.likes.some(
        user => user.username === currentUser.username,
    )
    const newCommentTextRef = createRef()

    function updateCommentText() {
        const newText = newCommentTextRef.current.value
        // Update the comment's contents if the new text isn't empty
        if (newText.trim()) {
            const detailsCopy = structuredClone(details)
            detailsCopy.contents = newText
            updateDetails(detailsCopy)
        } else {
            editFailed?.()
        }
        setIsEditing(false)
    }

    function handleLike() {
        const detailsCopy = structuredClone(details)
        if (isLikedByMe) {
            const currentUserIndex = detailsCopy.likes.indexOf(currentUser)
            detailsCopy.likes.splice(currentUserIndex, 1)
        } else {
            detailsCopy.likes.push(currentUser)
        }
        updateDetails(detailsCopy)
    }

    function cancelEdit() {
        newCommentTextRef.current.value = details.contents
        editFailed?.()
        setIsEditing(false)
    }

    return (
        <div className="comment m-3 d-flex flex-row">
            <img
                className="comment-author-img"
                alt={'Profile picture of ' + author.displayName}
                src={author.profileImage}
            />
            <div className="comment-body ms-2 ps-2 pb-1 pe-2 rounded-3">
                <div className="text-start align-middle">
                    <span className="comment-author-name fw-semibold">
                        {author.displayName}
                    </span>
                    {!isEditing && (
                        <span className="comment-time">
                            {' '}
                            · {timestampToStr(details.timestamp)}
                        </span>
                    )}

                    {!isEditing && author.username === currentUser.username && (
                        <span className="edit-delete-section">
                            <button
                                className="edit-comment btn icon-link p-0 ms-1"
                                onClick={() => setIsEditing(true)}>
                                <img src={editIcon} alt="Edit comment" />
                            </button>
                            <button
                                className="delete-comment btn icon-link p-0"
                                onClick={() => updateDetails(null)}>
                                <img src={deleteIcon} alt="Delete comment" />
                            </button>
                        </span>
                    )}
                </div>

                {isEditing ? (
                    <div className="text-start">
                        <textarea
                            className="new-comment-text border-0 p-1 rounded"
                            placeholder="Type your comment..."
                            ref={newCommentTextRef}
                            defaultValue={details.contents}
                        />
                        <div>
                            <button
                                className="btn me-4 btn-close"
                                onClick={cancelEdit}></button>
                            <button
                                className="btn m-1 btn-sm btn-success"
                                onClick={updateCommentText}>
                                Comment
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-start">{details.contents}</div>
                )}
            </div>
            {author.username !== currentUser.username && (
                <span className="comment-likes align-bottom d-flex flex-column justify-content-end">
                    <span>
                        <button
                            className="btn icon-link"
                            onClick={() => handleLike(!isLikedByMe)}>
                            <img
                                src={isLikedByMe ? likeBtnBlue : likeBtnWhite}
                                alt="Like the comment"
                            />
                        </button>
                        {details.likes.length}
                    </span>
                </span>
            )}
        </div>
    )
}

export default Comment
