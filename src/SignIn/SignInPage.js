import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdvancedTextField from '../TextField/AdvancedTextField.js'
import { UserContent } from '../App/App.js'

function SignInPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContent)
    const handleSignInClick = () => {
        console.log(user.username)
        console.log(user.password)
        if (user.username === username && user.password === password) {
            setUser(prevUser => ({
                ...prevUser,
                signIn: true,
            }))
            navigate('/feed')
        } else {
            console.log(user.username)
            alert('Invalid username or password')
        }
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
            <header className="bg-primary text-white p-3">
                <h1>Sign in</h1>
            </header>
            <AdvancedTextField
                label="Username"
                onInputChange={inputValue => setUsername(inputValue)}
                textFieldId={'loginUsername'}
            />
            <AdvancedTextField
                label="Password"
                onInputChange={inputValue => setPassword(inputValue)}
                textFieldId={'loginPassword'}
                isMasked={true}
            />
            <div style={{ margin: '5px 0' }}>
                <button className="btn btn-primary" onClick={handleSignInClick}>
                    Sign-In
                </button>
            </div>
            <div style={{ margin: '5px 0' }}>
                <button className="btn btn-danger" onClick={handleSignUpClick}>
                    Sign-up
                </button>
            </div>
        </div>
    )
}

export default SignInPage
