// App.js
import './App.css'
import React, { useState, useContext } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom'
import SignInPage from '../SignIn/SignInPage.js'
import SignUpPage from '../SignUpPage/SignUpPage.js'
import { useNavigate } from 'react-router-dom'

export const UserContent = React.createContext(null)

function GoToFeed() {
    const { setUser } = useContext(UserContent)
    const navigate = useNavigate()
    const logout = () => {
        setUser(prevUser => ({
            ...prevUser,
            signIn: false,
        }))
        navigate('/signin')
    }
    return (
        <div>
            {/* Content for authenticated user */}
            <p>Welcome to the Home Page!</p>
            <button className="btn btn-danger" onClick={logout}>
                Logout
            </button>
        </div>
    )
}

function App() {
    const [user, setUser] = useState({ signIn: null })

    return (
        <Router>
            <div className="Fakebook">
                {/* default value for the global variable of userContent */}
                <UserContent.Provider value={{ user: user, setUser: setUser }}>
                    <Routes>
                        {/* If user is logged in go to feed */}
                        {user.signIn ? (
                            <>
                                <Route path="/feed" element={<GoToFeed />} />
                                <Route
                                    path="/"
                                    element={<Navigate to="/feed" replace />}
                                />
                                <Route
                                    path="/signin"
                                    element={<Navigate to="/feed" replace />}
                                />
                                <Route
                                    path="/signup"
                                    element={<Navigate to="/feed" replace />}
                                />
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
        </Router>
    )
}

export default App
