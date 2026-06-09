import { API_URL, apiRequest } from "."
import { LinkStatsResponse, OverviewResponse, DemographicsResponse } from "../types/analytics"

const endpoint = {
    overview: `${API_URL}/analytics/overview`,
    linkStats: `${API_URL}/analytics/links`,
    analyticsBreakdown: `${API_URL}/analytics/breakdown`,
}

export const getOverview = () => 
    apiRequest<OverviewResponse>(endpoint.overview, "GET")

export const getLinkStats = () => 
    apiRequest<LinkStatsResponse[]>(endpoint.linkStats, "GET")

export const getDemographics = () => 
    apiRequest<DemographicsResponse>(endpoint.analyticsBreakdown, "GET")
