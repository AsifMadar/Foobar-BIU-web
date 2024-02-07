import './Post.css'
import { createRef } from 'react'
import { timestampToStr } from '../utils/timestampToStr.js'
import { usernamesToStr } from '../utils/usernamesToStr.js'
import { useState } from 'react'
import Comment from '../Comment/Comment.js'
import commentIcon from '../img/comment-icon.svg'
import likeBtnBlue from '../img/like-btn-blue.svg'
import likeBtnWhite from '../img/like-btn-white.svg'
import likeIcon from '../img/like-icon.svg'
import shareBtn from '../img/share-btn.svg'

/** @typedef {import('../data/posts.json').User} User */
/** @typedef {import('../data/posts.json').Post} Post */

/**
 * @param {object} props
 * @param {Post} props.details
 * @param {(newDetails: Post) => void} props.updateDetails Will be called when the post data has to be changed
 * @param {User} props.currentUser
 */
function Post({ currentUser, details, updateDetails }) {
    const isLikedByMe = details.likes.includes(currentUser)
    const likesNameList = usernamesToStr(details.likes, currentUser)
    const sharesNameList = usernamesToStr(details.shares, currentUser)
    const author = details.author

    const [isCommenting, setIsCommenting] = useState(false)
    const newCommentTextRef = createRef()

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

    function toggleCommentLike(i, like) {
        const detailsCopy = structuredClone(details)
        const newComments = detailsCopy.comments
        if (like) {
            newComments[i].likes.push(currentUser)
        } else {
            const currentUserIndex = newComments[i].likes.indexOf(currentUser)
            newComments[i].likes.splice(currentUserIndex, 1)
        }
        updateDetails(detailsCopy)
    }

    function postComment() {
        const text = newCommentTextRef.current.value
        // Post the new comment if it is not empty
        if (text.trim()) {
            const newComment = {
                author: currentUser,
                contents: text,
                likes: [],
                timestamp: Date.now(),
            }
            const detailsCopy = structuredClone(details)
            detailsCopy.comments.push(newComment)
            updateDetails(detailsCopy)
        }
        setIsCommenting(false)
    }

    return (
        <div className="post border rounded mb-3">
            <header className="d-flex flex-row p-2">
                <img
                    className="post-author-img"
                    alt={'Profile picture of ' + author.displayName}
                    src={author.imageURL}
                />
                <div className="d-flex flex-column text-start ms-3">
                    <span className="post-author-name h5">
                        {author.displayName}
                    </span>
                    <span className="post-time">
                        Published on {timestampToStr(details.timestamp)}
                    </span>
                </div>
            </header>
            <article className="text-start p-3">{details.contents}</article>
            <footer className="border-top container">
                <div className="row m-2">
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
                    <span className="shares-count col text-end pe-4 align-middle tooltip-container">
                        <span className="comments-count me-4">
                            {details.comments.length} comments
                        </span>
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
                            className="btn icon-link"
                            onClick={() => setIsCommenting(!isCommenting)}>
                            <img src={commentIcon} alt="Add a reply" />
                            Reply
                        </button>
                    </span>
                    <span className="col">
                        <button className="btn icon-link">
                            <img src={shareBtn} alt="Share the post" />
                            Share
                        </button>
                    </span>
                </div>
            </footer>
            <footer>
                {isCommenting && (
                    <div className="new-comment m-3 d-flex flex-row">
                        <img
                            className="comment-author-img"
                            alt={
                                'Profile picture of ' + currentUser.displayName
                            }
                            src={currentUser.imageURL}
                        />
                        <div className="comment-body ms-2 ps-2 pb-1 pe-2 rounded-3 text-start">
                            <span className="comment-author-name fw-semibold">
                                {currentUser.displayName}
                            </span>
                            <div className="text-start">
                                <textarea
                                    className="new-comment-text border-0 p-1 rounded"
                                    placeholder="Type your comment..."
                                    ref={newCommentTextRef}
                                />
                            </div>
                            <div>
                                <button
                                    className="btn me-4 btn-close"
                                    onClick={() =>
                                        setIsCommenting(false)
                                    }></button>
                                <button
                                    className="btn m-1 btn-sm btn-success"
                                    onClick={postComment}>
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {details.comments.map((comment, i) => (
                    <Comment
                        key={i}
                        currentUser={currentUser}
                        toggleLike={val => toggleCommentLike(i, val)}
                        details={comment}
                    />
                ))}
            </footer>
        </div>
    )
}

export default Post
