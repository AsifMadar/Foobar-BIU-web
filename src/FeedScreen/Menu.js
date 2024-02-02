// Menu.js
import React from 'react'
import PropTypes from 'prop-types' // Import PropTypes
import './Menu.css'

const menu = ({ user }) => {
    return (
        <div className="menu-section">
            <img src="icon.jpg" alt=" " className="icon" />
            <input type="text" placeholder="Search" />
            <img src="profile.jpg" alt=" " className="profile-image2" />
            <div className="user-info">
                <p>{user}</p>
            </div>
        </div>
    )
}

menu.propTypes = {
    user: PropTypes.string.isRequired,
}

export default menu
