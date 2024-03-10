import instance from '../utils/axios.js'

/** @typedef {import('../data/posts.json').User} User */

/**
 * @param {object} props
 * @param {User} props.user
 * @param {(newUserDetails: User) => void} props.updatedUser
 */
const FriendRequests = ({ user, updateUser }) => {
    function handleAcceptRequest(username) {
        instance.patch(`/users/${user.username}/friends/${username}`, {})

        // Update the local copy
        const updatedUser = structuredClone(user)

        // Add to friends list
        updatedUser.friends.push(username)

        // Remove from friend requests
        const index = updatedUser.friendRequests.indexOf(username)
        if (index > -1) updatedUser.friendRequests.splice(index, 1)

        updateUser(updatedUser)
    }

    function handleRejectRequest(username) {
        instance.delete(`/users/${user.username}/friends/${username}`)

        // Update the local copy
        const updatedUser = structuredClone(user)

        // Remove from friend requests
        const index = updatedUser.friendRequests.indexOf(username)
        if (index > -1) updatedUser.friendRequests.splice(index, 1)

        updateUser(updatedUser)
    }

    return (
        <div className="container">
            {user.friendRequests?.map(username => (
                <div
                    key={username}
                    className="col col-md-6 d-flex align-items-center justify-content-between p-3 shadow my-3">
                    <span>{username}</span>
                    <div>
                        <button
                            className="btn btn-success mx-2"
                            onClick={() => handleAcceptRequest(username)}>
                            Accept
                        </button>
                        <button
                            className="btn btn-danger mx-2"
                            onClick={() => handleRejectRequest(username)}>
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FriendRequests
