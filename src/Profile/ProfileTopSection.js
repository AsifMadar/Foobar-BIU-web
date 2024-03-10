import './ProfileTopSection.css'
import { NavLink } from 'react-router-dom'
import instance from '../utils/axios.js'

/** @typedef {import('../data/posts.json').User} User */

/**
 * @param {object} props
 * @param {boolean} props.isMe Is the provided user also the currently logged in user
 * @param {User} props.user
 * @param {(newUserDetails: User) => void} props.updatedUser
 */
const ProfileTopSection = ({ isMe, user, updateUser }) => {
    const handleRequestFriendship = () => {
        instance.post(`/users/${user.username}/friends`, {})

        if (!user.friendRequests) return

        // Update the local copy
        const updatedUser = structuredClone(user)
        updatedUser.friendRequests.push(user.username)
        updateUser(updatedUser)
    }

    return (
        <div className="profile-top-section">
            <div className="image-container">
                <img
                    src={user.profileImage}
                    className="profileAvatar"
                    alt="Profile"
                />
            </div>
            <h1 className="mt-3">{user.displayName}</h1>

            <div className="profile-header">
                <div className="nav-links d-flex m-3">
                    <NavLink
                        to={`./timeline`}
                        className={({ isActive }) =>
                            isActive ? 'selected' : ''
                        }>
                        Timeline
                    </NavLink>
                    <NavLink
                        to={`./friends`}
                        className={({ isActive }) =>
                            isActive ? 'selected' : ''
                        }>
                        Friends
                    </NavLink>
                    {isMe && (
                        <NavLink
                            to={`./friendrequests`}
                            className={({ isActive }) =>
                                isActive ? 'selected' : ''
                            }>
                            Friend Requests
                        </NavLink>
                    )}
                    <NavLink
                        to={`./more`}
                        className={({ isActive }) =>
                            isActive ? 'selected' : ''
                        }>
                        More
                    </NavLink>
                </div>
                <div className="d-flex p-2">
                    {isMe ? (
                        <button to={`./edit`} className="rect editProfile">
                            Edit Profile
                        </button>
                    ) : (
                        <button
                            className="rect addFriend"
                            onClick={handleRequestFriendship}>
                            Send friend request
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileTopSection
