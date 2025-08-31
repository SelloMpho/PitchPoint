'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

// Define proper TypeScript interfaces instead of 'any'
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Message {
  _id: string;
  sender: string;
  content: string;
  createdAt: string;
}

interface Conversation {
  _id: string;
  otherUser: {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  lastMessage: {
    content: string;
    createdAt: string;
    sender: string;
  };
  unreadCount: number;
}

export default function MessagesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // For now, we'll use mock data
    setTimeout(() => {
      const mockUser: User = {
        _id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'entrepreneur'
      };
      setUser(mockUser);

      const mockConversations: Conversation[] = [
        {
          _id: 'conv1',
          otherUser: {
            _id: 'user456',
            firstName: 'Michael',
            lastName: 'Johnson',
            role: 'investor'
          },
          lastMessage: {
            content: 'I would like to learn more about your startup.',
            createdAt: '2023-06-15T10:30:00Z',
            sender: 'user456'
          },
          unreadCount: 1
        },
        {
          _id: 'conv2',
          otherUser: {
            _id: 'user789',
            firstName: 'Sarah',
            lastName: 'Williams',
            role: 'investor'
          },
          lastMessage: {
            content: 'Thanks for sharing your pitch deck. Let\'s schedule a call next week.',
            createdAt: '2023-06-14T15:45:00Z',
            sender: 'user123'
          },
          unreadCount: 0
        },
        {
          _id: 'conv3',
          otherUser: {
            _id: 'user101',
            firstName: 'David',
            lastName: 'Brown',
            role: 'investor'
          },
          lastMessage: {
            content: 'Your traction metrics are impressive. I\'d like to discuss potential investment.',
            createdAt: '2023-06-10T09:15:00Z',
            sender: 'user101'
          },
          unreadCount: 2
        }
      ];
      setConversations(mockConversations);
      setLoading(false);
    }, 1000);
    
  }, [router]);

  useEffect(() => {
    // Scroll to bottom of messages when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async (conversationId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      // Simulate API call with mock data
      const mockMessages: Message[] = [
        {
          _id: 'msg1',
          sender: conversationId === 'conv1' ? 'user456' : (conversationId === 'conv2' ? 'user789' : 'user101'),
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
          sender: conversationId === 'conv1' ? 'user456' : (conversationId === 'conv2' ? 'user789' : 'user101'),
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
          sender: conversationId === 'conv1' ? 'user456' : (conversationId === 'conv2' ? 'user789' : 'user101'),
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
          sender: conversationId === 'conv1' ? 'user456' : (conversationId === 'conv2' ? 'user789' : 'user101'),
          content: conversationId === 'conv1' ? 'I would like to learn more about your startup.' : (conversationId === 'conv2' ? 'Thanks for sharing your pitch deck. Let\'s schedule a call next week.' : 'Your traction metrics are impressive. I\'d like to discuss potential investment.'),
          createdAt: '2023-06-15T10:30:00Z'
        }
      ];
      
      setMessages(mockMessages);
      
      // Update unread count in conversations
      setConversations(prev => 
        prev.map(conv => 
          conv._id === conversationId ? { ...conv, unreadCount: 0 } : conv
        )
      );
    } catch (err: any) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleConversationClick = (conversation: Conversation) => {
    setActiveConversation(conversation);
    fetchMessages(conversation._id);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    const token = localStorage.getItem('token');
    if (!token) return;
    
    setSendingMessage(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a new message object
      const newMessageObj: Message = {
        _id: `msg${Date.now()}`,
        sender: user!._id,
        content: newMessage,
        createdAt: new Date().toISOString()
      };
      
      // Add new message to the list
      setMessages(prev => [...prev, newMessageObj]);
      
      // Update last message in conversations
      setConversations(prev => 
        prev.map(conv => 
          conv._id === activeConversation._id 
            ? { 
                ...conv, 
                lastMessage: {
                  content: newMessage,
                  createdAt: new Date().toISOString(),
                  sender: user!._id
                } 
              } 
            : conv
        )
      );
      
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
              href="/dashboard"
              className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Go to Dashboard
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
      
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Conversations Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>
          
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No conversations yet</p>
            </div>
          ) : (
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              {conversations.map(conversation => (
                <div 
                  key={conversation._id}
                  onClick={() => handleConversationClick(conversation)}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition duration-150 ${activeConversation?._id === conversation._id ? 'bg-indigo-50' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">
                      {conversation.otherUser.firstName} {conversation.otherUser.lastName}
                      <span className="ml-2 text-xs text-gray-500 font-normal">
                        {conversation.otherUser.role === 'investor' ? 'Investor' : 'Entrepreneur'}
                      </span>
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(conversation.lastMessage.createdAt)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 truncate" style={{ maxWidth: '80%' }}>
                      {conversation.lastMessage.sender === user?._id ? (
                        <span className="text-gray-400 mr-1">You:</span>
                      ) : null}
                      {conversation.lastMessage.content}
                    </p>
                    
                    {conversation.unreadCount > 0 && (
                      <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Message Area */}
        <div className="flex-grow flex flex-col bg-gray-100">
          {activeConversation ? (
            <>
              {/* Conversation Header */}
              <div className="bg-white p-4 border-b border-gray-200 flex items-center">
                <div>
                  <h2 className="font-semibold">
                    {activeConversation.otherUser.firstName} {activeConversation.otherUser.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {activeConversation.otherUser.role === 'investor' ? 'Investor' : 'Entrepreneur'}
                  </p>
                </div>
              </div>
              
              {/* Messages */}
              <div 
                className="flex-grow p-4 overflow-y-auto" 
                style={{ maxHeight: 'calc(100vh - 240px)' }}
              >
                {messages.map(message => (
                  <div 
                    key={message._id}
                    className={`mb-4 flex ${message.sender === user?._id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${message.sender === user?._id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'}`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 text-right ${message.sender === user?._id ? 'text-indigo-200' : 'text-gray-500'}`}>
                        {formatDate(message.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
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
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
              <p className="text-gray-600 mb-6 max-w-md">
                Select a conversation from the sidebar to view messages. Connect with investors or entrepreneurs to discuss opportunities.
              </p>
              {user?.role === 'entrepreneur' ? (
                <Link 
                  href="/investors"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Find Investors
                </Link>
              ) : (
                <Link 
                  href="/startups"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Discover Startups
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}