import './Profile.css'
import { Link } from 'react-router-dom'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { UserContent } from '../App/App.js'
import ProfileTopSection from './ProfileTopSection.js'
import React, { useContext } from 'react'

const Friends = () => {
    const { user, setUser } = useContext(UserContent)

    const handleRemoveFriend = friendUsername => {
        const updatedUser = { ...user }
        updatedUser.friends = user.friends.filter(
            friend => friend.username !== friendUsername,
        )
        setUser(updatedUser)
    }

    return (
        <div className="profile d-flex flex-column">
            <ProfileTopSection user={user} />

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
                    {user.friends.map(friend => (
                        <Col
                            key={friend.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            xl={3}>
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
