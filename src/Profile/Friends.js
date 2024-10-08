import './Friends.css'
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

    const handleRemoveFriend = async friendUsername => {
        try {
            await instance.delete(
                `/users/${loggedInUser.username}/friends/${friendUsername}`,
            )

            // Update the local copy (changed!!)
            const updatedUser = { ...user }
            updatedUser.friends = updatedUser.friends.filter(
                friend => friend !== friendUsername,
            )
            updateUser(updatedUser)
        } catch (error) {
            console.error('Error removing friend:', error)
        }
    }

    const isMe = user.username === loggedInUser.username
    const isFriend = isMe || user.friends?.includes(loggedInUser.username)

    return (
        <div className="container">
            {user.friends.length > 0 ? (
                <div className="row">
                    {user.friends.map(friendUsername => (
                        <div className="col-md-4" key={friendUsername}>
                            <div className="friend-item d-flex rounded align-items-center justify-content-between p-3 shadow my-3">
                                <div className="friend-name">
                                    {friendUsername}
                                </div>
                                {isMe && (
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleRemoveFriend(friendUsername)
                                        }>
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">
                    {isFriend
                        ? (isMe ? "You don't" : `${user.displayName} doesn't`) +
                          ' have any friends yet'
                        : `You have to befriend ${user.displayName} to see their friends list`}
                </p>
            )}
        </div>
    )
}

export default Friends
