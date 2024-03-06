import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import './FriendsRequest.css' // Import CSS file for custom styling

const FriendsRequest = () => {
    // Sample data for friend requests
    const friendRequests = [
        { id: 1, username: 'Friend 1' },
        { id: 2, username: 'Friend 2' },
        // Add more friend requests as needed
    ]

    const handleAddFriend = friendId => {
        // Logic to handle adding friend
        console.log(`Added friend with ID: ${friendId}`)
    }

    const handleRejectFriend = friendId => {
        // Logic to handle rejecting friend
        console.log(`Rejected friend with ID: ${friendId}`)
    }

    return (
        <Container className="friends-request-container">
            {' '}
            {/* Add custom class to the Container */}
            <h4>Friend Requests</h4>
            <Row>
                {friendRequests.map(request => (
                    <Col
                        key={request.id}
                        xs={12}
                        md={6}
                        lg={4}
                        className="mb-3">
                        <div className="friend-request-item d-flex align-items-center justify-content-between p-3 shadow">
                            <span>{request.username}</span>
                            <div>
                                <Button
                                    variant="success"
                                    onClick={() => handleAddFriend(request.id)}>
                                    Add
                                </Button>{' '}
                                <Button
                                    variant="danger"
                                    onClick={() =>
                                        handleRejectFriend(request.id)
                                    }>
                                    Reject
                                </Button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default FriendsRequest
