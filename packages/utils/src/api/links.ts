import { API_URL, apiRequest } from ".";
import { LinkResponse } from "../types/links";

const endpoint = {
    links: `${API_URL}/links/`,
    link: (linkId: string) => `${API_URL}/links/${linkId}`,
    visit: (linkId: string) => `${API_URL}/visit/${linkId}`,
    shortLink: (linkId: string) => `${API_URL}/short/${linkId}`
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

export const createShortLink = (linkId: string, slug?: string) => 
    apiRequest<{ short_url: string; slug: string }>(endpoint.shortLink(linkId), "POST", { slug })

export const updateShortLink = (linkId: string, oldSlug: string, newSlug: string) => 
    apiRequest<{ short_url: string; slug: string }>(`${endpoint.shortLink(linkId)}/${oldSlug}`, "PUT", { slug: newSlug })

export const deleteShortLink = (linkId: string, slug: string) => 
    apiRequest<void>(`${endpoint.shortLink(linkId)}/${slug}`, "DELETE")

export const checkShortLinkSlug = (slug: string) => 
    apiRequest<void>(`${API_URL}/short/check-slug`, "POST", { slug })