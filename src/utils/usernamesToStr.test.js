import { usernamesToStr } from './usernamesToStr.js'

const users = [
    {
        displayName: 'David',
        profileImage: '/sampleImages/user5.jpg',
        username: 'davidR',
    },
    {
        displayName: 'Eliyah Alias',
        profileImage: '/sampleImages/user2.jpg',
        username: 'alias.el',
    },
    {
        displayName: 'FooBar Official',
        profileImage: '/favicon.png',
        username: 'foobar',
    },
    {
        displayName: '',
        profileImage: '/sampleImages/user6.jpg',
        username: 'test',
    },
    {
        displayName: 'John G.',
        profileImage: '/sampleImages/user6.jpg',
        username: 'geljohn',
    },
]

test('Correctly builds the string', () => {
    expect(usernamesToStr(users, users[2])).toBe(
        'David, Eliyah Alias, You, , and John G.',
    )
    expect(usernamesToStr(users, users[3])).toBe(
        'David, Eliyah Alias, FooBar Official, You, and John G.',
    )
    users.splice(3, 1)
    expect(usernamesToStr(users, users[3])).toBe(
        'David, Eliyah Alias, FooBar Official, and You',
    )
})
