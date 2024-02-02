// App.js
import React from 'react'
import UserFeed from '../FeedScreen/UserFeed.js'
import './App.css'

const App = () => {
    const user = 'YourUsername' // Replace with the actual username
    const initialPosts = [] // You can initialize this with some posts if needed

    return (
        <div className="app">
            <UserFeed user={user} initialPosts={initialPosts} />
        </div>
    )
}

export default App
