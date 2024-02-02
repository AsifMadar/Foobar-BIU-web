/**
 * Convert a list of usernames to a string listing the respective display names
 * @param {string[]} names
 * @param {{[username: string]: { displayName: string }}} users
 * @param {string} [currentUsername] If provided, instances of `currentUsername` in the list will be replaced with 'You'
 */
export function usernamesToStr(names, users, currentUsername) {
    names = names.map(username =>
        currentUsername && username === currentUsername
            ? 'You'
            : users[username].displayName ?? username,
    )

    if (names.length === 0) return ''
    if (names.length === 1) return names[0]
    if (names.length === 2) return names[0] + ' and ' + names.at(-1)

    return names.slice(0, -1).join(', ') + ', and ' + names.at(-1)
}
