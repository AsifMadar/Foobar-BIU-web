import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdvancedTextField from '../TextField/AdvancedTextField.js'
import { UserContent } from '../App/App.js'

function SignUpPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [img, setImg] = useState('')
    const [displayName, setDisplayName] = useState('')

    const navigate = useNavigate()
    const { setUser } = useContext(UserContent)

    //this function sign in and initialize the user
    const handleSignUpClick = () => {
        if (checkAllValid()) {
            setUser({ signIn: true, username, password, displayName, img })
            navigate('/feed')
        } else {
            alert('Invalid')
        }
    }
    //checks if all the given info is valid
    const checkAllValid = () => {
        return (
            isUsernameValid(username) &&
            isPasswordValid(password) &&
            isRePasswordValid(rePassword) &&
            isDisplayNameValid(displayName)
        )
    }

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
            checkLen(displayName, 2, 8) && isOnlyLettersAndNumbers(displayName)
        )
    }
    const checkLen = (item, min, max) => {
        return item.length >= min && item.length <= max
    }
    const isOnlyLettersAndNumbers = item => {
        return /^[a-zA-Z0-9]+$/.test(item)
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
                <h1>Sign Up</h1>
            </header>
            <AdvancedTextField
                label="Username"
                onInputChange={userNameValue => setUsername(userNameValue)}
                textFieldId={'signUpUsername'}
                funcValid={isUsernameValid}
                inValidationErrorMessage={'Invalid Username'}
                instruction={'English letters and numbers only, 5-16 letters'}
                isMasked={false}
            />
            <AdvancedTextField
                label="Password"
                onInputChange={passwordValue => setPassword(passwordValue)}
                textFieldId={'signUpPassword'}
                funcValid={isPasswordValid}
                inValidationErrorMessage={'Invalid Password'}
                instruction={'English letters and numbers only, 8-16 letters'}
                isMasked={true}
            />
            <AdvancedTextField
                label="Re-type password"
                onInputChange={reTypePassword => setRePassword(reTypePassword)}
                textFieldId={'signUpReTypePassword'}
                funcValid={isRePasswordValid}
                inValidationErrorMessage={'Invalid Password'}
                instruction={'Re-type the password'}
                isMasked={true}
            />
            <AdvancedTextField
                label="img"
                onInputChange={imgValue => setImg(imgValue)}
                textFieldId={'signUpImg'}
            />
            <AdvancedTextField
                label="Display name"
                onInputChange={displayNameValue =>
                    setDisplayName(displayNameValue)
                }
                textFieldId={'signUpDisplayName'}
                funcValid={isDisplayNameValid}
                inValidationErrorMessage={'Invalid Display name'}
                instruction={'English letters and numbers only, 2-8 letters'}
            />
            <div style={{ margin: '5px 0' }}>
                <button className="btn btn-primary" onClick={handleSignUpClick}>
                    Sign-up
                </button>
            </div>
        </div>
    )
}

export default SignUpPage
