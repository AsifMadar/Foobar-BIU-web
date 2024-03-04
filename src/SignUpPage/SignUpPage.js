import './SignUpPage.css'
import { useNavigate } from 'react-router-dom'
import { UserContent } from '../App/App.js'
import AdvancedTextField from '../TextField/AdvancedTextField.js'
import axios from '../utils/axios.js'
import React, { useContext, useState, useRef } from 'react'

function SignUpPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [profileImage, setImg] = useState(null)
    const [displayName, setDisplayName] = useState('')

    const navigate = useNavigate()
    const { setUser } = useContext(UserContent)

    const handleSignUpClick = async () => {
        if (!checkAllValid())
            return alert('One or more of the fields are invalid')

        try {
            const reader = new FileReader()
            reader.readAsDataURL(profileImage)
            await new Promise(resolve => {
                reader.onload = resolve
            })

            const res = await axios.post('/users', {
                username,
                password,
                displayName,
                profileImage: reader.result ?? '',
            })

            if (res.status === 200) {
                // The user was created; log in
                const res = await axios.post('/tokens', {
                    username,
                    password,
                })

                if (res.status === 200) {
                    const token = res.data
                    setUser({
                        displayName,
                        isSignedIn: true,
                        password,
                        username,
                        profileImage: profileImage
                            ? URL.createObjectURL(profileImage)
                            : null, //saves the img via url, if there's no image saves null
                    })

                    localStorage.setItem('jwtToken', token)

                    //moves the user to the feed page
                    navigate('/feed')
                }
            }
        } catch (e) {
            if (e.response.status === 409) {
                alert(
                    'This user already exists; please choose a different username',
                )
            } else if (e.response.status === 422) {
                alert('One or more of the fields are invalid')
            }
        }
    }

    const handleSignInPageClick = () => {
        navigate('/signin')
    }

    const handleAddPictureClick = () => {
        // Trigger the hidden file input and enabling us to add a picture using reference
        fileInputRef.current.click()
    }

    //checks if all the input is valid
    const checkAllValid = () =>
        profileImage != null &&
        isUsernameValid(username) &&
        isPasswordValid(password) &&
        isRePasswordValid(rePassword) &&
        isDisplayNameValid(displayName)

    //functions to check if the input by the user is valid

    const isOnlyLettersAndNumbers = item => /^[a-zA-Z0-9]+$/.test(item)
    const isOnlyLettersAndNumbersAndSpace = item =>
        /^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/.test(item)

    const isUsernameValid = username =>
        checkLen(username, 5, 16) && isOnlyLettersAndNumbers(username)

    const isPasswordValid = password =>
        checkLen(password, 8, 16) && isOnlyLettersAndNumbers(password)

    const isRePasswordValid = rePassword => rePassword === password

    const isDisplayNameValid = isOnlyLettersAndNumbersAndSpace

    const checkLen = (item, min, max) =>
        item.length >= min && item.length <= max

    //file input reference, used to save the picture by reference
    const fileInputRef = useRef(null)

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <header className="bg-primary text-white p-3">
                <h1>Sign Up</h1>
            </header>

            <div className="d-flex flex-column gap-2">
                <AdvancedTextField
                    label="Username"
                    onInputChange={userNameValue => setUsername(userNameValue)}
                    funcValid={isUsernameValid}
                    inValidationErrorMessage="Invalid Username"
                    instruction="5-16 alphanumeric characters"
                    isMasked={false}
                />
                <AdvancedTextField
                    label="Password"
                    onInputChange={passwordValue => setPassword(passwordValue)}
                    funcValid={isPasswordValid}
                    inValidationErrorMessage="Invalid Password"
                    instruction="8-16 alphanumeric characters"
                    isMasked={true}
                />
                <AdvancedTextField
                    label="Re-type password"
                    onInputChange={reTypePassword =>
                        setRePassword(reTypePassword)
                    }
                    funcValid={isRePasswordValid}
                    inValidationErrorMessage="Invalid Password"
                    instruction="Re-type the password"
                    isMasked={true}
                />
                <span
                    className="text-center"
                    style={{ color: 'red', fontSize: 'small' }}>
                    * Add a profile picture (must)
                </span>
                <button
                    className="btn btn-success mx-auto"
                    onClick={handleAddPictureClick}>
                    Add Picture
                </button>
                <input
                    accept="image/*"
                    className="d-none"
                    onChange={e => setImg(e.target.files[0] ?? null)}
                    ref={fileInputRef}
                    type="file"
                />
                {profileImage && (
                    <>
                        <h2>Your Profile Picture</h2>
                        <img
                            className="profile-image-preview"
                            src={URL.createObjectURL(profileImage)}
                            alt="Profile"
                        />
                    </>
                )}
                <AdvancedTextField
                    label="Display name"
                    onInputChange={displayNameValue =>
                        setDisplayName(displayNameValue)
                    }
                    funcValid={isDisplayNameValid}
                    inValidationErrorMessage="Invalid Display name"
                    instruction="2-16 alphanumeric characters"
                />
                <button
                    className="btn btn-primary mt-3 mx-auto mb-1"
                    onClick={handleSignUpClick}>
                    Sign Up
                </button>
            </div>
            <div style={{ margin: '5px 0' }}>
                <button
                    className="btn btn-danger"
                    onClick={handleSignInPageClick}>
                    Sign In Page
                </button>
            </div>
        </div>
    )
}

export default SignUpPage
