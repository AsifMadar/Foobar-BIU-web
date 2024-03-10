import { Link } from 'react-router-dom'
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

    const handleRemoveFriend = friendUsername => {
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
        <div className="container shadow">
            <div className="row">
                <div className="col">
                    <h3>Friends</h3>
                </div>
                <div className="col text-right">
                    <Link to="/friendsrequest">Friend Requests</Link>
                </div>
            </div>
            <div className="row">
                {user.friends.map(friend => (
                    <div className="col" key={friend.id}>
                        <div className="friend-item shadow p-3 mb-4 bg-white rounded d-flex align-items-center justify-content-between">
                            <div className="friend-name">{friend.name}</div>
                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    handleRemoveFriend(friend.username)
                                }>
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
