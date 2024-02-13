// MenuTop.js
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './MenuTop.css'
import PropTypes from 'prop-types'

function MenuTop({ user }) {
    return (
        <div className="top-section">
            <img
                src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                alt="Facebook Icon"
                className="icon"
            />
            <input type="text" placeholder="Search" className="search-bar" />
            <div className="user-info">
                <button className="search-button"> Search</button>
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
        </div>
    )
}
MenuTop.propTypes = {
    user: PropTypes.object.isRequired,
}
export default MenuTop
