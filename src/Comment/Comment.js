import './Comment.css'
import DEFAULT_ICON from '../img/default-user-icon.svg'
import likeBtnWhite from '../img/like-btn-white.svg'
import likeBtnBlue from '../img/like-btn-blue.svg'
import { timestampToStr } from '../utils/timestampToStr.js'

const DEFAULT_DISPLAY_NAME = 'Unknown User'

/**
 * @typedef {import('../Post/Post.js').User} User
 * @prop {string} displayName
 * @prop {string} imageURL
 * @prop {string} username
 */

/**
 * @typedef {object} CommentDetails
 * @prop {string} author The username of the comment's author
 * @prop {string} contents Text contents of the comment
 * @prop {string[]} likes An array containing the usernames of the users who liked the comment
 * @prop {string} timestamp Creation time
 */

/**
 * @param {object} props
 * @param {CommentDetails} props.details
 * @param {(like: boolean) => void} props.toggleLike Will be called when the user clicks "Like"
 * @param {Record<string, User>} props.users A map of all users
 * @param {User} props.currentUser
 */
function Comment({ currentUser, details, toggleLike, users }) {
    const isLikedByMe = details.likes.includes(currentUser.username)
    const author = users[details.author] ?? {
        displayName: DEFAULT_DISPLAY_NAME,
        imageURL: DEFAULT_ICON,
        username: details.author,
    }

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
