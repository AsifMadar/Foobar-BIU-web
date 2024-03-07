import React, { useContext } from 'react'
import { UserContent } from '../../App/App.js'
import { Button, Container, Row, Col } from 'react-bootstrap'
import './FriendsRequest.css' // Import CSS file for custom styling
import FriendsRequestSide from './FriendRequestsSide.js'

const FriendsRequest = () => {
    const { user, setUser } = useContext(UserContent)

    const handleAddFriend = friendUsername => {
        // Logic to handle adding friend
        console.log(`Added friend with username: ${friendUsername}`)

        // Update user's friends list
        const updatedUser = { ...user }
        updatedUser.friends = [
            ...updatedUser.friends,
            { username: friendUsername, name: friendUsername },
        ]
        setUser(updatedUser)

        // Remove friend from friend requests
        updatedUser.friendRequests = user.friendRequests.filter(
            request => request.username !== friendUsername,
        )
        setUser(updatedUser)
    }

    const handleRejectFriend = friendUsername => {
        // Logic to handle rejecting friend request

        // Update user's friend requests list
        const updatedUser = { ...user }
        updatedUser.friendRequests = user.friendRequests.filter(
            request => request.username !== friendUsername,
        )
        setUser(updatedUser)
    }

    return (
        <div className="friends-request-container">
            <FriendsRequestSide />
            <Container className="friend-requests-grid">
                <h4>Friend Requests</h4>
                <Row>
                    {user.friendRequests.map(request => (
                        <Col key={request.id} xs={12} md={6}>
                            <div className="friend-request-item d-flex align-items-center justify-content-between p-3 shadow mb-3">
                                <span>{request.username}</span>
                                <div>
                                    <Button
                                        variant="success"
                                        onClick={() =>
                                            handleAddFriend(request.username)
                                        }>
                                        Add
                                    </Button>{' '}
                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            handleRejectFriend(request.username)
                                        }>
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default FriendsRequest
