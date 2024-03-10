import { useContext } from 'react'
import { UserContent } from '../App/App.js'
import instance from '../utils/axios.js'

/** @typedef {import('../data/posts.json').User} User */

/**
 * @param {object} props
 * @param {User} props.user
 * @param {(newUserDetails: User) => void} props.updatedUser
 */
const Friends = ({ user, updateUser }) => {
    const { user: loggedInUser } = useContext(UserContent)

    const handleRemoveFriend = () => {
        instance.delete(
            `/users/${loggedInUser.username}/friends/${user.username}`,
        )

        if (!user.friendRequests) return

        // Update the local copy
        const updatedUser = structuredClone(user)
        // Remove friend from friend requests
        const index = updatedUser.friendRequests.indexOf(user.username)
        if (index > -1) updatedUser.friendRequests.splice(index, 1)
        updateUser(updatedUser)
    }

    return (
        <div className="container">
            <div className="row">
                {user.friends.map(username => (
                    <div className="col" key={username}>
                        <div className="friend-item col col-md-6 d-flex rounded align-items-center justify-content-between p-3 shadow my-3">
                            <div className="friend-name">{username}</div>
                            <button
                                className="btn btn-danger"
                                onClick={handleRemoveFriend}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Friends
