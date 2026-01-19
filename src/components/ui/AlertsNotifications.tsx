'use client';

import React, { useState } from 'react';
import { AlertsNotificationsProps, AlertPriority } from '@/types/alerts';
import { Bell, Phone, Calendar, Lightbulb } from 'lucide-react';

/**
 * AlertsNotifications Component - EXACT DESIGN MATCH
 * 
 * BACKEND-READY: 
 * - All data comes via props (no hardcoding)
 * - Dynamic rendering with .map()
 * - TypeScript interfaces for type safety
 * - Production-ready architecture
 * 
 * DESIGN RULES:
 * - URGENT alerts: Blue border + Blue badge
 * - IMPORTANT alerts: Gray border + Black badge
 * - INFO alerts: Gray border + Light badge
 * - Full-width "View All Notifications" button at bottom
 */
const AlertsNotifications: React.FC<AlertsNotificationsProps> = ({ data }) => {
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(
    data.alerts.length > 0 ? data.alerts[0].id : null
  );

  // Priority-based styling
  const getPriorityStyles = (priority: AlertPriority) => {
    const styles = {
      high: {
        container: 'bg-white hover:border-2 hover:border-blue-900 transition-all duration-300',
        badge: 'bg-blue-100 text-blue-600 border border-blue-300',
        badgeLabel: 'URGENT',
      },
      medium: {
        container: 'bg-white hover:border-2 hover:border-blue-900 transition-all duration-300',
        badge: 'bg-gray-100 text-gray-800 border border-gray-300',
        badgeLabel: 'IMPORTANT',
      },
      low: {
        container: 'bg-white hover:border-2 hover:border-blue-900 transition-all duration-300',
        badge: 'bg-gray-100 text-gray-600 border border-gray-300',
        badgeLabel: 'INFO',
      },
    };
    return styles[priority];
  };

  // Icon selector based on priority
  const getAlertIcon = (priority: AlertPriority) => {
    const iconProps = { size: 24 };
    switch (priority) {
      case 'high':
        return <Phone {...iconProps} className="text-blue-500" />;
      case 'medium':
        return <Calendar {...iconProps} className="text-gray-500" />;
      case 'low':
        return <Lightbulb {...iconProps} className="text-blue-500" />;
      default:
        return <Bell {...iconProps} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-3">
          {/* Bell Icon in outlined square */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center">
            <Bell size={20} className="text-gray-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Alerts & Notifications</h2>
            <p className="text-sm text-gray-600">Important updates</p>
          </div>
        </div>

        {/* Count Badge */}
        {data.unreadCount > 0 && (
          <span className="bg-white border-2 border-gray-300 text-gray-800 text-sm font-bold px-3 py-1 rounded-full">
            {data.unreadCount} New
          </span>
        )}
      </div>

      {/* Alerts List */}
      <div className="space-y-3 mb-5 max-h-96 overflow-y-auto scrollbar-hide">
        {data.alerts.map((alert) => {
          const isSelected = selectedAlertId === alert.id;
          const priorityStyles = getPriorityStyles(alert.priority);

          return (
            <div
              key={alert.id}
              onClick={() => setSelectedAlertId(alert.id)}
              className={`${priorityStyles.container} rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg`}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  {getAlertIcon(alert.priority)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{alert.title}</h3>
                  <p className="text-gray-700 text-sm mb-2 line-clamp-2">{alert.message}</p>
                  <p className="text-xs text-gray-600 mb-3">From: {alert.from}</p>

                  {/* Footer: Badge + Time */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`${priorityStyles.badge} text-xs font-semibold px-3 py-1 rounded-full border`}>
                      {priorityStyles.badgeLabel}
                    </span>
                    <span className="text-xs text-gray-600">{alert.time}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
        View All Notifications
      </button>
    </div>
  );
};

export default AlertsNotifications;
