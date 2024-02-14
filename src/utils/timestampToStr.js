/**
 * Converts numeric timestamps to pretty-printed strings (e.g. 23/4/2015 10:50)
 * @param {number} timestamp
 */
export function timestampToStr(timestamp) {
    const date = new Date(timestamp)
    return (
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes().toString().padStart(2, '0')
    )
}
