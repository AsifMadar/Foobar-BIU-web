import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { UserContent } from '../App/App.js'
import instance from '../utils/axios.js'
import PostList from '../PostList/PostList.js'

/** @typedef {import('../data/posts.json').Post} Post */
/** @typedef {import('../data/posts.json').User} User */

/**
 * @param {object} props
 * @param {User} props.user
 */
const TimeLine = ({ user }) => {
    const { user: loggedInUser } = useContext(UserContent)
    const [postsDetails, setPostsDetails] = useState(/** @type {Post[]} */ ([]))

    useEffect(() => {
        instance
            .get(`/users/${user.username}/posts`)
            .then(postList =>
                setPostsDetails(
                    postList.data.map(post => ({ ...post, comments: [] })),
                ),
            )
            .catch(e => {
                // Ignore 404 errors, which happen for non-friends
                if (e.response.status !== 404) console.error(e)
            })
    }, [user])

    const isMe = user.username === loggedInUser.username
    const isFriend = isMe || user.friends?.includes(loggedInUser.username)

    return (
        <div className="container">
            <PostList posts={postsDetails} updatePosts={() => {}} />

            {postsDetails.length === 0 && (
                <div className="row">
                    {isFriend
                        ? (isMe ? 'You' : user.displayName) +
                          " haven't posted anything yet"
                        : `You have to befriend ${user.displayName} to view their timeline`}
                </div>
            )}
        </div>
    )
}

export default TimeLine
