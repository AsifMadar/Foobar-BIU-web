import './MenuTop.css'
import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function MenuTop() {
    const { pathname } = useLocation()
    const isActive = pn => {
        if (pn === pathname) return 'active'
    }

    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Initialize isDarkMode state with the value from local storage
        const storedMode = localStorage.getItem('darkMode')
        return storedMode ? JSON.parse(storedMode) : false
    })

    useEffect(() => {
        // Update body dataset attribute when isDarkMode changes
        document.body.dataset.bsTheme = isDarkMode ? 'dark' : 'light'
        // Update local storage with the current isDarkMode value
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    }, [isDarkMode])

    const toggleColorMode = () => {
        setIsDarkMode(prevMode => !prevMode)
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
                <Link to="/">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/14035/14035666.png"
                        alt=""
                        className={`${isActive('/feed')}`}
                    />
                </Link>
                <Link to="/friendrequests">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/880/880441.png"
                        alt=""
                        className={`${isActive('/friendrequests')}`}
                    />
                </Link>
                <Link to="/profile">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
                        alt=""
                        className={`${isActive('/profile')}`}
                    />
                </Link>
                <Link to="/videos">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/4406/4406124.png"
                        alt=""
                        className={`${isActive('/videos')}`}
                    />
                </Link>
                <Link to="/marketplace">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/4141/4141968.png"
                        alt=""
                        className={`${isActive('/marketplace')}`}
                    />
                </Link>
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
                        Dark Mode
                    </label>
                </div>
            </div>
        </div>
    )
}

export default MenuTop
