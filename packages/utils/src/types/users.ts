import { LinkResponse } from "./links"

export interface UserResponse {
    id: string
    email: string
    created_at: string
    updated_at: string
}

export interface UserProfileResponse {
    id: string
    username: string
    display_name: string
    bio: string
    avatar_url: string
    is_public: boolean
    links?: LinkResponse[]
    created_at: string
    updated_at: string
}