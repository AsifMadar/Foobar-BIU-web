import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { UserContent } from '../../App/App.js'
import ProfileSidebar from './ProfileSideBar.js'
import ProfileTopSection from './ProfileTopSection.js'
import './Profile.css'
const TimeLine = () => {
    const { user } = useContext(UserContent)
    const [bio, setBio] = useState('')
    const [bioPresent, setBioPresent] = useState(false)
    const [selectedLink, setSelectedLink] = useState('')

    const handleLinkClick = link => {
        setSelectedLink(link)
    }

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
            <ProfileTopSection
                user={user}
                bio={bio}
                bioPresent={bioPresent}
                addBio={addBio}
                handleLinkClick={handleLinkClick}
                selectedLink={selectedLink}
            />
            <div className="postsAndIntro">
                <ProfileSidebar username={user.username} />
            </div>
            <div className="profileContent">
                <Outlet /> {/* Render children components */}
            </div>
        </div>
    )
}

export default TimeLine
