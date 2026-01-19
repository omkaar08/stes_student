/**
 * Alert Type Definitions (Backend-Ready)
 * These interfaces define the structure for alerts coming from the backend
 */

/**
 * Priority levels for alerts
 * - high: Urgent alerts (URGENT badge, red styling)
 * - medium: Important alerts (IMPORTANT badge, orange styling)
 * - low: Info alerts (INFO badge, blue styling)
 */
export type AlertPriority = 'high' | 'medium' | 'low';

/**
 * Main Alert interface - represents a single alert
 * All fields are backend-provided (no hardcoding in component)
 */
export interface Alert {
  id: string; // Unique identifier
  title: string; // Alert title (from backend)
  message: string; // Alert message/description (from backend)
  from?: string; // Source of alert (optional, from backend)
  time: string; // Timestamp (from backend)
  priority: AlertPriority; // Priority level
  isNew: boolean; // Whether this is a new alert
  iconType?: string; // Icon type identifier (optional)
}

/**
 * Alerts data container
 * Wraps alert array with metadata
 */
export interface AlertsData {
  alerts: Alert[];
  unreadCount: number; // Total count of new/unread alerts
}

/**
 * Component Props for AlertsNotifications
 * Accepts data from parent/backend
 */
export interface AlertsNotificationsProps {
  data: AlertsData;
}
