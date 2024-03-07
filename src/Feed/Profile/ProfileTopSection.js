import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './ProfileTopSection.css'
import { UserContent } from '../../App/App.js'

const ProfileTopSection = ({ user, bio, bioPresent, addBio }) => {
    const { setUser } = useContext(UserContent)

    const handleAddFriendRequest = friendUsername => {
        // Logic to handle adding friend
        console.log(`Added friend with username: ${friendUsername}`)

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
        <div className="profile__topSection">
            {/* Profile top section content */}
            {/* Add Friend button */}

            <div className="profile__coverPhoto">
                <img
                    src={user.profileImage}
                    className="profileAvatar"
                    alt="Profile"
                />
            </div>
            <h1 id="documentUsername">{user.username}</h1>
            <p className="bioText">{bio}</p>
            {bioPresent ? null : (
                <p onClick={addBio} className="bio">
                    Add Bio
                </p>
            )}
            <div className="profileHeader__options">
                <div className="profileHeader__left">
                    <ul>
                        <li>
                            <NavLink
                                to={`/profile/${user.username}/timeline`}
                                activeclassname="selected"
                                className="nav-link">
                                Timeline
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/profile/${user.username}/about`}
                                activeclassname="selected"
                                className="nav-link">
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/profile/${user.username}/friends`}
                                activeclassname="selected"
                                className="nav-link">
                                Friends
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/profile/${user.username}/photos`}
                                activeclassname="selected"
                                className="nav-link">
                                Photos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/profile/${user.username}/archive`}
                                activeclassname="selected"
                                className="nav-link">
                                Archive
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/profile/${user.username}/more`}
                                activeClassName="selected"
                                className="nav-link">
                                More
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="profileHeader__right">
                    <Link
                        to={`/profile/${user.username}/edit`}
                        className="rect editProfile">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tmaz0VO75BB.png" />
                        <p>Edit Profile</p>
                    </Link>
                    <button
                        className="rect addFriend"
                        onClick={() => handleAddFriendRequest('dummyFriend')}>
                        <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/33EToHSZ94f.png"
                            alt="Add Friend"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileTopSection
