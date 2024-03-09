import { UserContent } from '../App/App.js'
import React, { useContext } from 'react'

const TimeLine = () => {
    const { user } = useContext(UserContent)
    return <div className="profileContent">{user.displayName}</div>
}

export default TimeLine
