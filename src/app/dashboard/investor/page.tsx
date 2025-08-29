'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define TypeScript interfaces for type safety
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture?: string;
}

interface InvestmentPreferences {
  industries: string[];
  stages: string[];
  locations: string[];
  minInvestment: number;
  maxInvestment: number;
}

interface Investor {
  _id: string;
  user: User;
  companyName: string;
  investorType: string;
  bio: string;
  investmentPreferences: InvestmentPreferences;
  portfolio: { name: string; industry: string }[];
  website: string;
  isVerified: boolean;
}

interface Startup {
  _id: string;
  name: string;
  industry: string;
  location: string;
  fundingStage: string;
  fundingAmount: number;
  description: string;
  logo: string | null;
}

export default function InvestorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [bookmarkedStartups, setBookmarkedStartups] = useState<Startup[]>([]);
  const [recommendedStartups, setRecommendedStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate authentication check
    setTimeout(() => {
      // Mock user data
      const mockUser: User = {
        _id: 'user123',
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael@horizonventures.co.za',
        role: 'investor',
        profilePicture: 'https://placehold.co/200x200'
      };
      
      setUser(mockUser);
      
      // Mock investor data
      const mockInvestor: Investor = {
        _id: 'investor123',
        user: mockUser,
        companyName: 'Horizon Ventures',
        investorType: 'Venture Capital',
        bio: 'Horizon Ventures is a leading VC firm focused on early-stage tech startups in South Africa. We invest in innovative companies with high growth potential and strong founding teams. Our investment approach is hands-on, providing not just capital but also strategic guidance, industry connections, and operational support to help our portfolio companies scale rapidly.',
        investmentPreferences: {
          industries: ['FinTech', 'HealthTech', 'SaaS', 'AI/ML'],
          stages: ['Seed', 'Series A'],
          locations: ['Cape Town', 'Johannesburg'],
          minInvestment: 500000,
          maxInvestment: 5000000
        },
        portfolio: [
          { name: 'PayFast', industry: 'FinTech' },
          { name: 'MediHealth', industry: 'HealthTech' },
          { name: 'CloudWorks', industry: 'SaaS' }
        ],
        website: 'https://horizonventures.co.za',
        isVerified: true
      };
      
      setInvestor(mockInvestor);
      
      // Mock bookmarked startups
      const mockBookmarkedStartups: Startup[] = [
        {
          _id: '1',
          name: 'EcoSolutions',
          industry: 'CleanTech',
          location: 'Cape Town',
          fundingStage: 'Seed',
          fundingAmount: 500000,
          description: 'Sustainable energy solutions for residential buildings, focusing on solar integration and energy efficiency optimization.',
          logo: null
        },
        {
          _id: '2',
          name: 'HealthConnect',
          industry: 'HealthTech',
          location: 'Johannesburg',
          fundingStage: 'Pre-seed',
          fundingAmount: 250000,
          description: 'Connecting patients with healthcare providers in rural areas through telemedicine and mobile health clinics.',
          logo: null
        }
      ];
      
      setBookmarkedStartups(mockBookmarkedStartups);
      
      // Mock recommended startups
      const mockRecommendedStartups: Startup[] = [
        {
          _id: '3',
          name: 'AgriTech Solutions',
          industry: 'AgriTech',
          location: 'Pretoria',
          fundingStage: 'Series A',
          fundingAmount: 1500000,
          description: 'Smart farming technology for small-scale farmers, including IoT sensors for soil monitoring and AI-driven crop optimization.',
          logo: null
        },
        {
          _id: '4',
          name: 'FinEasy',
          industry: 'FinTech',
          location: 'Durban',
          fundingStage: 'Seed',
          fundingAmount: 750000,
          description: 'Mobile banking solutions for underbanked populations, enabling financial inclusion through accessible digital banking services.',
          logo: null
        },
        {
          _id: '5',
          name: 'EduLearn',
          industry: 'EdTech',
          location: 'Cape Town',
          fundingStage: 'Pre-seed',
          fundingAmount: 150000,
          description: 'Interactive learning platform for primary school students with gamified curriculum and personalized learning paths.',
          logo: null
        }
      ];
      
      setRecommendedStartups(mockRecommendedStartups);
      
      setLoading(false);
    }, 800);
  }, [router]);

  const handleBookmark = (startupId: string, isBookmarked: boolean) => {
    // Update bookmark state
    if (isBookmarked) {
      // Remove from bookmarked list
      setBookmarkedStartups(prev => prev.filter(startup => startup._id !== startupId));
    } else {
      // Add to bookmarked list (find the startup from recommended list)
      const startupToAdd = recommendedStartups.find(startup => startup._id === startupId);
      if (startupToAdd && !bookmarkedStartups.some(s => s._id === startupId)) {
        setBookmarkedStartups(prev => [...prev, startupToAdd]);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-20">
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
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="glass-effect rounded-2xl p-8 text-center border border-slate-700/50 backdrop-blur-sm max-w-md">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-slate-300 text-lg mb-4">{error}</p>
            <button 
              onClick={() => router.push('/login')} 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Back to Login
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Investor Dashboard</h1>
          <p className="text-slate-300 text-lg">Welcome back, {user?.firstName || 'Investor'}!</p>
        </div>
        
        {/* Investor Profile Section */}
        <div className="glass-effect rounded-2xl mb-8 border border-slate-700/50 backdrop-blur-sm overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 px-8 py-6 border-b border-slate-700/50">
            <h2 className="text-2xl font-bold text-white">Investor Profile</h2>
          </div>
          
          {investor ? (
            <div className="p-8">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/4 mb-6 lg:mb-0 lg:pr-6">
                  <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-xl h-32 w-32 flex items-center justify-center border border-slate-700/50 mx-auto lg:mx-0">
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt="Profile" className="h-32 w-32 rounded-xl object-cover" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                </div>
                
                <div className="lg:w-3/4">
                  <h3 className="text-2xl font-bold text-white mb-4">{investor.companyName || `${user?.firstName} ${user?.lastName}`}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-indigo-900/50 text-indigo-300 text-sm px-3 py-1 rounded-full border border-indigo-700/50">
                      {investor.investorType || 'Investor'}
                    </span>
                    {investor.isVerified && (
                      <span className="bg-green-900/50 text-green-300 text-sm px-3 py-1 rounded-full border border-green-700/50 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">{investor.bio || 'No bio provided'}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {investor.investmentPreferences && (
                      <>
                        <div>
                          <h3 className="text-slate-400 text-sm mb-1">PREFERRED INDUSTRIES</h3>
                          <p className="text-white font-bold">
                            {investor.investmentPreferences.industries?.join(', ') || 'Not specified'}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-slate-400 text-sm mb-1">PREFERRED STAGES</h3>
                          <p className="text-white font-bold">
                            {investor.investmentPreferences.stages?.join(', ') || 'Not specified'}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-slate-400 text-sm mb-1">INVESTMENT RANGE</h3>
                          <p className="text-white font-bold">
                            {investor.investmentPreferences.minInvestment && investor.investmentPreferences.maxInvestment ? 
                              `R${investor.investmentPreferences.minInvestment.toLocaleString()} - R${investor.investmentPreferences.maxInvestment.toLocaleString()}` : 
                              'Not specified'}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-slate-400 text-sm mb-1">PREFERRED LOCATIONS</h3>
                          <p className="text-white font-bold">
                            {investor.investmentPreferences.locations?.join(', ') || 'Not specified'}
                          </p>
                        </div>
                      </>
                    )}
                    {investor.website && (
                      <div>
                        <h3 className="text-slate-400 text-sm mb-1">WEBSITE</h3>
                        <a href={investor.website} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                          {investor.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => router.push('/investor/edit')} 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-300 text-lg mb-4">You haven't completed your investor profile yet.</p>
              <button 
                onClick={() => router.push('/investor/create')} 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                Complete Investor Profile
              </button>
            </div>
          )}
        </div>
        
        {/* Bookmarked Startups Section */}
        <div className="glass-effect rounded-2xl mb-8 border border-slate-700/50 backdrop-blur-sm overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 px-8 py-6 border-b border-slate-700/50">
            <h2 className="text-2xl font-bold text-white">Bookmarked Startups</h2>
          </div>
          
          <div className="p-8">
            {bookmarkedStartups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedStartups.map(startup => (
                  <div key={startup._id} className="glass-effect rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
                    <div className="h-32 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 flex items-center justify-center border-b border-slate-700/50">
                      {startup.logo ? (
                        <img src={startup.logo} alt={`${startup.name} logo`} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          {startup.name.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-200">
                          {startup.name}
                        </h3>
                        <button 
                          onClick={() => handleBookmark(startup._id, true)}
                          className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 5h-2V3h-2v2H9V3H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H5V9h14v12z" />
                            <path d="M12 17l-5-5 1.4-1.4 3.6 3.6 3.6-3.6 1.4 1.4-5 5z" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-indigo-900/50 text-indigo-300 text-sm px-3 py-1 rounded-full border border-indigo-700/50">
                          {startup.industry}
                        </span>
                        <span className="bg-green-900/50 text-green-300 text-sm px-3 py-1 rounded-full border border-green-700/50">
                          {startup.fundingStage}
                        </span>
                      </div>
                      
                      <p className="text-slate-300 mb-6 line-clamp-2 leading-relaxed">{startup.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-400 font-bold">R{startup.fundingAmount?.toLocaleString()}</span>
                        <Link 
                          href={`/startups/${startup._id}`}
                          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200 flex items-center group"
                        >
                          <span>View Details</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <p className="text-slate-300 text-lg mb-4">You haven't bookmarked any startups yet.</p>
                <Link 
                  href="/startups"
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200 group flex items-center justify-center mx-auto"
                >
                  <span>Browse Startups</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Recommended Startups Section */}
        <div className="glass-effect rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 px-8 py-6 border-b border-slate-700/50">
            <h2 className="text-2xl font-bold text-white">Recommended For You</h2>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedStartups.map(startup => {
                const isBookmarked = bookmarkedStartups.some(s => s._id === startup._id);
                
                return (
                  <div key={startup._id} className="glass-effect rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
                    <div className="h-32 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 flex items-center justify-center border-b border-slate-700/50">
                      {startup.logo ? (
                        <img src={startup.logo} alt={`${startup.name} logo`} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          {startup.name.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-200">
                          {startup.name}
                        </h3>
                        <button 
                          onClick={() => handleBookmark(startup._id, isBookmarked)}
                          className="text-slate-400 hover:text-yellow-400 transition-colors duration-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-indigo-900/50 text-indigo-300 text-sm px-3 py-1 rounded-full border border-indigo-700/50">
                          {startup.industry}
                        </span>
                        <span className="bg-green-900/50 text-green-300 text-sm px-3 py-1 rounded-full border border-green-700/50">
                          {startup.fundingStage}
                        </span>
                      </div>
                      
                      <p className="text-slate-300 mb-6 line-clamp-2 leading-relaxed">{startup.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-400 font-bold">R{startup.fundingAmount?.toLocaleString()}</span>
                        <Link 
                          href={`/startups/${startup._id}`}
                          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200 flex items-center group"
                        >
                          <span>View Details</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/startups"
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                Browse All Startups
              </Link>
            </div>
          </div>
        </div>
      </div>
      
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
              InvestConnect
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</a>
              <a href="/investors" className="text-white px-3 py-2 rounded-md text-sm font-medium bg-slate-700/50">Investors</a>
              <a href="/startups" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Startups</a>
              <a href="/resources" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Resources</a>
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
              InvestConnect
            </h3>
            <p className="text-slate-400 mb-4 max-w-md">
              Connecting South African startups with the right investors. Building the future of African innovation.
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
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Guides</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Webinars</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Events</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">About</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Privacy</a></li>
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