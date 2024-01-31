import './Post.css'

/**
 * @typedef {object} User
 * @prop {string} displayName
 * @prop {string} imageURL
 * @prop {string} username
 */

/**
 * @typedef {object} PostDetails
 * @prop {User} author
 * @prop {string} contents
 * @prop {string} timestamp
 */

/**
 * @param {object} props
 * @param {PostDetails} props.details
 */
function Post({ details }) {
    const date = new Date(details.timestamp)

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
        </div>
    )
}

export default Post
