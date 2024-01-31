import React, { useState } from 'react'
import PropTypes from 'prop-types'

function TextField({ label, onInputChange }) {
    const [inputValue, setInputValue] = useState('')
    // if there is a change, it changes in the father function
    const handleInputChange = event => {
        const newValue = event.target.value
        setInputValue(newValue)

        if (typeof onInputChange === 'function') {
            onInputChange(newValue)
        }
    }

    return (
        <div style={{ margin: '5px 0' }}>
            <label htmlFor="textField">{label}: </label>
            <input
                type="text"
                id="textField"
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    )
}

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    onInputChange: PropTypes.func, // Callback function to handle input change
}

export default TextField
