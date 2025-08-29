'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNotification } from '../context/NotificationContext';

type WebSocketMessage = {
  type: string;
  data: any;
};

export default function useWebSocket(url: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const webSocketRef = useRef<WebSocket | null>(null);
  const { showNotification } = useNotification();
  
  // Connect to WebSocket
  useEffect(() => {
    // In a real app, this would connect to a real WebSocket server
    // For now, we'll simulate WebSocket behavior
    
    // Simulate connection
    const connectTimeout = setTimeout(() => {
      setIsConnected(true);
      console.log('WebSocket connected');
    }, 1000);
    
    // Cleanup function
    return () => {
      clearTimeout(connectTimeout);
      // In a real app, we would close the WebSocket connection here
      // if (webSocketRef.current) {
      //   webSocketRef.current.close();
      // }
    };
    
    // Real WebSocket implementation would look like this:
    // const token = localStorage.getItem('token');
    // if (!token) return;
    // 
    // const ws = new WebSocket(`${url}?token=${token}`);
    // webSocketRef.current = ws;
    // 
    // ws.onopen = () => {
    //   setIsConnected(true);
    //   console.log('WebSocket connected');
    // };
    // 
    // ws.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   setLastMessage(message);
    //   
    //   // Handle different message types
    //   handleMessage(message);
    // };
    // 
    // ws.onclose = () => {
    //   setIsConnected(false);
    //   console.log('WebSocket disconnected');
    // };
    // 
    // ws.onerror = (error) => {
    //   console.error('WebSocket error:', error);
    // };
    // 
    // return () => {
    //   ws.close();
    // };
  }, [url]);
  
  // Simulate receiving messages
  useEffect(() => {
    if (!isConnected) return;
    
    // Simulate receiving a new message notification after 3 seconds
    const messageTimeout = setTimeout(() => {
      const message = {
        type: 'new_message',
        data: {
          conversationId: 'conv1',
          sender: {
            _id: 'user456',
            firstName: 'Michael',
            lastName: 'Johnson'
          },
          content: 'Are you still interested in discussing investment opportunities?'
        }
      };
      
      setLastMessage(message);
      handleMessage(message);
    }, 3000);
    
    return () => {
      clearTimeout(messageTimeout);
    };
  }, [isConnected]);
  
  // Handle different message types
  const handleMessage = useCallback((message: WebSocketMessage) => {
    switch (message.type) {
      case 'new_message':
        showNotification(
          `New message from ${message.data.sender.firstName}: ${message.data.content.substring(0, 30)}${message.data.content.length > 30 ? '...' : ''}`,
          'info',
          7000
        );
        break;
      case 'bookmark_added':
        showNotification(
          `${message.data.user.firstName} ${message.data.user.lastName} bookmarked your startup!`,
          'success'
        );
        break;
      case 'profile_viewed':
        showNotification(
          `${message.data.user.firstName} ${message.data.user.lastName} viewed your profile`,
          'info'
        );
        break;
      default:
        console.log('Unhandled message type:', message.type);
    }
  }, [showNotification]);
  
  // Send message function
  const sendMessage = useCallback((type: string, data: any) => {
    if (!isConnected) {
      console.error('WebSocket not connected');
      return;
    }
    
    // In a real app, this would send a message through the WebSocket
    // if (webSocketRef.current) {
    //   webSocketRef.current.send(JSON.stringify({ type, data }));
    // }
    
    console.log('Sending message:', { type, data });
  }, [isConnected]);
  
  return {
    isConnected,
    lastMessage,
    sendMessage
  };
}