'use client'; 
import { useState, useEffect } from 'react'; 
import Link from 'next/link';

// Mock data interfaces
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'entrepreneur' | 'investor' | 'admin';
  status: 'active' | 'pending' | 'suspended';
}

interface Startup {
  _id: string;
  name: string;
  industry: string;
  fundingStage: string;
  fundingAmount: string;
  ownerId: string;
  verified: boolean;
}

interface Investor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  investmentFocus: string;
  investmentAmount: string;
  bio: string;
  verified: boolean;
}

interface Connection {
  _id: string;
  startupId: string;
  investorId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>([
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'entrepreneur', status: 'active' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', role: 'investor', status: 'pending' },
    { id: '3', firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', role: 'admin', status: 'active' },
  ]);
  const [startups, setStartups] = useState<Startup[]>([
    { _id: '1', name: 'Tech Innovators', industry: 'Technology', fundingStage: 'Seed', fundingAmount: 'R500k', ownerId: '1', verified: true },
    { _id: '2', name: 'Green Energy Solutions', industry: 'CleanTech', fundingStage: 'Series A', fundingAmount: 'R5M', ownerId: '4', verified: false },
  ]);
  const [investors, setInvestors] = useState<Investor[]>([
    { _id: '1', firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com', investmentFocus: 'Seed', investmentAmount: 'R1M-5M', bio: 'Angel investor with 10+ years of experience', verified: true },
    { _id: '2', firstName: 'Charlie', lastName: 'Davis', email: 'charlie@example.com', investmentFocus: 'Series A', investmentAmount: 'R5M-20M', bio: 'VC firm partner', verified: false },
  ]);
  const [connections, setConnections] = useState<Connection[]>([
    { _id: '1', startupId: '1', investorId: '1', status: 'accepted', createdAt: '2025-08-01' },
    { _id: '2', startupId: '2', investorId: '2', status: 'pending', createdAt: '2025-08-15' },
  ]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data
  const user = { firstName: 'Admin' };

  const handleUserAction = (user: User, action: 'edit' | 'verify' | 'suspend' | 'delete') => {
    console.log(`Action ${action} on user ${user.firstName} ${user.lastName}`);
    if (action === 'edit') {
      setSelectedUser(user);
      setIsUserModalOpen(true);
    }
  };

  const handleUserSave = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserCancel = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navbar - Simplified for example */}
      <nav className="navbar-glass fixed top-0 w-full z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-300">Welcome, {user?.firstName || 'Admin'}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-300 text-lg">Welcome back, {user?.firstName || 'Admin'}! Manage your platform efficiently.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/50 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === 'users'
                ? 'bg-indigo-500 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('startups')}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === 'startups'
                ? 'bg-indigo-500 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Startups
          </button>
          <button
            onClick={() => setActiveTab('investors')}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === 'investors'
                ? 'bg-indigo-500 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Investors
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === 'connections'
                ? 'bg-indigo-500 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Connections
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'users' && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors duration-200">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-bold">{user.firstName[0]}{user.lastName[0]}</span>
                          </div>
                          <span className="text-white font-medium">{user.firstName} {user.lastName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-300">{user.email}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                          user.role === 'investor' ? 'bg-emerald-500/20 text-emerald-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          user.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUserAction(user, 'edit')}
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          )}
                          {user.status === 'active' && (
                            <button
                              onClick={() => handleUserAction(user, 'suspend')}
                              className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                              title="Suspend"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => handleUserAction(user, 'delete')}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                            title="Delete"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'startups' && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Startup Management</h2>
            </div>
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
                  {startups.map((startup) => (
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
                      <td className="py-4 px-4 text-slate-300">{startup.fundingStage}</td>
                      <td className="py-4 px-4 text-slate-300">{startup.fundingAmount}</td>
                      <td className="py-4 px-4 text-slate-300">
                        {users.find(u => u.id === startup.ownerId)?.firstName}{' '}
                        {users.find(u => u.id === startup.ownerId)?.lastName}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          startup.verified ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {startup.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => console.log('Edit startup', startup._id)}
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => console.log('Verify startup', startup._id)}
                            className="text-green-400 hover:text-green-300 transition-colors duration-200"
                            title="Verify"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'investors' && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Investor Management</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Investment Focus</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Investment Amount</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Bio</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Verified</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {investors.map((investor) => (
                    <tr key={investor._id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors duration-200">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-bold">{investor.firstName[0]}{investor.lastName[0]}</span>
                          </div>
                          <span className="text-white font-medium">{investor.firstName} {investor.lastName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-300">{investor.email}</td>
                      <td className="py-4 px-4 text-slate-300">{investor.investmentFocus}</td>
                      <td className="py-4 px-4 text-slate-300">{investor.investmentAmount}</td>
                      <td className="py-4 px-4 text-slate-300">{investor.bio}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          investor.verified ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {investor.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => console.log('Edit investor', investor._id)}
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => console.log('Verify investor', investor._id)}
                            className="text-green-400 hover:text-green-300 transition-colors duration-200"
                            title="Verify"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Investment Connections</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Startup</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Investor</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {connections.map((connection) => {
                    const startup = startups.find(s => s._id === connection.startupId);
                    const investor = investors.find(i => i._id === connection.investorId);
                    return (
                      <tr key={connection._id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors duration-200">
                        <td className="py-4 px-4 text-white">{startup?.name || 'Unknown'}</td>
                        <td className="py-4 px-4 text-white">{investor?.firstName} {investor?.lastName}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            connection.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                            connection.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-300">{connection.createdAt}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => console.log('View details', connection._id)}
                              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                              title="View"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            {connection.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => console.log('Accept connection', connection._id)}
                                  className="text-green-400 hover:text-green-300 transition-colors duration-200"
                                  title="Accept"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => console.log('Reject connection', connection._id)}
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* User Modal */}
      {isUserModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-6">Edit User: {selectedUser.firstName} {selectedUser.lastName}</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleUserSave(); }}>
              <div className="mb-6">
                <label htmlFor="userFirstName" className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                <input
                  type="text"
                  id="userFirstName"
                  defaultValue={selectedUser.firstName}
                  className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="userLastName" className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                <input
                  type="text"
                  id="userLastName"
                  defaultValue={selectedUser.lastName}
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
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleUserCancel}
                  className="mt-3 w-full inline-flex justify-center rounded-xl border border-slate-600 shadow-sm px-6 py-3 bg-slate-800/50 text-base font-semibold text-slate-300 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-6 py-3 bg-indigo-600 text-base font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto transition-all duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer - Simplified for example */}
      <footer className="mt-auto border-t border-slate-700/50 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">PitchPoint</span>
              </Link>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">About</Link>
              <Link href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Contact</Link>
              <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Terms</Link>
              <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Privacy</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <p className="text-slate-400 text-sm text-center">&copy; {new Date().getFullYear()} PitchPoint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}