import './ProfileTopSection.css'
import { NavLink } from 'react-router-dom'
import { UserContent } from '../App/App.js'
import React, { useContext } from 'react'

const ProfileTopSection = ({ user }) => {
    const { setUser } = useContext(UserContent)

    const handleAddFriendRequest = friendUsername => {
        // Update user's friends list
        const updatedUser = { ...user }
        updatedUser.friendRequests = [
            ...updatedUser.friendRequests,
            { username: friendUsername, name: friendUsername },
        ]
        setUser(updatedUser)

        // Remove friend from friend requests
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
                    <NavLink
                        to={`./more`}
                        className={({ isActive }) =>
                            isActive ? 'selected' : ''
                        }>
                        More
                    </NavLink>
                </div>
                <div className="d-flex p-2">
                    <button to={`./edit`} className="rect editProfile">
                        Edit Profile
                    </button>
                    <button
                        className="rect addFriend"
                        onClick={() => handleAddFriendRequest('dummyFriend')}>
                        Add Friend
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileTopSection
