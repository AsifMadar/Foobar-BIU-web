import './Profile.css'
import { UserContent } from '../App/App.js'
import ProfileTopSection from './ProfileTopSection.js'
import React, { useContext } from 'react'

const TimeLine = () => {
    const { user } = useContext(UserContent)
    return (
        <div className="profile">
            <ProfileTopSection user={user} />
            <div className="profileContent"></div>
        </div>
    )
}

export default TimeLine
