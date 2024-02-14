// MenuTop.js
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './MenuTop.css'
import PropTypes from 'prop-types'

function MenuTop({ user }) {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleColorMode = () => {
        setIsDarkMode(prevMode => !prevMode)
        document.body.dataset.bsTheme = isDarkMode ? 'light' : 'dark'
    }
    return (
        <div className="top-section">
            <img
                src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                alt="Facebook Icon"
                className="icon"
            />
            <input type="text" placeholder="Search" className="search-bar" />
            <div className="user-info">
                <button className="search-button btn btn-info">Search</button>
            </div>
            <div className="feedpages">
                <img
                    src="https://cdn-icons-png.flaticon.com/128/14035/14035666.png"
                    alt=""
                    className="homeIcon"
                />
                <img
                    src="https://cdn-icons-png.flaticon.com/128/880/880441.png"
                    alt=""
                    className="friendsIcon"
                />
                <img
                    src="https://cdn-icons-png.flaticon.com/128/4406/4406124.png"
                    alt=""
                    className="videosIcon"
                />
                <img
                    src="https://cdn-icons-png.flaticon.com/128/4141/4141968.png"
                    alt=""
                    className="marketplaceIcon"
                />
            </div>
            <div className="dark-mode-switcher">
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={isDarkMode}
                        onChange={toggleColorMode}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault">
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </label>
                </div>
            </div>
        </div>
    )
}
MenuTop.propTypes = {
    user: PropTypes.object.isRequired,
}
export default MenuTop
