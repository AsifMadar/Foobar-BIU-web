import './MenuSideBar.css'
import { jwt } from '../utils/axios.js'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContent } from '../App/App.js'
import SideBarRow from './SideBarRow.js'

function MenuSideBar() {
    const { user, setUser } = useContext(UserContent)

    const logout = () => {
        jwt.set(null)
        setUser(prevUser => ({
            ...prevUser,
            isSignedIn: false,
        }))
    }

    return (
        <div className="menu-sidebar">
            <Link to="/profile">
                <SideBarRow
                    avatar
                    ImageLink={user.profileImage}
                    title={user.displayName}
                />
            </Link>
            <SideBarRow
                disabled
                ImageLink="https://cdn-icons-gif.flaticon.com/12198/12198847.gif"
                title="Messeges"
            />
            <Link to={`/profile/${user.username}/friendrequests`}>
                <SideBarRow
                    ImageLink="https://cdn-icons-gif.flaticon.com/10182/10182258.gif"
                    title="Friends"
                />
            </Link>
            <SideBarRow
                disabled
                ImageLink="https://cdn-icons-gif.flaticon.com/9822/9822027.gif"
                title="Groups"
            />
            <SideBarRow
                disabled
                ImageLink="https://cdn-icons-gif.flaticon.com/11095/11095493.gif"
                title="Marketplace"
            />
            <SideBarRow
                disabled
                ImageLink="https://cdn-icons-gif.flaticon.com/14193/14193998.gif"
                title="Memories"
            />
            <SideBarRow
                disabled
                ImageLink="https://cdn-icons-gif.flaticon.com/9818/9818054.gif"
                title="Events"
            />
            <SideBarRow
                ImageLink="https://cdn-icons-png.flaticon.com/128/1828/1828490.png"
                title="Log out"
                onClick={logout}
            />
            <div className="hr m-4">
                <div className="policies mt-3 d-flex flex-row flex-wrap">
                    <p>Privacy</p>
                    <p>.</p>
                    <p>Terms</p>
                    <p>.</p>
                    <p>Advertising</p>
                    <p>.</p>
                    <p>Ad choices</p>
                    <p>.</p>
                    <p>Cookies</p>
                    <p>.</p>
                    <p>more</p>
                    <p>.</p>
                    <p>FooBar 2024</p>
                </div>
            </div>
        </div>
    )
}

export default MenuSideBar
