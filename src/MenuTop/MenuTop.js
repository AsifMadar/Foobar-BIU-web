import './MenuTop.css'
import { Link, useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContent } from '../App/App.js'

function MenuTop() {
    const { pathname } = useLocation()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Initialize isDarkMode state with the value from local storage
        const storedMode = localStorage.getItem('darkMode')
        return storedMode ? JSON.parse(storedMode) : false
    })

    const { user, setUser } = useContext(UserContent)

    useEffect(() => {
        // Update body dataset attribute when isDarkMode changes
        document.body.dataset.bsTheme = isDarkMode ? 'dark' : 'light'
        // Update local storage with the current isDarkMode value
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    }, [isDarkMode])

    const toggleColorMode = () => {
        setIsDarkMode(prevMode => !prevMode)
    }
    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState)
    }
    const logout = () => {
        localStorage.clear()
        setUser(prevUser => ({
            ...prevUser,
            isSignedIn: false,
        }))
    }
    const isActive = pn => {
        if (pathname.endsWith('friendrequests')) {
            return pathname.startsWith(pn) && pn.endsWith('friendrequests')
        }
        return pathname.startsWith(pn)
    }

    const links = [
        {
            to: '/feed',
            imgSrc: 'https://cdn-icons-png.flaticon.com/128/14035/14035666.png',
        },
        {
            to: `/profile/${user.username}/friendrequests`,
            imgSrc: 'https://cdn-icons-png.flaticon.com/128/880/880441.png',
        },
        {
            to: '/profile',
            imgSrc: 'https://cdn-icons-png.flaticon.com/128/1177/1177568.png',
        },
        {
            to: null,
            imgSrc: 'https://cdn-icons-png.flaticon.com/128/4406/4406124.png',
        },
    ]

    return (
        <div className="top-section">
            <div className="inner-container">
                <img
                    src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                    alt="Facebook Icon"
                    className="icon"
                />
                <input
                    type="text"
                    placeholder="Search"
                    className="search-bar"
                />
                <div className="user-info">
                    <button className="search-button btn btn-info">
                        Search
                    </button>
                </div>
            </div>
            <div className="feedpages">
                {links.map((linkInfo, i) =>
                    linkInfo.to ? (
                        <Link key={i} to={linkInfo.to}>
                            <img
                                src={linkInfo.imgSrc}
                                alt=""
                                className={
                                    isActive(linkInfo.to) ? 'active' : ''
                                }
                            />
                        </Link>
                    ) : (
                        <a key={i} style={{ pointerEvents: 'none' }} href="/">
                            <img
                                src={linkInfo.imgSrc}
                                alt=""
                                className={
                                    isActive(linkInfo.to) ? 'active' : ''
                                }
                            />
                        </a>
                    ),
                )}
            </div>
            <div className="dark-mode-logout-dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    onClick={toggleDropdown}>
                    Menu
                </button>
                <ul
                    className={`dropdown-menu ${isDropdownOpen ? 'show' : ''} dropdown-menu-right`}
                    aria-labelledby="dropdownMenuButton">
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={toggleColorMode}>
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={logout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MenuTop
