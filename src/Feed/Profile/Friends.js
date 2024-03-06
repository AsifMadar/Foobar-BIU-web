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
    const [selectedLink, setSelectedLink] = useState('')

    const handleLinkClick = link => {
        setSelectedLink(link)
    }

    useEffect(() => {
        // Fetch bio from database or any other source
        // For demonstration, setting a dummy bio
        setBio('This is a sample bio')
        setBioPresent(true)
    }, [])

    const addBio = () => {
        // Handle adding bio functionality
    }

    // Sample friends data
    const friends = [
        { id: 1, name: 'Friend 1' },
        { id: 2, name: 'Friend 2' },
        { id: 3, name: 'Friend 3' },
        // Add more friends as needed
    ]

    return (
        <div className="profile">
            <ProfileTopSection
                user={user}
                bio={bio}
                bioPresent={bioPresent}
                addBio={addBio}
                handleLinkClick={handleLinkClick}
                selectedLink={selectedLink}
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
                        <Col key={friend.id} xs={6} sm={6} md={4} lg={3} xl={2}>
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
