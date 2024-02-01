import './Post.css'
import likeIcon from './like-icon.svg'
import likeBtnWhite from './like-btn-white.svg'
import likeBtnBlue from './like-btn-blue.svg'
import shareBtn from './share-btn.svg'

/**
 * @typedef {object} User
 * @prop {string} displayName
 * @prop {string} imageURL
 * @prop {string} username
 */

/**
 * @typedef {object} PostDetails
 * @prop {User} author
 * @prop {string} contents Text contents of the post
 * @prop {string[]} likes An array containing the usernames of the users who liked the post
 * @prop {number} shares An array containing the usernames of the users who shared the post
 * @prop {string} timestamp Creation time
 */

/**
 * @param {object} props
 * @param {PostDetails} props.details
 * @param {(like: boolean) => void} props.toggleLike Will be called when the user clicks "Like"
 * @param {Record<string, User>} props.users A map of all users
 * @param {User} props.currentUser
 */
function Post({ currentUser, details, toggleLike, users }) {
    /**
     * @param {string[]} names
     * @param {Record<string, User>} users
     */
    function usernamesToStr(names) {
        names = names.map(username =>
            username === currentUser.username
                ? 'You'
                : users[username].displayName ?? username,
        )
        if (names.length === 0) return ''
        if (names.length === 1) return names[0]
        if (names.length === 2) return names[0] + ' and ' + names.at(-1)
        if (names.length > 2) {
            return names.slice(0, -1).join(', ') + ', and ' + names.at(-1)
        }
    }

    const date = new Date(details.timestamp)
    const likesNameList = usernamesToStr(details.likes, users)
    const sharesNameList = usernamesToStr(details.shares, users) // Empty for now
    const isLikedByMe = details.likes.includes(currentUser.username)

    return (
        <div className="post border rounded mb-3">
            <header className="d-flex flex-row p-2">
                <img
                    className="post-author-img"
                    alt={'Profile picture of ' + details.author.displayName}
                    src={details.author.imageURL}
                />
                <div className="d-flex flex-column text-start ms-3">
                    <span className="post-author-name h5">
                        {details.author.displayName}
                    </span>
                    <span className="post-time">
                        Published on {date.getDate()}/{date.getMonth() + 1}/
                        {date.getFullYear()} {date.getHours()}:
                        {date.getMinutes()}
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
                <div className="post-actions-row row border-top m-2">
                    <span className="col">
                        <button
                            className="btn icon-link"
                            onClick={() => toggleLike(!isLikedByMe)}>
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
        </div>
    )
}

export default Post
