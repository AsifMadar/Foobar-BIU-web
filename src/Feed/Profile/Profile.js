import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import { useParams, Outlet, Link, Route, Routes } from 'react-router-dom'
import { UserContent } from '../../App/App.js'
import ProfileSidebar from './ProfileSideBar.js'
import ProfileTopSection from './ProfileTopSection.js'
import FriendsRequests from './Friends.js'
import TimeLine from './TimeLine.js'

function Profile() {
    const { username } = useParams()
    const [bio, setBio] = useState('')
    const [bioPresent, setBioPresent] = useState(false)
    const [selectedLink, setSelectedLink] = useState('')
    const { user, setUser } = useContext(UserContent)

    const handleLinkClick = link => {
        setSelectedLink(link)
        console.log('Selected Link:', link) // Add this line for debugging
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
        </div>
    )
}

export default Profile
