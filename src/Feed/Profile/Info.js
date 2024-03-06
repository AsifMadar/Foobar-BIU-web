import React from 'react'
import { useParams } from 'react-router'
const Info = () => {
    console.log(useParams())
    return (
        <div className="profileInfo">
            <h4>Info</h4>
        </div>
    )
}
export default Info
