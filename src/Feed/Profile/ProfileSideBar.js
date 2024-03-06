import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ProfileSidebar.css'

function ProfileSidebar({ username }) {
    // Log the username prop for debugging
    useEffect(() => {
        console.log('Username:', username)
    }, [username])

    return (
        <div className="profileSidebar">
            <div className="posts2">
                <h1>Intro</h1>
                <div className="intro"></div>
            </div>
            <div className="posts2">
                <h1>Photos</h1>
                <div className="photos"> </div>
            </div>
            <div className="posts2">
                <h1>Friends</h1>
                {/* Link to the Friends page */}
                <div className="friends-link">
                    <Link
                        to={`/profile/${username}/friends`}
                        className="link-text">
                        View Friends
                    </Link>
                </div>
            </div>
            <div className="hr profile" />
            <div className="policies profile">
                <p>Privacy</p>
                <p className="dot">·</p>
                <p>Terms</p>
                <p className="dot">·</p>
                <p>Advertising</p>
                <p className="dot">·</p>
                <p>Ad choices</p>
                <i className="ads" />
                <p className="dot">·</p>
                <p>Cookies</p>
                <p className="dot">·</p>
                <p>More</p>
                <p className="dot">·</p>
                <p>Facebook © 2020</p>
            </div>
        </div>
    )
}

export default ProfileSidebar
