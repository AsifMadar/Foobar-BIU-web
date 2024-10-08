import './ProfileTopSection.css'
import { NavLink } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContent } from '../App/App.js'
import instance from '../utils/axios.js'

/** @typedef {import('../data/posts.json').User} User */

/**
 * @param {object} props
 * @param {boolean} props.isMe Is the provided user also the currently logged in user
 * @param {User} props.user
 * @param {(newUserDetails: User) => void} props.updatedUser
 */
const ProfileTopSection = ({ isMe, user, updateUser }) => {
    const { user: loggedInUser } = useContext(UserContent)
    const loggedInUsername = loggedInUser.username

    const [isFriend, setIsFriend] = useState(false)
    useEffect(() => {
        setIsFriend(isMe || user.friends?.includes(loggedInUsername))
    }, [isMe, loggedInUsername, user])

    const [hasRequestedFriendship, setHasRequestedFriendship] = useState(false)
    useEffect(() => {
        setHasRequestedFriendship(false)
    }, [user])

    const handleRequestFriendship = () => {
        setHasRequestedFriendship(true)
        instance.post(`/users/${user.username}/friends`, {}).catch(e => {
            if (e.response.status === 409) return // Happens when sending a request twice
            throw e
        })

        if (!isMe) return

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
                </div>
                <div className="d-flex p-2">
                    {isMe && (
                        <NavLink to={`./edit`} className="profile-button">
                            Edit Profile
                        </NavLink>
                    )}
                    {!isFriend &&
                        (hasRequestedFriendship ? (
                            <button className="profile-button" disabled={true}>
                                Sent!
                            </button>
                        ) : (
                            <button
                                className="profile-button"
                                onClick={handleRequestFriendship}>
                                Send friend request
                            </button>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default ProfileTopSection
