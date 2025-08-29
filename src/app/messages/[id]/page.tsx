'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';

export default function ConversationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const conversationId = params.id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const [otherUser, setOtherUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUserAndMessages = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        setUser(userData);

        // Fetch conversation messages
        const messagesResponse = await fetch(`http://localhost:5000/api/messages/conversation/${conversationId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!messagesResponse.ok) {
          throw new Error('Failed to fetch messages');
        }

        const messagesData = await messagesResponse.json();
        setMessages(messagesData.messages);
        setOtherUser(messagesData.otherUser);
        
        // Mark messages as read
        await fetch(`http://localhost:5000/api/messages/read/${conversationId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    // For now, we'll use mock data
    setTimeout(() => {
      const mockUser = {
        _id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'entrepreneur'
      };
      setUser(mockUser);

      const mockOtherUser = {
        _id: 'user456',
        firstName: 'Michael',
        lastName: 'Johnson',
        role: 'investor',
        company: 'Venture Capital Partners'
      };
      setOtherUser(mockOtherUser);

      const mockMessages = [
        {
          _id: 'msg1',
          sender: 'user456',
          content: 'Hello! I saw your startup profile and I\'m interested in learning more.',
          createdAt: '2023-06-15T10:00:00Z'
        },
        {
          _id: 'msg2',
          sender: 'user123',
          content: 'Hi there! Thanks for reaching out. What would you like to know?',
          createdAt: '2023-06-15T10:05:00Z'
        },
        {
          _id: 'msg3',
          sender: 'user456',
          content: 'I\'m particularly interested in your business model and current traction.',
          createdAt: '2023-06-15T10:10:00Z'
        },
        {
          _id: 'msg4',
          sender: 'user123',
          content: 'We operate on a subscription-based model with tiered pricing. We currently have 500 active users and growing at 15% month-over-month.',
          createdAt: '2023-06-15T10:15:00Z'
        },
        {
          _id: 'msg5',
          sender: 'user456',
          content: 'That sounds promising. What are your funding goals and how do you plan to use the investment?',
          createdAt: '2023-06-15T10:20:00Z'
        },
        {
          _id: 'msg6',
          sender: 'user123',
          content: 'We\'re looking to raise R2.5M to expand our team, enhance our product features, and scale our marketing efforts.',
          createdAt: '2023-06-15T10:25:00Z'
        },
        {
          _id: 'msg7',
          sender: 'user456',
          content: 'I would like to learn more about your startup.',
          createdAt: '2023-06-15T10:30:00Z'
        }
      ];
      setMessages(mockMessages);
      setLoading(false);
    }, 1000);
    
    // Uncomment to use real API
    // fetchUserAndMessages();
  }, [router, conversationId]);

  useEffect(() => {
    // Scroll to bottom of messages when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !otherUser) return;
    
    const token = localStorage.getItem('token');
    if (!token) return;
    
    setSendingMessage(true);
    
    try {
      // In a real app, this would send a message to the API
      // const response = await fetch('http://localhost:5000/api/messages/send', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     recipient: otherUser._id,
      //     content: newMessage
      //   })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to send message');
      // }
      
      // const data = await response.json();
      // setMessages(prev => [...prev, data]);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a new message object
      const newMessageObj = {
        _id: `msg${Date.now()}`,
        sender: user._id,
        content: newMessage,
        createdAt: new Date().toISOString()
      };
      
      // Add new message to the list
      setMessages(prev => [...prev, newMessageObj]);
      
      // Clear input
      setNewMessage('');
    } catch (err: any) {
      console.error('Error sending message:', err);
    } finally {
      setSendingMessage(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Today, show time
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      // Yesterday
      return 'Yesterday';
    } else if (diffDays < 7) {
      // Within a week, show day name
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      // Older, show date
      return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-red-700">{error}</p>
            <Link 
              href="/messages"
              className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Back to Messages
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!otherUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <p className="text-yellow-700">Conversation not found</p>
            <Link 
              href="/messages"
              className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Back to Messages
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow flex flex-col">
        {/* Conversation Header */}
        <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/messages" className="mr-4 text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <div>
              <h2 className="font-semibold">
                {otherUser.firstName} {otherUser.lastName}
              </h2>
              <p className="text-sm text-gray-500">
                {otherUser.role === 'investor' ? 'Investor' : 'Entrepreneur'}
                {otherUser.company && ` at ${otherUser.company}`}
              </p>
            </div>
          </div>
          
          {otherUser.role === 'investor' && user?.role === 'entrepreneur' && (
            <Link 
              href={`/investors/${otherUser._id}`}
              className="text-indigo-600 hover:text-indigo-800 text-sm"
            >
              View Profile
            </Link>
          )}
          
          {otherUser.role === 'entrepreneur' && user?.role === 'investor' && (
            <Link 
              href={`/startups/${otherUser._id}`}
              className="text-indigo-600 hover:text-indigo-800 text-sm"
            >
              View Startup
            </Link>
          )}
        </div>
        
        {/* Messages */}
        <div 
          className="flex-grow p-4 overflow-y-auto" 
          style={{ height: 'calc(100vh - 240px)' }}
        >
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No messages yet</p>
            </div>
          ) : (
            messages.map(message => (
              <div 
                key={message._id}
                className={`mb-4 flex ${message.sender === user._id ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${message.sender === user._id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'}`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 text-right ${message.sender === user._id ? 'text-indigo-200' : 'text-gray-500'}`}>
                    {formatDate(message.createdAt)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <div className="bg-white p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={sendingMessage}
            />
            <button
              type="submit"
              disabled={sendingMessage || !newMessage.trim()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingMessage ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}