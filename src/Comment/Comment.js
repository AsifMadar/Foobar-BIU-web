import './Comment.css'
import likeBtnWhite from '../img/like-btn-white.svg'
import likeBtnBlue from '../img/like-btn-blue.svg'
import { timestampToStr } from '../utils/timestampToStr.js'

/** @typedef {import('../data/posts.json').User} User */
/** @typedef {import('../data/posts.json').Comment} Comment */

/**
 * @param {object} props
 * @param {Comment} props.details
 * @param {(like: boolean) => void} props.toggleLike Will be called when the user clicks "Like"
 * @param {Record<string, User>} props.users A map of all users
 * @param {User} props.currentUser
 */
function Comment({ currentUser, details, toggleLike }) {
    const isLikedByMe = details.likes.includes(currentUser)
    const author = details.author

    return (
        <div className="comment m-3 d-flex flex-row">
            <img
                className="comment-author-img"
                alt={'Profile picture of ' + author.displayName}
                src={author.imageURL}
            />
            <div className="comment-body ms-2 ps-2 pb-1 pe-2 rounded-3">
                <div className="text-start align-middle">
                    <span className="comment-author-name fw-semibold">
                        {author.displayName}
                    </span>
                    <span className="comment-time">
                        {' '}
                        · {timestampToStr(details.timestamp)}
                    </span>
                </div>
                <div className="text-start">{details.contents}</div>
            </div>
            <span className="comment-likes align-bottom d-flex flex-column justify-content-end">
                <span>
                    <button
                        className="btn icon-link"
                        onClick={() => toggleLike(!isLikedByMe)}>
                        <img
                            src={isLikedByMe ? likeBtnBlue : likeBtnWhite}
                            alt="Like the comment"
                        />
                    </button>
                    {details.likes.length}
                </span>
            </span>
        </div>
    )
}

export default Comment
