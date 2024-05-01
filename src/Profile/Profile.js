import './Profile.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContent } from '../App/App.js'
import FriendRequests from './FriendRequests.js'
import Friends from './Friends.js'
import instance from '../utils/axios.js'
import ManageUser from './ManageUser.js'
import ProfileTopSection from './ProfileTopSection.js'
import TimeLine from './TimeLine.js'
import MenuSideBar from '../MenuSideBar/MenuSideBar.js'

/** @typedef {import('../data/posts.json').User} User */

function Profile() {
    const { user: loggedInUser, setUser: setLoggedInUser } =
        useContext(UserContent)

    const [user, setUser] = useState(
        /** @type {User} */ ({
            displayName: '',
            friendRequests: [],
            friends: [],
            profileImage: '',
        }),
    )

    const { username } = useParams()
    useEffect(() => {
        if (!username) return
        instance.get('/users/' + username).then(res => {
            if (res.status === 200) setUser(res.data)
        })
    }, [username])

    const isMe = loggedInUser.username === username

    /** @param {User} newUserDetails */
    function updateUser(newUserDetails) {
        setUser(newUserDetails)
        if (isMe) setLoggedInUser(newUserDetails)
    }

    return (
        <div className="profile d-flex">
            <div className="profile-container">
                <ProfileTopSection
                    user={user}
                    updateUser={updateUser}
                    isMe={isMe}
                />

                <Routes>
                    <Route path="timeline" element={<TimeLine user={user} />} />
                    <Route
                        path="friends"
                        element={
                            <Friends user={user} updateUser={updateUser} />
                        }
                    />
                    {isMe && (
                        <>
                            <Route
                                path="friendrequests"
                                element={
                                    <FriendRequests
                                        user={user}
                                        updateUser={updateUser}
                                    />
                                }
                            />
                            <Route
                                path="edit"
                                element={
                                    <ManageUser
                                        user={user}
                                        updateUser={updateUser}
                                    />
                                }
                            />
                        </>
                    )}

                    <Route
                        path="*"
                        element={<Navigate to="./timeline" replace />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default Profile
