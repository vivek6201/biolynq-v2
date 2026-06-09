import { apiRequest } from ".";
import { LinkResponse } from "../types/links";

const endpoint = {
    link: "/links/",
    visit: (linkId: string) => `/visit/${linkId}`,
}

export const visitLink = async (linkId: string) => await apiRequest<void>(endpoint.visit(linkId), "GET")

export const getAllLinks = async () => apiRequest<LinkResponse[]>(endpoint.link, "GET")

export const getLinkById = async (linkId: string) => apiRequest<LinkResponse>(endpoint.link + linkId, "GET")

export const updateLink = async (linkId: string, data: LinkResponse) => apiRequest<void>(endpoint.link + linkId, "PUT", data)

export const createLink = async (data: Partial<LinkResponse>) => apiRequest<LinkResponse>(endpoint.link, "POST", data)

export const deleteLink = async (linkId: string) => apiRequest<void>(endpoint.link + linkId, "DELETE")