import './App.css'
import { useState } from 'react'
import PostList from '../PostList/PostList.js'

function App() {
    const [currentUser] = useState({
        displayName: 'Georg C.',
        imageURL: '/sampleImages/user1.jpg',
        username: 'gcantor',
    })

    return (
        <div className="App">
            <PostList currentUser={currentUser} />
        </div>
    )
}

export default App
