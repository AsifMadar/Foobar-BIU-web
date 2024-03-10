import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MenuTop from '../MenuTop/MenuTop.js'
import Profile from '../Profile/Profile.js'
import React, { createContext, useState } from 'react'
import SignInPage from '../SignIn/SignInPage.js'
import SignUpPage from '../SignUpPage/SignUpPage.js'
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
                    {user.isSignedIn ? (
                        <>
                            <MenuTop />
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Navigate to="/feed" />}
                                />
                                <Route path="/feed" element={<UserFeed />} />
                                <Route
                                    path="/profile"
                                    element={
                                        <Navigate
                                            to={'/profile/' + user.username}
                                            replace
                                        />
                                    }
                                />
                                <Route
                                    path="/profile/:username/*"
                                    element={<Profile />}
                                />

                                <Route
                                    path="*"
                                    element={<Navigate to="/feed" replace />}
                                />
                            </Routes>
                        </>
                    ) : (
                        <Routes>
                            <Route path="/signin" element={<SignInPage />} />
                            <Route path="/signup" element={<SignUpPage />} />

                            <Route
                                path="*"
                                element={<Navigate to="/signin" />}
                            />
                        </Routes>
                    )}
                </UserContent.Provider>
            </div>
        </BrowserRouter>
    )
}

export default App
