import './FriendRequests.css'
import { UserContent } from '../App/App.js'
import React, { useContext } from 'react'
import MenuSideBar from '../MenuSideBar/MenuSideBar.js'

const FriendRequests = () => {
    const { user, setUser } = useContext(UserContent)

    const handleAddFriend = friendUsername => {
        // Update user's friends list
        const updatedUser = { ...user }
        updatedUser.friends.push({
            username: friendUsername,
            name: friendUsername,
        })
        setUser(updatedUser)

        // Remove friend from friend requests
        updatedUser.friendRequests = user.friendRequests.filter(
            request => request.username !== friendUsername,
        )
        setUser(updatedUser)
    }

    const handleRejectFriend = friendUsername => {
        // Update user's friend requests list
        const updatedUser = { ...user }
        updatedUser.friendRequests = user.friendRequests.filter(
            request => request.username !== friendUsername,
        )
        setUser(updatedUser)
    }

    return (
        <div className="friend-requests-container">
            <MenuSideBar />
            <div className="container">
                <h4>Friend Requests</h4>
                {user.friendRequests.map(request => (
                    <div
                        key={request.id}
                        className="col col-md-6 d-flex align-items-center justify-content-between p-3 shadow mb-3">
                        <span>{request.username}</span>
                        <div>
                            <button
                                className="btn btn-success"
                                onClick={() =>
                                    handleAddFriend(request.username)
                                }>
                                Add
                            </button>{' '}
                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    handleRejectFriend(request.username)
                                }>
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FriendRequests
