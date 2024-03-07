import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { UserContent } from '../../App/App.js'
import ProfileTopSection from './ProfileTopSection.js'
import { Link } from 'react-router-dom'
import './Profile.css'

const Friends = () => {
    const { user } = useContext(UserContent)
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

    return (
        <div className="profile">
            <ProfileTopSection
                user={user}
                bio={bio}
                bioPresent={bioPresent}
                addBio={addBio}
            />

            <Container className="friends-grid-container">
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
                            lg={4}
                            xl={4}>
                            {/* Display friend details with padding */}
                            <div className="friend-item">{friend.name}</div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Friends
