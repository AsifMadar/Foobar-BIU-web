import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { createContext, useState } from 'react'
import SignInPage from '../SignIn/SignInPage.js'
import SignUpPage from '../SignUpPage/SignUpPage.js'
import UserFeed from '../Feed/UserFeed.js'

/** @typedef {import('../data/posts.json').User} User */
/** @typedef {User & { isSignedIn: boolean, password: string}} UserDetails */

/** @type {UserDetails} */
const defaultUser = {
    displayName: 'Georg C.',
    profileImage: '/sampleImages/user1.jpg',
    isSignedIn: true,
    password: '12345678',
    username: 'gcantor',
}
export const UserContent = createContext({
    user: defaultUser,
    /** @type {(newUser: UserDetails) => void} */
    setUser: () => {},
})

function App() {
    const [user, setUser] = useState(defaultUser)

    return (
        <BrowserRouter>
            <div className="Fakebook">
                <UserContent.Provider value={{ user, setUser }}>
                    <Routes>
                        {/* If user is logged in go to feed */}
                        {user.isSignedIn ? (
                            <>
                                <Route path="/*" element={<UserFeed />} />
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
