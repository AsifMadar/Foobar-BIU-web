import { useEffect, useState } from 'react'
import instance from '../utils/axios.js'
import PostList from '../PostList/PostList.js'

/** @typedef {import('../data/posts.json').Post} Post */
/** @typedef {import('../data/posts.json').User} User */

/**
 * @param {object} props
 * @param {User} props.user
 */
const TimeLine = ({ user }) => {
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

    return <PostList posts={postsDetails} updatePosts={() => {}} />
}

export default TimeLine
