import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { UserContent } from '../../App/App.js'
import ProfileTopSection from './ProfileTopSection.js'
import { Link } from 'react-router-dom'
import './Profile.css'

const Friends = () => {
    const { user, setUser } = useContext(UserContent)
    const [bio, setBio] = useState('')
    const [bioPresent, setBioPresent] = useState(false)
    const [friends, setFriends] = useState([]) // Initialize friends as an empty array

    useEffect(() => {
        // Fetch bio from database or any other source
        // For demonstration, setting a dummy bio
        setBio('This is a sample bio')
        setBioPresent(true)

        // Set friends from user context
        setFriends(user.friends || [])
    }, [user]) // Update friends when user context changes

    const addBio = () => {
        // Handle adding bio functionality
    }

    const handleRemoveFriend = friendUsername => {
        const updatedUser = { ...user }
        updatedUser.friends = user.friends.filter(
            friend => friend.username !== friendUsername,
        )
        setUser(updatedUser)
    }
    return (
        <div className="profile">
            <ProfileTopSection
                user={user}
                bio={bio}
                bioPresent={bioPresent}
                addBio={addBio}
            />

            <Container className="shadow">
                <Row>
                    <Col xs={9}>
                        <h3>Friends</h3>
                    </Col>
                    <Col xs={3} className="text-right">
                        <Link to="/friendsrequest">Friend Requests</Link>
                    </Col>
                </Row>
                <Row>
                    {friends.map(friend => (
                        <Col
                            key={friend.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            xl={3}>
                            {/* Display friend details with shadow and padding */}
                            <div className="friend-item shadow p-3 mb-4 bg-white rounded d-flex align-items-center justify-content-between">
                                <div className="friend-name">{friend.name}</div>
                                <Button
                                    variant="outline-danger"
                                    onClick={() =>
                                        handleRemoveFriend(friend.username)
                                    }>
                                    Remove
                                </Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Friends
