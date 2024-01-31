// App.js
import './App.css'
import React, { useState, useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignInPage from '../SignIn/SignInPage.js'
import SignUpPage from '../SignUpPage/SignUpPage.js'

export const UserContent = React.createContext(null)

function IsConnected() {
    return GoToFeed
}

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
                        {/* If user is logged in go to feed. else, go to signInPage */}
                        {user.signIn ? (
                            <Route path="/signin" element={<GoToFeed />} />
                        ) : (
                            <Route path="/" element={<SignInPage />} />
                        )}
                        <Route path="/signup" element={<SignUpPage />} />
                    </Routes>
                </UserContent.Provider>
            </div>
        </Router>
    )
}

export default App
