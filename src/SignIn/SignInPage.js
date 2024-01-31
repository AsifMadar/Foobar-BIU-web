import React, { useState } from 'react'
import TextField from '../TextField/TextField.js'
import 'bootstrap/dist/css/bootstrap.min.css'
function SignInPage() {
    //contains the username and password
    const [username, setUsername] = useState('')
    const [password, setPassowrd] = useState('')
    //when the user is clicking signIn check validality and go to feed if its ok. else, pop a message
    const handleSignInClick = () => {
        console.log('Signing in with username:', username)
        console.log('Signing in with password:', password)
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
                onInputChange={inputValue => setPassowrd(inputValue)}
            />
            <div style={{ margin: '5px 0' }}>
                <button className="btn btn-primary" onClick={handleSignInClick}>
                    Sign In
                </button>
            </div>
            <div style={{ margin: '5px 0' }}>
                <button className="btn btn-primary" onClick={handleSignInClick}>
                    Sign up
                </button>
            </div>
        </div>
    )
}

export default SignInPage
