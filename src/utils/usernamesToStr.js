/** @typedef {import('../data/posts.json').User} User */

/**
 * Converts a list of users to a string listing the respective display names
 * @param {User[]} users
 * @param {User} [currentUser] If provided, instances of `currentUser` in the list will be replaced with 'You'
 */
export function usernamesToStr(users, currentUser) {
    const names = users.map(user =>
        currentUser && user.username === currentUser.username
            ? 'You'
            : user.displayName,
    )

    if (names.length === 0) return ''
    if (names.length === 1) return names[0]
    if (names.length === 2) return names[0] + ' and ' + names.at(-1)

    return names.slice(0, -1).join(', ') + ', and ' + names.at(-1)
}
