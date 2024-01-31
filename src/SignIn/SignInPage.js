import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '../TextField/TextField.js'
import 'bootstrap/dist/css/bootstrap.min.css'

function SignInPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSignInClick = () => {
        console.log('Signing in with username:', username)
        console.log('Signing in with password:', password)
    }

    const handleSignUpClick = () => {
        // Use the navigate function to navigate to the "/signup" route
        navigate('/signup')
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
            }}>
            <h2>Sign in</h2>
            <TextField
                label="Username"
                onInputChange={inputValue => setUsername(inputValue)}
            />
            <TextField
                label="Password"
                onInputChange={inputValue => setPassword(inputValue)}
            />
            <div style={{ margin: '5px 0' }}>
                <button className="btn btn-primary" onClick={handleSignInClick}>
                    Sign-In
                </button>
            </div>
            <div style={{ margin: '5px 0' }}>
                <button className="btn btn-primary" onClick={handleSignUpClick}>
                    Sign-up
                </button>
            </div>
        </div>
    )
}

export default SignInPage
