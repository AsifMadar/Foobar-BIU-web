import './Post.css'
import Comment from '../Comment/Comment.js'
import likeIcon from '../img/like-icon.svg'
import likeBtnWhite from '../img/like-btn-white.svg'
import likeBtnBlue from '../img/like-btn-blue.svg'
import shareBtn from '../img/share-btn.svg'
import { usernamesToStr } from '../utils/usernamesToStr.js'
import { timestampToStr } from '../utils/timestampToStr.js'

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
                        <button className="btn icon-link">
                            <img src={shareBtn} alt="Share the post" />
                            Share
                        </button>
                    </span>
                </div>
            </footer>
            <footer>
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
