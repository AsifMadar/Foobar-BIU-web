import './Profile.css'
import { UserContent } from '../../App/App.js'
import ProfileTopSection from './ProfileTopSection.js'
import React, { useContext, useEffect, useState } from 'react'

function Profile() {
    const [bio, setBio] = useState('')
    const [bioPresent, setBioPresent] = useState(false)
    const [selectedLink, setSelectedLink] = useState('')
    const { user } = useContext(UserContent)

    const handleLinkClick = link => {
        setSelectedLink(link)
    }

    useEffect(() => {
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
