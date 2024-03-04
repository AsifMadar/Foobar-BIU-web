/** @typedef {import('../data/posts.json').User} User */

/**
 * Converts a list of string to a string listing the respective terms
 * @param {string[]} terms
 * @example listToStr(['a', 'b', 'c', 'd']) // 'a, b, c, and d'
 */
export function listToStr(terms) {
    if (terms.length === 0) return ''
    if (terms.length === 1) return terms[0]

    return terms.slice(0, -1).join(', ') + ', and ' + terms.at(-1)
}
