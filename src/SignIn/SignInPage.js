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
    //if the given input is valid connect the user, else, alert him
    const handleSignInClick = () => {
        if (user.username === username && user.password === password) {
            setUser(prevUser => ({
                ...prevUser, //using the same fields as before
                signIn: true,
            }))
            navigate('/feed')
        } else {
            alert('Invalid username or password')
        }
    }
    // Use the navigate function to navigate to the "/signup" route
    const handleSignUpClick = () => {
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
            {/* Username textField */}
            <AdvancedTextField
                label="Username"
                onInputChange={inputValue => setUsername(inputValue)}
                textFieldId={'loginUsername'}
            />
            {/* Password textField */}
            <AdvancedTextField
                label="Password"
                onInputChange={inputValue => setPassword(inputValue)}
                textFieldId={'loginPassword'}
                isMasked={true}
            />
            <div style={{ margin: '5px 0' }}>
                {/* Sign in button */}
                <button className="btn btn-primary" onClick={handleSignInClick}>
                    Sign-In
                </button>
            </div>
            <div style={{ margin: '5px 0' }}>
                {/* Sign up button */}
                <button className="btn btn-danger" onClick={handleSignUpClick}>
                    Sign-up
                </button>
            </div>
        </div>
    )
}

export default SignInPage
