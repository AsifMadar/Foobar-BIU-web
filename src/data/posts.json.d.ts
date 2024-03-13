export interface User {
    displayName: string
    friends?: string[]
    profileImage: string
    username: string
}

export interface CurrentUser extends User {
    friendRequests: string[]
    friends: string[]
    isSignedIn: boolean
    jwtToken: string
}

export interface Comment {
    author: User
    contents: string
    likes: User[]
    timestamp: number
}

export interface Post {
    id: string
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
