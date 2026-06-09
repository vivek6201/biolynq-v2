import { API_URL, apiRequestServer } from "."
import { LinkStatsResponse, OverviewResponse, DemographicsResponse } from "../types/analytics"

const endpoint = {
    overview: `${API_URL}/analytics/overview`,
    linkStats: `${API_URL}/analytics/links`,
    analyticsBreakdown: `${API_URL}/analytics/breakdown`,
}

export const getOverview = (headers?: Record<string, string>) => 
    apiRequestServer<OverviewResponse>(endpoint.overview, "GET", undefined, undefined, headers)

export const getLinkStats = (headers?: Record<string, string>) => 
    apiRequestServer<LinkStatsResponse[]>(endpoint.linkStats, "GET", undefined, undefined, headers)

export const getDemographics = (headers?: Record<string, string>) => 
    apiRequestServer<DemographicsResponse>(endpoint.analyticsBreakdown, "GET", undefined, undefined, headers)
