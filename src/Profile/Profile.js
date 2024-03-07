import './Profile.css'
import { UserContent } from '../App/App.js'
import ProfileTopSection from './ProfileTopSection.js'
import React, { useContext, useState } from 'react'

function Profile() {
    const [selectedLink, setSelectedLink] = useState('')
    const { user } = useContext(UserContent)

    const handleLinkClick = link => {
        setSelectedLink(link)
    }

    return (
        <div className="profile">
            <ProfileTopSection
                user={user}
                handleLinkClick={handleLinkClick}
                selectedLink={selectedLink}
            />
        </div>
    )
}

export default Profile
