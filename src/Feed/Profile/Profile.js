import React, { useState, useEffect, useContext } from 'react'
import './Profile.css'
import { useParams, Link } from 'react-router-dom'
import { UserContent } from '../../App/App.js'
import ProfileSidebar from './ProfileSideBar.js'

function Profile() {
    const { username } = useParams()
    const { user } = useContext(UserContent)
    const [bio, setBio] = useState('')
    const [bioPresent, setBioPresent] = useState(false)

    useEffect(() => {
        // Fetch bio from database or any other source
        // For demonstration, setting a dummy bio
        setBio('This is a sample bio')
        setBioPresent(true)
    }, [])

    const addBio = () => {
        // Handle adding bio functionality
    }

    return (
        <div className="profile">
            <div className="profile__topSection">
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
                                {' '}
                                <Link to={`/profile/${user.username}`}>
                                    Timeline
                                </Link>{' '}
                            </li>
                            <li>
                                {' '}
                                <Link to={`/profile/${user.username}/about`}>
                                    About
                                </Link>{' '}
                            </li>
                            <li>
                                {' '}
                                <Link to={`/profile/${user.username}/friends`}>
                                    Friends
                                </Link>{' '}
                            </li>
                            <li>
                                {' '}
                                <Link to={`/profile/${user.username}/photos`}>
                                    Photos
                                </Link>{' '}
                            </li>
                            <li>
                                {' '}
                                <Link to={`/profile/${user.username}/archive`}>
                                    Archive
                                </Link>{' '}
                            </li>
                            <li>
                                {' '}
                                <Link to={`/profile/${user.username}/more`}>
                                    More
                                </Link>{' '}
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
                        <Link
                            to={`/profile/${user.username}/add-friend`}
                            className="rect addFriend">
                            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/33EToHSZ94f.png" />
                            <p>Add Friend</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="postsAndIntro">
                <ProfileSidebar username={user.username} />
            </div>
        </div>
    )
}

export default Profile
