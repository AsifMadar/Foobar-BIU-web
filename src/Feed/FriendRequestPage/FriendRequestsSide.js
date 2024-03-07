import '../MenuSide.css'
import { Link } from 'react-router-dom'
import { UserContent } from '../../App/App.js'
import React from 'react'
import SideBarRow from '../SideBarRow.js'

function FriendsRequestSide() {
    const { user } = React.useContext(UserContent)

    return (
        <div className="menuside">
            <Link to="/profile">
                <SideBarRow
                    avatar
                    ImageLink={user.profileImage}
                    title={user.displayName}
                />
            </Link>
            <Link to="/feed">
                <SideBarRow
                    ImageLink="https://cdn-icons-gif.flaticon.com/12198/12198847.gif"
                    title="Home"
                />
            </Link>
            <SideBarRow
                ImageLink="https://cdn-icons-gif.flaticon.com/10182/10182258.gif"
                title="See Friends"
            />
            <SideBarRow
                ImageLink="https://cdn-icons-gif.flaticon.com/9822/9822027.gif"
                title="Community"
            />
            <SideBarRow
                ImageLink="https://cdn-icons-gif.flaticon.com/11095/11095493.gif"
                title="See More"
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

export default FriendsRequestSide
