'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define TypeScript interfaces for type safety
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AdminStats {
  totalUsers: number;
  totalStartups: number;
  totalInvestors: number;
  totalConnections: number;
  activeUsers: number;
  pendingVerifications: number;
  revenue: number;
}

interface UserList {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  status: string;
}

interface StartupList {
  _id: string;
  name: string;
  industry: string;
  fundingStage: string;
  fundingAmount: number;
  owner: string;
  createdAt: string;
  verified: boolean;
}

interface InvestorList {
  _id: string;
  companyName: string;
  investorType: string;
  industries: string[];
  minInvestment: number;
  maxInvestment: number;
  createdAt: string;
  verified: boolean;
}

interface Connection {
  _id: string;
  startupName: string;
  investorName: string;
  connectionType: string;
  date: string;
  status: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalStartups: 0,
    totalInvestors: 0,
    totalConnections: 0,
    activeUsers: 0,
    pendingVerifications: 0,
    revenue: 0
  });
  
  const [users, setUsers] = useState<UserList[]>([]);
  const [startups, setStartups] = useState<StartupList[]>([]);
  const [investors, setInvestors] = useState<InvestorList[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserList | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showStartupModal, setShowStartupModal] = useState(false);
  const [showInvestorModal, setShowInvestorModal] = useState(false);
  const [showConnectionModal, setShowConnectionModal] = useState(false);

  useEffect(() => {
    // Simulate authentication check
    setTimeout(() => {
      setUser({
        _id: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@investconnect.co.za',
        role: 'admin'
      });

      // Mock admin stats
      setStats({
        totalUsers: 247,
        totalStartups: 89,
        totalInvestors: 158,
        totalConnections: 342,
        activeUsers: 189,
        pendingVerifications: 12,
        revenue: 45600
      });

      // Mock user data
      setUsers([
        {
          _id: 'user1',
          name: 'John Smith',
          email: 'john@ecosolutions.co.za',
          role: 'entrepreneur',
          createdAt: '2024-01-15',
          status: 'active'
        },
        {
          _id: 'user2',
          name: 'Sarah Johnson',
          email: 'sarah@healthconnect.co.za',
          role: 'entrepreneur',
          createdAt: '2024-01-20',
          status: 'active'
        },
        {
          _id: 'user3',
          name: 'Michael Johnson',
          email: 'michael@horizonventures.co.za',
          role: 'investor',
          createdAt: '2024-01-10',
          status: 'active'
        },
        {
          _id: 'user4',
          name: 'Emma Williams',
          email: 'emma@finsecure.co.za',
          role: 'investor',
          createdAt: '2024-01-25',
          status: 'pending'
        }
      ]);

      // Mock startup data
      setStartups([
        {
          _id: 'startup1',
          name: 'EcoSolutions',
          industry: 'CleanTech',
          fundingStage: 'Seed',
          fundingAmount: 500000,
          owner: 'John Smith',
          createdAt: '2024-01-15',
          verified: true
        },
        {
          _id: 'startup2',
          name: 'HealthConnect',
          industry: 'HealthTech',
          fundingStage: 'Pre-seed',
          fundingAmount: 250000,
          owner: 'Sarah Johnson',
          createdAt: '2024-01-20',
          verified: true
        },
        {
          _id: 'startup3',
          name: 'AgriTech Solutions',
          industry: 'AgriTech',
          fundingStage: 'Series A',
          fundingAmount: 1500000,
          owner: 'David Brown',
          createdAt: '2024-01-18',
          verified: false
        }
      ]);

      // Mock investor data
      setInvestors([
        {
          _id: 'investor1',
          companyName: 'Horizon Ventures',
          investorType: 'Venture Capital',
          industries: ['FinTech', 'HealthTech'],
          minInvestment: 500000,
          maxInvestment: 5000000,
          createdAt: '2024-01-10',
          verified: true
        },
        {
          _id: 'investor2',
          companyName: 'FinSecure Capital',
          investorType: 'Private Equity',
          industries: ['FinTech', 'SaaS'],
          minInvestment: 1000000,
          maxInvestment: 10000000,
          createdAt: '2024-01-25',
          verified: true
        },
        {
          _id: 'investor3',
          companyName: 'Green Future Fund',
          investorType: 'Impact Investor',
          industries: ['CleanTech', 'AgriTech'],
          minInvestment: 250000,
          maxInvestment: 2000000,
          createdAt: '2024-01-22',
          verified: false
        }
      ]);

      // Mock connection data
      setConnections([
        {
          _id: 'conn1',
          startupName: 'EcoSolutions',
          investorName: 'Horizon Ventures',
          connectionType: 'Contact Request',
          date: '2024-01-20',
          status: 'accepted'
        },
        {
          _id: 'conn2',
          startupName: 'HealthConnect',
          investorName: 'FinSecure Capital',
          connectionType: 'Bookmark',
          date: '2024-01-22',
          status: 'pending'
        },
        {
          _id: 'conn3',
          startupName: 'AgriTech Solutions',
          investorName: 'Green Future Fund',
          connectionType: 'Contact Request',
          date: '2024-01-24',
          status: 'pending'
        }
      ]);

      setLoading(false);
    }, 800);
  }, [router]);

  const handleUserAction = (user: UserList, action: string) => {
    setSelectedUser(user);
    if (action === 'edit') {
      setShowUserModal(true);
    } else if (action === 'verify') {
      setUsers(users.map(u => u._id === user._id ? { ...u, status: 'active' } : u));
      setStats(prev => ({ ...prev, pendingVerifications: prev.pendingVerifications - 1 }));
    } else if (action === 'suspend') {
      setUsers(users.map(u => u._id === user._id ? { ...u, status: 'suspended' } : u));
    }
  };

  const handleStartupAction = (startup: StartupList, action: string) => {
    if (action === 'verify') {
      setStartups(startups.map(s => s._id === startup._id ? { ...s, verified: true } : s));
      setStats(prev => ({ ...prev, pendingVerifications: prev.pendingVerifications - 1 }));
    } else if (action === 'edit') {
      setShowStartupModal(true);
    }
  };

  const handleInvestorAction = (investor: InvestorList, action: string) => {
    if (action === 'verify') {
      setInvestors(investors.map(i => i._id === investor._id ? { ...i, verified: true } : i));
      setStats(prev => ({ ...prev, pendingVerifications: prev.pendingVerifications - 1 }));
    } else if (action === 'edit') {
      setShowInvestorModal(true);
    }
  };

  const handleConnectionAction = (connection: Connection, action: string) => {
    if (action === 'approve') {
      setConnections(connections.map(c => c._id === connection._id ? { ...c, status: 'accepted' } : c));
    } else if (action === 'reject') {
      setConnections(connections.filter(c => c._id !== connection._id));
    }
  };

  const handleUserSave = () => {
    setShowUserModal(false);
  };

  const handleStartupSave = () => {
    setShowStartupModal(false);
  };

  const handleInvestorSave = () => {
    setShowInvestorModal(false);
  };

  const handleConnectionSave = () => {
    setShowConnectionModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-300 text-lg">Welcome back, {user?.firstName || 'Admin'}! Manage your platform efficiently.</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-slate-700/50">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-slate-800/50 text-white border-b-2 border-indigo-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-200 ${
                activeTab === 'users'
                  ? 'bg-slate-800/50 text-white border-b-2 border-indigo-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('startups')}
              className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-200 ${
                activeTab === 'startups'
                  ? 'bg-slate-800/50 text-white border-b-2 border-indigo-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
              }`}
            >
              Startups
            </button>
            <button
              onClick={() => setActiveTab('investors')}
              className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-200 ${
                activeTab === 'investors'
                  ? 'bg-slate-800/50 text-white border-b-2 border-indigo-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
              }`}
            >
              Investors
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-200 ${
                activeTab === 'connections'
                  ? 'bg-slate-800/50 text-white border-b-2 border-indigo-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
              }`}
            >
              Connections
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-200 ${
                activeTab === 'reports'
                  ? 'bg-slate-800/50 text-white border-b-2 border-indigo-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
              }`}
            >
              Reports
            </button>
          </div>
        </div>
        
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-indigo-900/50 text-indigo-400 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-900/50 text-green-400 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m5 10v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1v5h6z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Startups</p>
                    <p className="text-2xl font-bold text-white">{stats.totalStartups}</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-900/50 text-yellow-400 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Investors</p>
                    <p className="text-2xl font-bold text-white">{stats.totalInvestors}</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-900/50 text-purple-400 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-8 8" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Connections</p>
                    <p className="text-2xl font-bold text-white">{stats.totalConnections}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-900/50 text-blue-400 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Active Users</p>
                    <p className="text-2xl font-bold text-white">{stats.activeUsers}</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-orange-900/50 text-orange-400 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Pending Verifications</p>
                    <p className="text-2xl font-bold text-white">{stats.pendingVerifications}</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-teal-900/50 text-teal-400 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-white">R{stats.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-effect rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 px-8 py-6 border-b border-slate-700/50">
                <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center p-4 border-b border-slate-700/50 last:border-0">
                    <div className="w-10 h-10 bg-green-900/50 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">New startup created: EcoSolutions</p>
                      <p className="text-slate-400 text-sm">10 minutes ago</p>
                    </div>
                    <span className="text-slate-400 text-sm">Startup</span>
                  </div>
                  
                  <div className="flex items-center p-4 border-b border-slate-700/50 last:border-0">
                    <div className="w-10 h-10 bg-blue-900/50 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Connection request: Horizon Ventures → HealthConnect</p>
                      <p className="text-slate-400 text-sm">25 minutes ago</p>
                    </div>
                    <span className="text-slate-400 text-sm">Connection</span>
                  </div>
                  
                  <div className="flex items-center p-4 border-b border-slate-700/50 last:border-0">
                    <div className="w-10 h-10 bg-yellow-900/50 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Verification pending: AgriTech Solutions</p>
                      <p className="text-slate-400 text-sm">1 hour ago</p>
                    </div>
                    <span className="text-slate-400 text-sm">Startup</span>
                  </div>
                  
                  <div className="flex items-center p-4 border-b border-slate-700/50 last:border-0">
                    <div className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">New investor registered: FinSecure Capital</p>
                      <p className="text-slate-400 text-sm">2 hours ago</p>
                    </div>
                    <span className="text-slate-400 text-sm">Investor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="glass-effect rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 px-8 py-6 border-b border-slate-700/50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">User Management</h2>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="px-4 py-2 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold">
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Role</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Joined</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors duration-200">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white font-bold">{user.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <span className="text-white font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-300">{user.email}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'entrepreneur' 
                              ? 'bg-green-900/50 text-green-300 border border-green-700/50' 
                              : 'bg-blue-900/50 text-blue-300 border border-blue-700/50'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' 
                              ? 'bg-green-900/50 text-green-300 border border-green-700/50' 
                              : user.status === 'pending'
                              ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50'
                              : 'bg-red-900/50 text-red-300 border border-red-700/50'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-300">{user.createdAt}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUserAction(user, 'edit')}
                              className="text-slate-400 hover:text-white transition-colors duration-200"
                              title="Edit"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            {user.status === 'pending' && (
                              <button
                                onClick={() => handleUserAction(user, 'verify')}
                                className="text-green-400 hover:text-green-300 transition-colors duration-200"
                                title="Verify"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>
                            )}
                            {user.status === 'active' && (
                              <button
                                onClick={() => handleUserAction(user, 'suspend')}
                                className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                title="Suspend"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Startups Tab */}
        {activeTab === 'startups' && (
          <div className="glass-effect rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 px-8 py-6 border-b border-slate-700/50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Startup Management</h2>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Search startups..."
                    className="px-4 py-2 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold">
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Industry</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Funding Stage</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Funding Amount</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Owner</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Verified</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {startups.map(startup => (
                      <tr key={startup._id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors duration-200">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white font-bold">{startup.name.substring(0, 2).toUpperCase()}</span>
                            </div>
                            <span className="text-white font-medium">{startup.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-300">{startup.industry}</td>
                        <td className="py-4 px-4">
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50">
                            {startup.fundingStage}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-300">R{startup.fundingAmount.toLocaleString()}</td>
                        <td className="py-4 px-4 text-slate-300">{startup.owner}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            startup.verified 
                              ? 'bg-green-900/50 text-green-300 border border-green-700/50' 
                              : 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50'
                          }`}>
                            {startup.verified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleStartupAction(startup, 'edit')}
                              className="text-slate-400 hover:text-white transition-colors duration-200"
                              title="Edit"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            {!startup.verified && (
                              <button
                                onClick={() => handleStartupAction(startup, 'verify')}
                                className="text-green-400 hover:text-green-300 transition-colors duration-200"
                                title="Verify"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Investors Tab */}
        {activeTab === 'investors' && (
          <div className="glass-effect rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 px-8 py-6 border-b border-slate-700/50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Investor Management</h2>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Search investors..."
                    className="px-4 py-2 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold">
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Company</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Industries</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Investment Range</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Verified</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investors.map(investor => (
                      <tr key={investor._id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors duration-200">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white font-bold">{investor.companyName.substring(0, 2).toUpperCase()}</span>
                            </div>
                            <span className="text-white font-medium">{investor.companyName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-300">{investor.investorType}</td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {investor.industries.map(industry => (
                              <span key={industry} className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50">
                                {industry}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-300">
                          R{investor.minInvestment.toLocaleString()} - R{investor.maxInvestment.toLocaleString()}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            investor.verified 
                              ? 'bg-green-900/50 text-green-300 border border-green-700/50' 
                              : 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50'
                          }`}>
                            {investor.verified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleInvestorAction(investor, 'edit')}
                              className="text-slate-400 hover:text-white transition-colors duration-200"
                              title="Edit"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            {!investor.verified && (
                              <button
                                onClick={() => handleInvestorAction(investor, 'verify')}
                                className="text-green-400 hover:text-green-300 transition-colors duration-200"
                                title="Verify"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Connections Tab */}
        {activeTab === 'connections' && (
          <div className="glass-effect rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 px-8 py-6 border-b border-slate-700/50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Connection Management</h2>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Search connections..."
                    className="px-4 py-2 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold">
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Startup</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Investor</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {connections.map(connection => (
                      <tr key={connection._id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors duration-200">
                        <td className="py-4 px-4 text-white font-medium">{connection.startupName}</td>
                        <td className="py-4 px-4 text-slate-300">{connection.investorName}</td>
                        <td className="py-4 px-4">
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50">
                            {connection.connectionType}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-300">{connection.date}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            connection.status === 'accepted' 
                              ? 'bg-green-900/50 text-green-300 border border-green-700/50' 
                              : connection.status === 'pending'
                              ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50'
                              : 'bg-red-900/50 text-red-300 border border-red-700/50'
                          }`}>
                            {connection.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            {connection.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleConnectionAction(connection, 'approve')}
                                  className="text-green-400 hover:text-green-300 transition-colors duration-200"
                                  title="Approve"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleConnectionAction(connection, 'reject')}
                                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                  title="Reject"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-8">
            <div className="glass-effect rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 px-8 py-6 border-b border-slate-700/50">
                <h2 className="text-2xl font-bold text-white">System Analytics</h2>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-4">User Growth</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-slate-300">Monthly user growth chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-4">Revenue Trends</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-8 8" />
                          </svg>
                        </div>
                        <p className="text-slate-300">Monthly revenue trend chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-4">Startup Distribution by Industry</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <p className="text-slate-300">Industry distribution chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-4">Investor Activity</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <p className="text-slate-300">Investor activity chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* User Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom glass-effect rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-slate-700/50 backdrop-blur-sm">
              <div className="bg-slate-800/50 px-8 pt-8 pb-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-2xl leading-6 font-bold text-white mb-6">Edit User: {selectedUser.name}</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleUserSave(); }}>
                      <div className="mb-6">
                        <label htmlFor="userName" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                        <input
                          type="text"
                          id="userName"
                          defaultValue={selectedUser.name}
                          className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="userEmail" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                        <input
                          type="email"
                          id="userEmail"
                          defaultValue={selectedUser.email}
                          className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="userRole" className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                        <select
                          id="userRole"
                          defaultValue={selectedUser.role}
                          className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white transition-all duration-200"
                        >
                          <option value="entrepreneur">Entrepreneur</option>
                          <option value="investor">Investor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="userStatus" className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                        <select
                          id="userStatus"
                          defaultValue={selectedUser.status}
                          className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white transition-all duration-200"
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      </div>
                      <div className="mt-8 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-base font-semibold text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowUserModal(false)}
                          className="mt-3 w-full inline-flex justify-center rounded-xl border border-slate-600 shadow-sm px-6 py-3 bg-slate-800/50 text-base font-semibold text-slate-300 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

// Mock Navbar component
function Navbar() {
  return (
    <nav className="navbar-glass fixed top-0 w-full z-50 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              InvestConnect Admin
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</a>
              <a href="/admin" className="text-white px-3 py-2 rounded-md text-sm font-medium bg-slate-700/50">Admin</a>
              <a href="/investors" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Investors</a>
              <a href="/startups" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Startups</a>
              <a href="/login" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Mock Footer component
function Footer() {
  return (
    <footer className="bg-slate-900/80 border-t border-slate-700/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
              InvestConnect Admin
            </h3>
            <p className="text-slate-400 mb-4 max-w-md">
              Comprehensive admin dashboard for managing users, startups, investors, and connections on the InvestConnect platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.064.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Guides</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">API Reference</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4">Admin</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">System Status</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Audit Logs</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Settings</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Backup</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-700/50">
          <p className="text-slate-400 text-sm text-center">
            &copy; {new Date().getFullYear()} InvestConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}