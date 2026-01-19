/**
 * Mock Alert Data Structure (For Development Only)
 * IMPORTANT: Component receives this data via props (not hardcoded inside)
 * Backend will replace this with real API data
 */

import { AlertsData } from '@/types/alerts';

/**
 * Example mock alerts structure
 * This demonstrates the expected backend response format
 * Component will NOT use this data directly - it receives via props
 */
export const mockAlertsData: AlertsData = {
  unreadCount: 4,
  alerts: [
    {
      id: 'alert-1',
      title: 'Emergency Faculty Meeting',
      message: 'All faculty members are required to attend the emergency meeting scheduled for today at 4:00 PM in Conference Hall A.',
      from: 'Dean of Academics',
      time: '10 mins ago',
      priority: 'high',
      isNew: true,
    },
    {
      id: 'alert-2',
      title: 'Guest Lecture - Machine Learning',
      message: 'Dr Rajesh Kumar from IIT Delhi will deliver a guest lecture on Advanced Machine Learning on Jan 18, 2026 at 2:00 PM.',
      from: 'HOD - Computer Science',
      time: '1 hour ago',
      priority: 'medium',
      isNew: true,
    },
    {
      id: 'alert-3',
      title: 'Exam Schedule Update',
      message: 'The final exam schedule has been updated. Please check the academic portal for the revised timetable.',
      from: 'Examination Department',
      time: '2 hours ago',
      priority: 'medium',
      isNew: true,
    },
    {
      id: 'alert-4',
      title: 'Research Grant Applications Open',
      message: 'Applications for research grants are now open. Submit your proposals by Jan 25, 2026.',
      from: 'Research & Development Cell',
      time: '5 hours ago',
      priority: 'low',
      isNew: false,
    },
  ],
};
