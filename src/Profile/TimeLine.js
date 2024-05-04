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
        if (!user?.username) return
        instance
            .get(`/users/${user.username}/posts`)
            .then(postList =>
                setPostsDetails(
                    postList.data.map(post => ({ ...post, comments: [] })),
                ),
            )
            .catch(e => {
                // Ignore 409 errors, which happen for non-friends
                if (e.response.status !== 409) console.error(e)
            })
    }, [user])

    const isMe = user.username === loggedInUser.username
    const isFriend = isMe || user.friends?.includes(loggedInUser.username)

    return (
        <div className="container p-3">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <PostList
                        posts={postsDetails}
                        updatePosts={setPostsDetails}
                    />
                </div>
            </div>

            {postsDetails.length === 0 && (
                <p className="text-center">
                    {isFriend
                        ? (isMe ? 'You' : user.displayName) +
                          " haven't posted anything yet"
                        : `You have to befriend ${user.displayName} to view their timeline`}
                </p>
            )}
        </div>
    )
}

export default TimeLine
