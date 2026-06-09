import { apiRequest } from ".";

const endpoint = {
    visit: (linkId: string) => `/visit/${linkId}`,
}

export const visitLink = async (linkId: string) => await apiRequest<void>(endpoint.visit(linkId), "GET")