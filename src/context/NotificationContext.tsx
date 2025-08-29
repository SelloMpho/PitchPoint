'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import Notification from '../components/common/Notification';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

type NotificationContextType = {
  showNotification: (message: string, type?: NotificationType, duration?: number) => void;
  hideNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
    duration: number;
    show: boolean;
  }>({ message: '', type: 'info', duration: 5000, show: false });

  const showNotification = (message: string, type: NotificationType = 'info', duration: number = 5000) => {
    setNotification({ message, type, duration, show: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <Notification
        message={notification.message}
        type={notification.type}
        duration={notification.duration}
        onClose={hideNotification}
        show={notification.show}
      />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}