import './MenuSide.css'
import { jwt } from '../utils/axios.js'
import { useNavigate } from 'react-router-dom'
import { UserContent } from '../App/App.js'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import SideBarRow from './SideBarRow.js'

function MenuSide() {
    const { user, setUser } = useContext(UserContent)
    const navigate = useNavigate()

    const logout = () => {
        jwt.set(null)
        setUser(prevUser => ({
            ...prevUser,
            isSignedIn: false,
        }))
        navigate('/signin')
    }
    return (
        <div className="menuside">
            <SideBarRow
                avatar
                ImageLink={user.profileImage}
                title={user.displayName}
            />
            <SideBarRow
                ImageLink="https://cdn-icons-gif.flaticon.com/12198/12198847.gif"
                title="Messeges"
            />

            <SideBarRow
                ImageLink="https://cdn-icons-gif.flaticon.com/10182/10182258.gif"
                title="Find Friends"
            />
            <SideBarRow
                ImageLink="https://cdn-icons-gif.flaticon.com/9822/9822027.gif"
                title="Groups"
            />
            <SideBarRow
                ImageLink="https://cdn-icons-gif.flaticon.com/11095/11095493.gif"
                title="Marketplace"
            />
            <SideBarRow
                ImageLink="https://cdn-icons-gif.flaticon.com/14193/14193998.gif"
                title="Memories"
            />
            <SideBarRow
                ImageLink="https://cdn-icons-gif.flaticon.com/9818/9818054.gif"
                title="Events"
            />
            <SideBarRow
                ImageLink="https://cdn-icons-png.flaticon.com/128/1828/1828490.png"
                title="Log out"
                onClick={logout}
            />
            <div className="hr">
                <div className="policies">
                    <p>Privacy</p>
                    <p className="dot">.</p>
                    <p>Terms</p>
                    <p className="dot">.</p>
                    <p>Advertising</p>
                    <p className="dot">.</p>
                    <p>Ad choices</p>
                    <i className="ads" />
                    <p className="dot">.</p>
                    <p>Cookies</p>
                    <p className="dot">.</p>
                    <p>more</p>
                    <p className="dot">.</p>
                    <p>FooBar 2024</p>
                    <p className="dot">.</p>
                </div>
            </div>
        </div>
    )
}
MenuSide.propTypes = {
    user: PropTypes.shape({
        img: PropTypes.string,
        username: PropTypes.string.isRequired,
        // Add other properties of the user object as needed
    }).isRequired,
}

export default MenuSide
