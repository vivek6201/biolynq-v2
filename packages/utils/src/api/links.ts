import { API_URL, apiRequest } from ".";
import { LinkResponse } from "../types/links";

const endpoint = {
    links: `${API_URL}/links/`,
    link: (linkId: string) => `${API_URL}/links/${linkId}`,
    visit: (linkId: string) => `${API_URL}/visit/${linkId}`,
}

export const visitLink = async (linkId: string) => 
    await apiRequest<void>(endpoint.visit(linkId), "GET")

export const getAllLinks = () => 
    apiRequest<LinkResponse[]>(endpoint.links, "GET")

export const getLinkById = (linkId: string) => 
    apiRequest<LinkResponse>(endpoint.link(linkId), "GET")

export const updateLink = (linkId: string, data: Partial<LinkResponse>) => 
    apiRequest<void>(endpoint.link(linkId), "PUT", data)

export const createLink = (data: Partial<LinkResponse>) => 
    apiRequest<LinkResponse>(endpoint.links, "POST", data)

export const deleteLink = (linkId: string) => 
    apiRequest<void>(endpoint.link(linkId), "DELETE")