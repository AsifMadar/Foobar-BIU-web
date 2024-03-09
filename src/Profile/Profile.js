import './Profile.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContent } from '../App/App.js'
import Friends from './Friends.js'
import MenuSideBar from '../MenuSideBar/MenuSideBar.js'
import ProfileTopSection from './ProfileTopSection.js'
import TimeLine from './TimeLine.js'
//import ManageUser from './ManageUser.js'

function Profile() {
    const [selectedLink, setSelectedLink] = useState('')
    const { username } = useParams()
    const { user } = useContext(UserContent)
    const isMe = username === user.username

    const handleLinkClick = link => {
        setSelectedLink(link)
    }

    return (
        <div className="profile d-flex">
            <MenuSideBar />
            <div className="profile-container">
                <ProfileTopSection
                    user={user}
                    handleLinkClick={handleLinkClick}
                    selectedLink={selectedLink}
                />

                <Routes>
                    <Route path="timeline" element={<TimeLine />} />
                    <Route path="friends" element={<Friends />} />
                    {/* isMe && <Route path="more" element={<ManageUser />} /> */}

                    <Route path="*" element={<Navigate to="./timeline" />} />
                </Routes>
            </div>
        </div>
    )
}

export default Profile
