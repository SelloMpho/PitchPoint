'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MessageNotification() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);

    const fetchUnreadMessages = async () => {
      try {
        // In a real app, this would fetch unread message count from the API
        // const response = await fetch('http://localhost:5000/api/messages/unread-count', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // 
        // if (!response.ok) {
        //   throw new Error('Failed to fetch unread messages');
        // }
        // 
        // const data = await response.json();
        // setUnreadCount(data.count);

        // Simulate API call with mock data
        setTimeout(() => {
          setUnreadCount(3);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching unread messages:', err);
        setLoading(false);
      }
    };

    fetchUnreadMessages();

    // In a real app, we would use WebSockets to update the unread count in real-time
    // This would be handled by the useWebSocket hook
  }, []);

  if (loading || !isAuthenticated) return null;

  return (
    <Link href="/messages" className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </Link>
  );
}