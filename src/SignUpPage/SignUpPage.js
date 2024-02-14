import React, { useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdvancedTextField from '../TextField/AdvancedTextField.js'
import { UserContent } from '../App/App.js'

function SignUpPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [profileImage, setImg] = useState(null)
    const [displayName, setDisplayName] = useState('')

    const navigate = useNavigate()
    const { setUser } = useContext(UserContent)

    const handleSignUpClick = () => {
        if (checkAllValid()) {
            //Setting user
            setUser({
                signIn: true,
                username,
                password,
                displayName,
                profileImage: profileImage
                    ? URL.createObjectURL(profileImage)
                    : null, //saves the img via url, if there's no image saves null
            })
            //moves the user to the feed page
            navigate('/feed')
        } else {
            //if one of the fields are invalid alerting the user
            alert('One or more of the fields are invalid')
        }
    }
    //setting the profile image
    const handleImageChange = selectedImage => {
        setImg(selectedImage)
    }

    const handleSignInPageClick = () => {
        navigate('/signin')
    }

    const handleAddPictureClick = () => {
        // Trigger the hidden file input and enabling us to add a picture using reference
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }
    //checks if all the input is valid
    const checkAllValid = () => {
        return (
            profileImage != null &&
            isUsernameValid(username) &&
            isPasswordValid(password) &&
            isRePasswordValid(rePassword) &&
            isDisplayNameValid(displayName)
        )
    }
    //functions to check if the input by the user is valid
    const isUsernameValid = username => {
        return checkLen(username, 5, 16) && isOnlyLettersAndNumbers(username)
    }

    const isPasswordValid = password => {
        return checkLen(password, 8, 16) && isOnlyLettersAndNumbers(password)
    }

    const isRePasswordValid = rePassword => {
        return rePassword === password
    }

    const isDisplayNameValid = displayName => {
        return (
            checkLen(displayName, 2, 16) &&
            isOnlyLettersAndNumbersAndSpace(displayName)
        )
    }

    const checkLen = (item, min, max) => {
        return item.length >= min && item.length <= max
    }

    const isOnlyLettersAndNumbers = item => {
        return /^[a-zA-Z0-9]+$/.test(item)
    }
    const isOnlyLettersAndNumbersAndSpace = item => {
        return /^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/.test(item)
    }
    //file input reference, used to save the picture by reference
    const fileInputRef = useRef(null)

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start', // Adjust this as needed
                minHeight: '80vh',
                marginTop: '50px', // Now it's a minimum height, allowing growth
            }}>
            <header className="bg-primary text-white p-3">
                <h1>Sign Up</h1>
            </header>
            {/* Username textField */}
            <AdvancedTextField
                label="Username"
                onInputChange={userNameValue => setUsername(userNameValue)}
                textFieldId={'signUpUsername'}
                funcValid={isUsernameValid}
                inValidationErrorMessage={'Invalid Username'}
                instruction={'English letters and numbers only, 5-16 letters'}
                isMasked={false}
            />
            {/* Password textField */}
            <AdvancedTextField
                label="Password"
                onInputChange={passwordValue => setPassword(passwordValue)}
                textFieldId={'signUpPassword'}
                funcValid={isPasswordValid}
                inValidationErrorMessage={'Invalid Password'}
                instruction={'English letters and numbers only, 8-16 letters'}
                isMasked={true}
            />
            {/* re-type password textField */}
            <AdvancedTextField
                label="Re-type password"
                onInputChange={reTypePassword => setRePassword(reTypePassword)}
                textFieldId={'signUpReTypePassword'}
                funcValid={isRePasswordValid}
                inValidationErrorMessage={'Invalid Password'}
                instruction={'Re-type the password'}
                isMasked={true}
            />
            {/* Add profile picture button */}
            <div style={{ color: 'red', fontSize: 'small' }}>
                {'*Add a profile picture (must)'}
            </div>
            <div style={{ margin: '5px 0' }}>
                <button
                    className="btn btn-success"
                    onClick={handleAddPictureClick}>
                    Add Picture
                </button>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={e => handleImageChange(e.target.files[0])}
                    ref={fileInputRef}
                />
                {/* Shows up the profile image */}
            </div>
            {profileImage && (
                <>
                    <h2>Your Profile Picture</h2>
                    <img
                        src={URL.createObjectURL(profileImage)}
                        alt="Profile"
                        style={{ width: '500px', height: 'auto' }}
                    />
                </>
            )}
            {/* Display name textField */}
            <AdvancedTextField
                label="Display name"
                onInputChange={displayNameValue =>
                    setDisplayName(displayNameValue)
                }
                textFieldId={'signUpDisplayName'}
                funcValid={isDisplayNameValid}
                inValidationErrorMessage={'Invalid Display name'}
                instruction={'English letters and numbers only, 2-16 letters'}
            />
            {/* Sign up button */}
            <div style={{ margin: '5px 0' }}>
                <button className="btn btn-primary" onClick={handleSignUpClick}>
                    Sign-up
                </button>
            </div>
            {/* Sign in page button */}
            <div style={{ margin: '5px 0' }}>
                <button
                    className="btn btn-primary"
                    onClick={handleSignInPageClick}>
                    Sign-in page
                </button>
            </div>
        </div>
    )
}

export default SignUpPage
