import './SideBarRow.css'
import PropTypes from 'prop-types'
import React from 'react'

function SideBarRow({ disabled, ImageLink, title, avatar, onClick }) {
    return (
        <div
            className={'sideBarRow' + (disabled ? ' disabled' : '')}
            onClick={onClick ?? (() => {})}>
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
