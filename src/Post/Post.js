import './Post.css'
import { createRef } from 'react'
import { timestampToStr } from '../utils/timestampToStr.js'
import { usernamesToStr } from '../utils/usernamesToStr.js'
import { useState } from 'react'
import Comment from '../Comment/Comment.js'
import commentIcon from '../img/comment-icon.svg'
import deleteIcon from '../img/trash-icon.svg'
import editIcon from '../img/pencil-icon.svg'
import instance from '../utils/axios.js'
import likeBtnBlue from '../img/like-btn-blue.svg'
import likeBtnWhite from '../img/like-btn-white.svg'
import likeIcon from '../img/like-icon.svg'
import shareBtn from '../img/share-btn.svg'
import urlIcon from '../img/url-icon.svg'
import whatsappIcon from '../img/whatsapp-icon.svg'

/** @typedef {import('../data/posts.json').User} User */
/** @typedef {import('../data/posts.json').Post} Post */

/**
 * @callback UpdateDetailsCallback
 * @param {Post | null} newPost
 * @param {'delete' | 'update'} updateType
 * @returns {void}
 */

/**
 * @param {object} props
 * @param {User} props.currentUser
 * @param {Post} props.details
 * @param {() => void} props.editRequested Will be called when the user clicked "edit" on the post
 * @param {UpdateDetailsCallback} props.updateDetails Will be called when the post data has to be changed
 */
function Post({ currentUser, editRequested, details, updateDetails }) {
    const author = details.author
    const isLikedByMe = details.likes.some(
        user => user.username === currentUser.username,
    )
    const likesNameList = usernamesToStr(details.likes, currentUser)
    const sharesNameList = usernamesToStr(details.shares, currentUser)

    const [isCommenting, setIsCommenting] = useState(false)
    const [isCommentListOpen, setIsCommentListOpen] = useState(false)
    const modalRef = createRef()

    function handleLike() {
        instance.post('/likes', { postId: details.id })

        const detailsCopy = structuredClone(details)
        if (isLikedByMe) {
            const currentUserIndex = detailsCopy.likes.indexOf(currentUser)
            detailsCopy.likes.splice(currentUserIndex, 1)
        } else {
            detailsCopy.likes.push(currentUser)
        }
        updateDetails(detailsCopy, 'update')
    }

    function updateComment(i, newComment) {
        const detailsCopy = structuredClone(details)
        const newArray = [...details.comments]
        if (newComment) {
            newArray.splice(i, 1, newComment)
        } else {
            newArray.splice(i, 1)
        }
        detailsCopy.comments = newArray
        updateDetails(detailsCopy, 'update')
    }

    function postNewComment(commentDetails) {
        // Post the new comment if it is not empty
        if (commentDetails.contents.trim()) {
            commentDetails.timestamp = Date.now()
            const detailsCopy = structuredClone(details)
            detailsCopy.comments.push(commentDetails)
            updateDetails(detailsCopy, 'update')
        }
        setIsCommenting(false)
    }

    function share(type) {
        // Sharing isn't implemented yet
        modalRef.current.close()
    }

    return (
        <div className="post border rounded mb-3">
            <header className="d-flex flex-row p-2">
                <img
                    className="post-author-img"
                    alt={'Profile picture of ' + author.displayName}
                    src={author.profileImage}
                />
                <div className="d-flex flex-column text-start ms-3">
                    <span className="post-author-name h5">
                        {author.displayName}
                    </span>
                    <span className="post-time">
                        Published on {timestampToStr(details.timestamp)}
                    </span>
                </div>
                {author.username === currentUser.username && (
                    <div
                        className="post-edit-delete-section flex-column"
                        role="group">
                        <div className="btn-group align-middle">
                            <button
                                className="btn icon-link edit-btn"
                                onClick={editRequested}>
                                <img src={editIcon} alt="" />
                                Edit
                            </button>
                            <button
                                className="btn icon-link"
                                onClick={() => updateDetails(null, 'delete')}>
                                <img src={deleteIcon} alt="" />
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </header>
            <article className="text-start p-3">{details.contents}</article>
            {details.images.length > 0 && (
                <article className="post-images m-1">
                    {details.images.map((imageSrc, i) => (
                        <img
                            key={i}
                            src={imageSrc}
                            className="img-fluid mt-2 mx-auto d-block"
                            alt=""
                        />
                    ))}
                </article>
            )}
            <footer className="border-top container">
                <div className="stats row m-2">
                    <span className="likes-count col text-start ps-3 tooltip-container">
                        <img
                            className="post-like-icon icon-link m-1"
                            src={likeIcon}
                            alt="likes"
                        />
                        <span className="align-middle">
                            {details.likes.length}
                        </span>
                        {details.likes.length > 0 && (
                            <span className="tooltip-text rounded p-1">
                                {likesNameList} liked this post
                            </span>
                        )}
                    </span>
                    <span className="comments-count col text-middle">
                        <span
                            className="me-4"
                            onClick={() =>
                                setIsCommentListOpen(!isCommentListOpen)
                            }>
                            {details.comments.length} comments
                        </span>
                    </span>
                    <span className="shares-count col text-end pe-4 tooltip-container">
                        {details.shares.length} shares
                        {details.shares.length > 0 && (
                            <span className="tooltip-text rounded p-1">
                                {sharesNameList} shared this post
                            </span>
                        )}
                    </span>
                </div>
                <div className="post-actions-row row border-top border-bottom m-2">
                    <span className="col">
                        <button className="btn icon-link" onClick={handleLike}>
                            <img
                                src={isLikedByMe ? likeBtnBlue : likeBtnWhite}
                                alt="Like the post"
                            />
                            Like
                        </button>
                    </span>
                    <span className="col">
                        <button
                            className="reply-btn btn icon-link"
                            onClick={() => {
                                if (isCommentListOpen) {
                                    setIsCommenting(!isCommenting)
                                } else {
                                    setIsCommentListOpen(true)
                                    setIsCommenting(true)
                                }
                            }}>
                            <img src={commentIcon} alt="Add a reply" />
                            Reply
                        </button>
                    </span>
                    <span className="col">
                        <button
                            className="shared-btn btn icon-link"
                            onClick={() => modalRef.current.showModal()}>
                            <img src={shareBtn} alt="Share the post" />
                            Share
                        </button>
                    </span>
                </div>
            </footer>
            {isCommentListOpen && (
                <footer>
                    {isCommenting && (
                        <Comment
                            currentUser={currentUser}
                            updateDetails={postNewComment}
                            details={{
                                author: currentUser,
                                contents: '',
                                likes: [],
                                timestamp: new Date(0),
                            }}
                            editImmediately={true}
                            editFailed={() => setIsCommenting(false)}
                        />
                    )}
                    {details.comments.map((comment, i) => (
                        <Comment
                            key={i}
                            currentUser={currentUser}
                            updateDetails={newComment =>
                                updateComment(i, newComment)
                            }
                            details={comment}
                        />
                    ))}
                </footer>
            )}
            <dialog className="share-dialog" ref={modalRef}>
                <div>
                    <span className="float-start">
                        <button
                            className="btn btn-close"
                            onClick={() => modalRef.current.close()}
                        />
                    </span>
                    <h3 className="text-middle ms-4 me-4 mb-3">Share by</h3>
                </div>
                <div className="share-buttons">
                    <button className="btn" onClick={() => share('whatsapp')}>
                        <img src={whatsappIcon} alt="" />
                        Whatsapp
                    </button>
                    <button className="btn" onClick={() => share('link')}>
                        <img src={urlIcon} alt="" />
                        Copy Link
                    </button>
                </div>
            </dialog>
        </div>
    )
}

export default Post
