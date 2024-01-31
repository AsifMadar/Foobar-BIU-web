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

export const UserContent = React.createContext(null)

function GoToFeed() {
    return (
        <div>
            {/* Content for authenticated user */}
            <p>Welcome to the Home Page!</p>
        </div>
    )
}

function App() {
    const [user, setUser] = useState({ signIn: false })

    return (
        <Router>
            <div className="Fakebook">
                {/* default value for the global variable of userContent */}
                <UserContent.Provider value={{ signIn: false }}>
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
