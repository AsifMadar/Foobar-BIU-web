import './MenuTop.css'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function MenuTop() {
    const { pathname } = useLocation()
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

    const isActive = pn => pathname.startsWith(pn)
    const links = [
        {
            to: '/feed',
            imgSrc: 'https://cdn-icons-png.flaticon.com/128/14035/14035666.png',
        },
        {
            to: '/friendrequests',
            imgSrc: 'https://cdn-icons-png.flaticon.com/128/880/880441.png',
        },
        {
            to: '/profile/',
            imgSrc: 'https://cdn-icons-png.flaticon.com/128/1177/1177568.png',
        },
        {
            to: '/videos',
            imgSrc: 'https://cdn-icons-png.flaticon.com/128/4406/4406124.png',
        },
        {
            to: '/marketplace',
            imgSrc: 'https://cdn-icons-png.flaticon.com/128/4141/4141968.png',
        },
    ]

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
                {links.map((linkInfo, i) => (
                    <Link key={i} to={linkInfo.to}>
                        <img
                            src={linkInfo.imgSrc}
                            alt=""
                            className={isActive(linkInfo.to) ? 'active' : ''}
                        />
                    </Link>
                ))}
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
