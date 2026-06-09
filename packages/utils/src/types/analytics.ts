export interface TimeSeriesData {
    date: string
    count: number
}

export interface OverviewResponse {
    views: number
    clicks: number
    ctr: number
    unique_visitors: number
    clicks_over_time: TimeSeriesData[]
    views_over_time: TimeSeriesData[]
}

export interface LinkStatsResponse {
    id: string
    title: string
    url: string
    is_social: boolean
    is_active: boolean
    position: number
    total_clicks: number
    ctr: number
}

export interface GroupedStat {
    name: string
    count: number
}

export interface DemographicsResponse {
    devices: GroupedStat[]
    browsers: GroupedStat[]
    os: GroupedStat[]
    referrers: GroupedStat[]
    countries: GroupedStat[]
    cities: GroupedStat[]
}