export interface User {
    displayName: string
    profileImage: string
    username: string
}

export interface Comment {
    author: User
    contents: string
    likes: User[]
    timestamp: number
}

export interface Post {
    author: User
    comments: Comment[]
    contents: string
    images: string[]
    likes: User[]
    shares: User[]
    timestamp: number
}

type PostList = Post[]
export default PostList
