/**
 * Student Engagement Trends Data Types
 * Backend-ready structure for engagement metrics
 */

export interface EngagementMetric {
  label: string;
  value: number; // percentage (0-100)
}

export interface EngagementChartData {
  month: string;
  engagement: number; // 0-100
}

export interface EngagementTrendsData {
  weekly: {
    average: number;
    peak: number;
    growth: number;
    chartData: EngagementChartData[];
  };
  monthly: {
    average: number;
    peak: number;
    growth: number;
    chartData: EngagementChartData[];
  };
}

export interface StudentEngagementTrendsProps {
  data: EngagementTrendsData;
}
