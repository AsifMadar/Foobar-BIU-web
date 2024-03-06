import './SignInPage.css'
import { useNavigate } from 'react-router-dom'
import { UserContent } from '../App/App.js'
import AdvancedTextField from '../TextField/AdvancedTextField.js'
import axios, { jwt } from '../utils/axios.js'
import { useContext, useState, useEffect } from 'react'

function SignInPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const getUserInfoAndGoToFeed = async myUsername => {
        const res = await axios.get('/users/' + myUsername)

        if (res.status === 200) {
            setUser({
                ...res.data,
                isSignedIn: true,
            })

            navigate('/feed')
        }
    }

    useEffect(() => {
        const existingUsername = localStorage.getItem('username')
        if (jwt.get() && existingUsername) {
            getUserInfoAndGoToFeed(existingUsername)
        }
    })

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

            jwt.set(res.data)
            localStorage.setItem('username', username)
            if (res.status === 200) getUserInfoAndGoToFeed(username)
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
