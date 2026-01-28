import React from 'react';
// Local types to keep this legacy component type-safe
type AlertType = 'urgent' | 'important' | 'info';

type Alert = {
  id: string;
  title: string;
  description: string;
  type: AlertType;
  timestamp: string;
  isNew: boolean;
  icon: React.ReactNode | null;
};

type AlertsPanelProps = {
  data: {
    alerts: Alert[];
    newCount: number;
  };
};

const AlertsPanel: React.FC<AlertsPanelProps> = ({ data }) => {
  const getAlertStyles = (type: AlertType) => {
    const styles = {
      urgent: {
            bg: 'bg-primary-50',
            border: 'border-primary-200',
            tag: 'bg-primary-100 text-primary-700',
            icon: 'text-primary-500',
      },
      important: {
            bg: 'bg-primary-50',
            border: 'border-primary-200',
            tag: 'bg-primary-100 text-primary-700',
            icon: 'text-primary-500',
      },
      info: {
            bg: 'bg-primary-50',
            border: 'border-primary-200',
            tag: 'bg-primary-100 text-primary-700',
            icon: 'text-primary-500',
      },
    };
    return styles[type];
  };

  const getAlertIcon = (type: AlertType) => {
    if (type === 'urgent') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    } else if (type === 'important') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="border-l-4 pl-3" style={{ borderLeftColor: '#026892' }}>
          <h2 className="text-xl font-bold text-gray-900">Alerts & Notifications</h2>
        </div>
        {data.newCount > 0 && (
          <span className="text-white text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: '#026892' }}>
            {data.newCount} New
          </span>
        )}
      </div>

      <div className="space-y-3 overflow-y-auto" style={{ maxHeight: '400px' }}>
        {data.alerts.map((alert) => {
          const styles = getAlertStyles(alert.type);
          return (
            <div
              key={alert.id}
              className={`${styles.bg} ${styles.border} border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <div className={styles.icon}>
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {alert.title}
                    </h3>
                    {alert.isNew && (
                      <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-1"></span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {alert.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`${styles.tag} text-xs font-semibold px-2 py-1 rounded`}>
                      {alert.type.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPanel;


