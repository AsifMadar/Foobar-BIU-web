import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Friends from '../Feed/Profile/Friends.js' // Import FriendsRequests component
import FriendsRequest from '../Feed/FriendRequestPage/FriendsRequest.js'
import MenuTop from '../Feed/MenuTop.js'
import Profile from '../Feed/Profile/Profile.js'
import React, { createContext, useState } from 'react'
import SignInPage from '../SignIn/SignInPage.js'
import SignUpPage from '../SignUpPage/SignUpPage.js'
import TimeLine from '../Feed/Profile/TimeLine.js'
import UserFeed from '../Feed/UserFeed.js'

/** @typedef {import('../data/posts.json').CurrentUser} CurrentUser */
/** @type {CurrentUser} */
const defaultUser = {
    isSignedIn: false,
}

export const UserContent = createContext({
    user: defaultUser,
    setUser: () => {},
})

function App() {
    const [user, setUser] = useState(defaultUser)

    return (
        <BrowserRouter>
            <div className="Fakebook">
                <UserContent.Provider value={{ user, setUser }}>
                    {user.isSignedIn && <MenuTop />}
                    <Routes>
                        {/* If user is logged in go to feed */}
                        {user.isSignedIn ? (
                            <>
                                <Route
                                    path="/"
                                    element={<Navigate to="/feed" />}
                                />
                                <Route path="/feed" element={<UserFeed />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route
                                    path="/friendsrequest"
                                    element={<FriendsRequest />}
                                />
                                <Route
                                    path="/profile/:username/timeline"
                                    element={<TimeLine />}
                                />
                                <Route
                                    path="/profile/:username/friends"
                                    element={<Friends />}
                                />{' '}
                                {/* Add route for FriendsRequests */}
                            </>
                        ) : (
                            <>
                                <Route
                                    path="/signin"
                                    element={<SignInPage />}
                                />
                                <Route
                                    path="/signup"
                                    element={<SignUpPage />}
                                />
                                <Route
                                    path="/"
                                    element={<Navigate to="/signin" replace />}
                                />
                                <Route
                                    path="/feed"
                                    element={<Navigate to="/signin" replace />}
                                />
                            </>
                        )}
                    </Routes>
                </UserContent.Provider>
            </div>
        </BrowserRouter>
    )
}

export default App
