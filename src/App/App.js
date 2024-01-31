// App.js
import './App.css'
import React, { useState, useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignInPage from '../SignIn/SignInPage.js'

export const UserContent = React.createContext(null)

function IsConnected() {
    return Home
}

function Home() {
    const { signIn } = useContext(UserContent)

    return (
        <div>
            {signIn ? (
                <div>
                    {/* Content for authenticated user */}
                    <p>Welcome to the Home Page!</p>
                </div>
            ) : (
                <SignInPage />
            )}
        </div>
    )
}

function App() {
    const [user, setUser] = useState(null)

    return (
        <Router>
            <div className="Fakebook">
                <UserContent.Provider value={{ signIn: false }}>
                    <Routes>
                        {/* calls for the signin check first because we want to put him in the url of fakebook/signin */}
                        <Route path="/signin" element={<IsConnected />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </UserContent.Provider>
            </div>
        </Router>
    )
}

export default App
