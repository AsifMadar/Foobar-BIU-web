import { fireEvent, render, screen } from '@testing-library/react'
import Post from './Post'

const dummyPostDetails = {
    author: {
        displayName: 'David',
        profileImage: '/sampleImages/user5.jpg',
        username: 'davidR',
    },
    comments: [],
    contents:
        'Just created my account, hope this new social platform will be fun.',
    images: [],
    likes: [
        {
            displayName: 'Eliyah Alias',
            profileImage: '/sampleImages/user2.jpg',
            username: 'alias.el',
        },
    ],
    shares: [],
    timestamp: 1707126738000,
}

const currentUser = {
    displayName: 'Test User',
    profileImage: '/sampleImages/user3.jpg',
    username: 'testuser',
}

test('Displays the correct data', () => {
    const { container } = render(
        <Post
            currentUser={currentUser}
            updateDetails={() => {}}
            details={dummyPostDetails}
            editRequested={() => {}}
        />,
    )

    const de = dummyPostDetails
    const author = de.author

    expect(screen.getByText(new RegExp(author.displayName))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(de.contents))).toBeInTheDocument()
    expect(screen.getByText(/5\/2\/2024 11:52/)).toBeInTheDocument()
    // eslint-disable-next-line
    expect(container.querySelector('.likes-count span').textContent).toEqual('1')
})

test('Updates likes count on like', () => {
    let likesCount = 0
    function updateDetails(newPost) {
        if (newPost) likesCount = newPost.likes.length
    }

    render(
        <Post
            currentUser={currentUser}
            updateDetails={updateDetails}
            details={dummyPostDetails}
            editRequested={() => {}}
        />,
    )

    window.structuredClone = val => JSON.parse(JSON.stringify(val))

    const likeButton = screen.getByText(/Like/)
    fireEvent.click(likeButton)
    expect(likesCount).toBe(2)
})
