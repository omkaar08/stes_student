/**
 * Mock Student Engagement Trends Data
 * Backend-ready structure demonstration
 */

import { EngagementTrendsData } from '@/types/engagement';

export const mockEngagementTrendsData: EngagementTrendsData = {
  weekly: {
    average: 83,
    peak: 95,
    growth: 30,
    chartData: [
      { month: 'SEPT', engagement: 72 },
      { month: 'SEPT', engagement: 78 },
      { month: 'SEPT', engagement: 80 },
      { month: 'OCT', engagement: 85 },
      { month: 'OCT', engagement: 90 },
      { month: 'OCT', engagement: 88 },
      { month: 'NOV', engagement: 92 },
      { month: 'NOV', engagement: 95 },
    ],
  },
  monthly: {
    average: 82,
    peak: 92,
    growth: 28,
    chartData: [
      { month: 'SEPT', engagement: 75 },
      { month: 'OCT', engagement: 88 },
      { month: 'NOV', engagement: 91 },
      { month: 'DEC', engagement: 85 },
      { month: 'JAN', engagement: 90 },
      { month: 'FEB', engagement: 87 },
      { month: 'MAR', engagement: 93 },
      { month: 'APR', engagement: 96 },
    ],
  },
};
