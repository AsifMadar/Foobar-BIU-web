import React, { useState } from 'react'
import PropTypes from 'prop-types'

function AdvancedTextField({
    label, //The name of the textfield
    onInputChange, //The argument which returns the text the user typed
    textFieldId, // The textField id
    funcValid, //a function to check if valid
    valid, //The boolean to know if the text is valid
    inValidationErrorMessage, //which message to show if invalid input
    instruction, // instruction to the given textfield showed to user
    isMasked, //a boolean which use asterisk if true
}) {
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = event => {
        const newValue = event.target.value
        setInputValue(newValue)

        if (typeof onInputChange === 'function') {
            onInputChange(newValue)
        }

        if (typeof funcValid === 'function') {
            // if funcValid is provided, validate the input
            const isValid = funcValid(newValue)
            if (isValid) {
                // if valid mark in green and set valid to true
                setInputClass('is-valid')
            } else {
                // if invalid mark in red and set valid to false
                setInputClass('is-invalid')
            }
        }
    }

    const setInputClass = className => {
        //changing the color of the textField
        const inputElement = document.getElementById(textFieldId)
        inputElement.classList.remove('is-valid', 'is-invalid')
        inputElement.classList.add(className)
    }
    const mask = isMasked ? 'password' : 'text'
    return (
        <div className="textFieldComp">
            <label htmlFor="textField" className="form-label">
                {label}:
            </label>
            {instruction && (
                <div style={{ color: 'red', fontSize: 'small' }}>
                    {'*' + instruction}
                </div>
            )}
            <input
                type={mask}
                className="form-control"
                id={textFieldId}
                value={inputValue}
                onChange={handleInputChange}
            />
            {!valid && (
                //if input is invalid write the inValidationErrorMessage
                <div className="invalid-feedback">
                    {inValidationErrorMessage}
                </div>
            )}
        </div>
    )
}

AdvancedTextField.propTypes = {
    label: PropTypes.string.isRequired,
    onInputChange: PropTypes.func,
    textFieldId: PropTypes.string,
    funcValid: PropTypes.func,
    valid: PropTypes.bool,
    inValidationErrorMessage: PropTypes.string,
    instruction: PropTypes.string,
    isMasked: PropTypes.bool,
}

export default AdvancedTextField
