import { fireEvent, render, screen } from '@testing-library/react'
import Comment from './Comment'

/* eslint-disable testing-library/no-container, testing-library/no-node-access */

const dummyCommentDetails = {
    author: {
        displayName: 'Eliyah Alias',
        profileImage: '/sampleImages/user2.jpg',
        username: 'alias.el',
    },
    contents: 'Hi & welcome! Do you feel like meeting tomorrow?',
    likes: [
        {
            displayName: 'Georg C.',
            profileImage: '/sampleImages/user1.jpg',
            username: 'gcantor',
        },
    ],
    timestamp: 1707404921000,
}

const currentUser = {
    displayName: 'Test User',
    profileImage: '/sampleImages/user3.jpg',
    username: 'testuser',
}

test('Displays the correct data', () => {
    const { container } = render(
        <Comment
            currentUser={currentUser}
            updateDetails={() => {}}
            details={dummyCommentDetails}
            editImmediately={false}
            editFailed={() => {}}
        />,
    )

    const de = dummyCommentDetails
    const author = de.author

    expect(screen.getByText(new RegExp(author.displayName))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(de.contents))).toBeInTheDocument()
    expect(screen.getByText(/8\/2\/2024 17:08/)).toBeInTheDocument()
    // eslint-disable-next-line
    expect(container.querySelector('.comment-likes').textContent).toEqual('1')
})

test('Updates likes count on like', () => {
    let likesCount = 0
    function updateDetails(newComment) {
        if (newComment) likesCount = newComment.likes.length
    }

    const { container } = render(
        <Comment
            currentUser={currentUser}
            updateDetails={updateDetails}
            details={dummyCommentDetails}
            editImmediately={false}
            editFailed={() => {}}
        />,
    )

    window.structuredClone = val => JSON.parse(JSON.stringify(val))

    const likeButton = container.querySelector('.comment-likes button')
    fireEvent.click(likeButton)
    expect(likesCount).toBe(2)
})
