import { API_URL, apiRequest } from ".";
import { UserProfileResponse, UserResponse } from "../types/users";

const endpoint = {
    me: `${API_URL}/users/`,
    profile: `${API_URL}/users/profile`,
    publicProfile: (username: string) => `${API_URL}/public/${username}`
}

export const getUser = () => apiRequest<UserResponse>(endpoint.me, "GET")

export const getProfile = () => apiRequest<UserProfileResponse>(endpoint.profile, "GET")

export const getPublicProfile = (username: string) => apiRequest<UserProfileResponse>(endpoint.publicProfile(username), "GET")