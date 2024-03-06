import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'

const ProfileTopSection = ({
    user,
    bio,
    bioPresent,
    addBio,
    handleLinkClick,
    selectedLink,
}) => {
    // No need to define handleLinkClick here since it's being passed as a prop

    return (
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
                        <li
                            className={
                                selectedLink === 'timeline' ? 'selected' : ''
                            }>
                            <Link
                                to={`/profile/${user.username}`}
                                onClick={() => handleLinkClick('timeline')}>
                                Timeline
                            </Link>
                        </li>
                        <li
                            className={
                                selectedLink === 'about' ? 'selected' : ''
                            }>
                            <Link
                                to={`/profile/${user.username}/about`}
                                onClick={() => handleLinkClick('about')}>
                                About
                            </Link>
                        </li>
                        <li
                            className={
                                selectedLink === 'friends' ? 'selected' : ''
                            }>
                            <Link
                                to={`/profile/${user.username}/friends`}
                                onClick={() => handleLinkClick('friends')}>
                                Friends
                            </Link>
                        </li>
                        <li
                            className={
                                selectedLink === 'photos' ? 'selected' : ''
                            }>
                            <Link
                                to={`/profile/${user.username}/photos`}
                                onClick={() => handleLinkClick('photos')}>
                                Photos
                            </Link>
                        </li>
                        <li
                            className={
                                selectedLink === 'archive' ? 'selected' : ''
                            }>
                            <Link
                                to={`/profile/${user.username}/archive`}
                                onClick={() => handleLinkClick('archive')}>
                                Archive
                            </Link>
                        </li>
                        <li
                            className={
                                selectedLink === 'more' ? 'selected' : ''
                            }>
                            <Link
                                to={`/profile/${user.username}/more`}
                                onClick={() => handleLinkClick('more')}>
                                More
                            </Link>
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
    )
}

export default ProfileTopSection
