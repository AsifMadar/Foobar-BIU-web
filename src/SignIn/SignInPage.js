import './SignInPage.css'
import { useNavigate } from 'react-router-dom'
import { UserContent } from '../App/App.js'
import AdvancedTextField from '../TextField/AdvancedTextField.js'
import React, { useContext, useState } from 'react'
import axios from '../utils/axios.js'

function SignInPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const { setUser } = useContext(UserContent)
    //if the given input is valid connect the user, else, alert him
    const handleSignInClick = async event => {
        event.preventDefault()
        // Use the instance to make a GET request to the `/users` endpoint
        try {
            const res = await axios.post('/tokens', {
                username,
                password,
            })

            localStorage.setItem('jwtToken', res.data)

            const userRes = await axios.get('/users/' + username)

            // correct info
            if (res.status === 200 && userRes.status === 200) {
                setUser({
                    ...userRes.data, //using the same fields as before
                    isSignedIn: true,
                })

                console.log(userRes.data)

                navigate('/feed')
            }
        } catch (error) {
            //invalid info
            if (error.response && error.response.status === 404) {
                alert('Invalid username or password')
            }
        }
    }
    // Use the navigate function to navigate to the "/signup" route
    const handleSignUpClick = () => {
        navigate('/signup')
    }

    return (
        <div
            id="sign-in-container"
            className="d-flex flex-column justify-content-center align-items-center">
            <header className="bg-primary text-white p-3">
                <h1>Sign in</h1>
            </header>
            <form className="d-flex flex-column" action="">
                <AdvancedTextField
                    label="Username"
                    onInputChange={inputValue => setUsername(inputValue)}
                />
                <AdvancedTextField
                    label="Password"
                    onInputChange={inputValue => setPassword(inputValue)}
                    isMasked={true}
                />
                <button
                    className="btn btn-primary mt-3 mx-auto mb-1"
                    onClick={handleSignInClick}
                    type="submit">
                    Sign In
                </button>
            </form>
            <div className="m-1">
                <button
                    className="btn btn-danger m-1 mx-auto"
                    onClick={handleSignUpClick}>
                    Sign Up Page
                </button>
            </div>
        </div>
    )
}

export default SignInPage
