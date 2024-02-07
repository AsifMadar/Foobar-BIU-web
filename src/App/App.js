import './App.css'
import { useState } from 'react'
import PostList from '../PostList/PostList.js'

function App() {
    const [currentUser] = useState({
        displayName: 'Test User',
        imageURL: '/favicon.png',
        username: 'testuser',
    })

    return (
        <div className="App">
            <PostList currentUser={currentUser} />
        </div>
    )
}

export default App
