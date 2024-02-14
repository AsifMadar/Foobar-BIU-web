import React from 'react'
import PropTypes from 'prop-types'
import './SideBarRow.css'

function SideBarRow({ ImageLink, title, avatar, onClick }) {
    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }
    return (
        <div className="sideBarRow" onClick={handleClick}>
            <img src={ImageLink} alt="" className={avatar ? 'avatar' : ''} />
            <h2>{title}</h2>
        </div>
    )
}

SideBarRow.propTypes = {
    ImageLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dropdown: PropTypes.bool,
    avatar: PropTypes.bool,
    onClick: PropTypes.func,
}

export default SideBarRow
