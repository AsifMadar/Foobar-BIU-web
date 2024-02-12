import './App.css'
import { useState } from 'react'
import PostList from '../PostList/PostList.js'

function App() {
    const [currentUser] = useState({
        displayName: 'Georg C.',
        imageURL: '/favicon.png',
        username: 'gcantor',
    })

    return (
        <div className="App">
            <PostList currentUser={currentUser} />
        </div>
    )
}

export default App
