'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define TypeScript interfaces for type safety
interface InvestmentPreferences {
  industries: string[];
  stages: string[];
  locations: string[];
  minInvestment: number;
  maxInvestment: number;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
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

export default function InvestorsListing() {
  const router = useRouter();
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [filteredInvestors, setFilteredInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    investorType: '',
    industry: '',
    location: '',
    investmentSize: '',
    searchTerm: ''
  });
  
  // Available filter options
  const investorTypes = ['All', 'Angel Investor', 'Venture Capital', 'Private Equity', 'Corporate Investor', 'Family Office', 'Accelerator/Incubator'];
  const industries = ['All', 'FinTech', 'HealthTech', 'EdTech', 'CleanTech', 'AgriTech', 'E-commerce', 'SaaS', 'AI/ML', 'Other'];
  const locations = ['All', 'Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Other'];
  const investmentSizes = [
    { label: 'All', value: '' },
    { label: 'Under R100K', value: '0-100000' },
    { label: 'R100K - R500K', value: '100000-500000' },
    { label: 'R500K - R1M', value: '500000-1000000' },
    { label: 'R1M - R5M', value: '1000000-5000000' },
    { label: 'R5M+', value: '5000000-' }
  ];

  useEffect(() => {
    // For demo purposes, we'll use mock data
    const mockInvestors: Investor[] = [
      {
        _id: '1',
        user: {
          _id: 'user1',
          firstName: 'Michael',
          lastName: 'Johnson'
        },
        companyName: 'Horizon Ventures',
        investorType: 'Venture Capital',
        bio: 'Horizon Ventures is a leading VC firm focused on early-stage tech startups in South Africa. We invest in innovative companies with high growth potential.',
        investmentPreferences: {
          industries: ['FinTech', 'HealthTech', 'SaaS'],
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
      },
      {
        _id: '2',
        user: {
          _id: 'user2',
          firstName: 'Sarah',
          lastName: 'Williams'
        },
        companyName: 'Impact Angels',
        investorType: 'Angel Investor',
        bio: 'Impact Angels is a network of angel investors supporting social impact startups across South Africa. We focus on businesses that create positive change.',
        investmentPreferences: {
          industries: ['CleanTech', 'EdTech', 'AgriTech'],
          stages: ['Pre-seed', 'Seed'],
          locations: ['Durban', 'Cape Town'],
          minInvestment: 100000,
          maxInvestment: 1000000
        },
        portfolio: [
          { name: 'EcoSolar', industry: 'CleanTech' },
          { name: 'LearnConnect', industry: 'EdTech' }
        ],
        website: 'https://impactangels.co.za',
        isVerified: true
      },
      {
        _id: '3',
        user: {
          _id: 'user3',
          firstName: 'David',
          lastName: 'Nkosi'
        },
        companyName: 'Nkosi Investments',
        investorType: 'Family Office',
        bio: 'Nkosi Investments is a family office investing in diverse sectors across South Africa. We take a long-term approach to building sustainable businesses.',
        investmentPreferences: {
          industries: ['E-commerce', 'FinTech', 'AgriTech'],
          stages: ['Seed', 'Series A', 'Series B'],
          locations: ['Johannesburg', 'Pretoria'],
          minInvestment: 1000000,
          maxInvestment: 10000000
        },
        portfolio: [
          { name: 'FarmTech', industry: 'AgriTech' },
          { name: 'ShopEasy', industry: 'E-commerce' },
          { name: 'PaySmart', industry: 'FinTech' }
        ],
        website: 'https://nkosiinvestments.co.za',
        isVerified: true
      },
      {
        _id: '4',
        user: {
          _id: 'user4',
          firstName: 'Emma',
          lastName: 'Patel'
        },
        companyName: 'TechGrowth Partners',
        investorType: 'Venture Capital',
        bio: 'TechGrowth Partners invests in technology startups with disruptive business models. We provide capital, mentorship, and strategic guidance.',
        investmentPreferences: {
          industries: ['AI/ML', 'SaaS', 'FinTech'],
          stages: ['Seed', 'Series A'],
          locations: ['Cape Town', 'Johannesburg'],
          minInvestment: 750000,
          maxInvestment: 3000000
        },
        portfolio: [
          { name: 'AIAnalytics', industry: 'AI/ML' },
          { name: 'CloudSuite', industry: 'SaaS' }
        ],
        website: 'https://techgrowth.co.za',
        isVerified: true
      },
      {
        _id: '5',
        user: {
          _id: 'user5',
          firstName: 'James',
          lastName: 'van der Merwe'
        },
        companyName: 'Startup Accelerator SA',
        investorType: 'Accelerator/Incubator',
        bio: 'Startup Accelerator SA provides funding, mentorship, and resources to early-stage startups. Our 6-month program helps founders validate and scale their businesses.',
        investmentPreferences: {
          industries: ['FinTech', 'HealthTech', 'EdTech', 'E-commerce'],
          stages: ['Pre-seed', 'Seed'],
          locations: ['Cape Town', 'Johannesburg', 'Durban'],
          minInvestment: 50000,
          maxInvestment: 500000
        },
        portfolio: [
          { name: 'HealthConnect', industry: 'HealthTech' },
          { name: 'EduLearn', industry: 'EdTech' },
          { name: 'ShopLocal', industry: 'E-commerce' }
        ],
        website: 'https://startupacceleratorsa.co.za',
        isVerified: true
      },
      {
        _id: '6',
        user: {
          _id: 'user6',
          firstName: 'Thabo',
          lastName: 'Molefe'
        },
        companyName: 'Molefe Capital',
        investorType: 'Private Equity',
        bio: 'Molefe Capital invests in established businesses looking to scale. We focus on companies with proven business models and strong growth potential.',
        investmentPreferences: {
          industries: ['AgriTech', 'CleanTech', 'FinTech'],
          stages: ['Series A', 'Series B', 'Growth'],
          locations: ['Johannesburg', 'Pretoria', 'Durban'],
          minInvestment: 2000000,
          maxInvestment: 15000000
        },
        portfolio: [
          { name: 'GreenEnergy', industry: 'CleanTech' },
          { name: 'AgriSolutions', industry: 'AgriTech' }
        ],
        website: 'https://molefecapital.co.za',
        isVerified: true
      }
    ];
    
    setInvestors(mockInvestors);
    setFilteredInvestors(mockInvestors);
    setLoading(false);
    
    // Simulate authentication check
    setTimeout(() => {
      setIsLoggedIn(true);
      setUserRole('entrepreneur');
    }, 100);
  }, []);

  useEffect(() => {
    // Apply filters whenever filters change
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = [...investors];
    
    // Apply investor type filter
    if (filters.investorType && filters.investorType !== 'All') {
      filtered = filtered.filter(investor => investor.investorType === filters.investorType);
    }
    
    // Apply industry filter
    if (filters.industry && filters.industry !== 'All') {
      filtered = filtered.filter(investor => 
        investor.investmentPreferences.industries.includes(filters.industry)
      );
    }
    
    // Apply location filter
    if (filters.location && filters.location !== 'All') {
      filtered = filtered.filter(investor => 
        investor.investmentPreferences.locations.includes(filters.location)
      );
    }
    
    // Apply investment size filter
    if (filters.investmentSize) {
      const [min, max] = filters.investmentSize.split('-').map(Number);
      if (min && max) {
        filtered = filtered.filter(investor => 
          investor.investmentPreferences.minInvestment <= max && 
          investor.investmentPreferences.maxInvestment >= min
        );
      } else if (min) {
        filtered = filtered.filter(investor => 
          investor.investmentPreferences.maxInvestment >= min
        );
      }
    }
    
    // Apply search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(investor => 
        investor.companyName.toLowerCase().includes(term) || 
        investor.bio.toLowerCase().includes(term) ||
        (investor.user.firstName + ' ' + investor.user.lastName).toLowerCase().includes(term)
      );
    }
    
    setFilteredInvestors(filtered);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      investorType: '',
      industry: '',
      location: '',
      investmentSize: '',
      searchTerm: ''
    });
  };

  const handleContactInvestor = (investorId: string) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    if (userRole !== 'entrepreneur') {
      alert('Only entrepreneurs can contact investors');
      return;
    }
    
    // In a real app, this would navigate to a messaging page or open a modal
    router.push(`/messages/new?recipient=${investorId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p className="text-red-700">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find the Right
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Investors</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Connect with investors looking to fund South African startups across various industries and stages. 
              Discover funding partners who align with your vision and growth trajectory.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-grow container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="glass-effect rounded-2xl p-6 mb-8 border border-slate-700/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Filter Investors</h2>
            <button 
              onClick={resetFilters}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200 flex items-center mt-2 md:mt-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Reset Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label htmlFor="investorType" className="block text-sm font-medium text-slate-300 mb-2">
                Investor Type
              </label>
              <select
                id="investorType"
                name="investorType"
                value={filters.investorType}
                onChange={handleFilterChange}
                className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white transition-all duration-200"
              >
                {investorTypes.map(type => (
                  <option key={type} value={type} className="bg-slate-800 text-white">
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-slate-300 mb-2">
                Industry Focus
              </label>
              <select
                id="industry"
                name="industry"
                value={filters.industry}
                onChange={handleFilterChange}
                className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white transition-all duration-200"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry} className="bg-slate-800 text-white">
                    {industry}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">
                Location
              </label>
              <select
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white transition-all duration-200"
              >
                {locations.map(location => (
                  <option key={location} value={location} className="bg-slate-800 text-white">
                    {location}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="investmentSize" className="block text-sm font-medium text-slate-300 mb-2">
                Investment Size
              </label>
              <select
                id="investmentSize"
                name="investmentSize"
                value={filters.investmentSize}
                onChange={handleFilterChange}
                className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white transition-all duration-200"
              >
                {investmentSizes.map(size => (
                  <option key={size.label} value={size.value} className="bg-slate-800 text-white">
                    {size.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="searchTerm" className="block text-sm font-medium text-slate-300 mb-2">
                Search
              </label>
              <input
                type="text"
                id="searchTerm"
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleFilterChange}
                placeholder="Search by name or description"
                className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200"
              />
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="mb-6">
          <p className="text-slate-300 text-lg">
            {filteredInvestors.length} {filteredInvestors.length === 1 ? 'investor' : 'investors'} found
          </p>
        </div>
        
        {filteredInvestors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestors.map(investor => (
              <div key={investor._id} className="glass-effect rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 group">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-200">
                        {investor.companyName}
                      </h3>
                      <p className="text-slate-400 text-sm">{investor.investorType}</p>
                    </div>
                    {investor.isVerified && (
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-400 text-xs font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-slate-300 mb-6 line-clamp-3 leading-relaxed">{investor.bio}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">Investment Focus</h4>
                    <div className="flex flex-wrap gap-2">
                      {investor.investmentPreferences.industries.map((industry) => (
                        <span key={industry} className="bg-indigo-900/50 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-700/50">
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <p className="text-slate-400 text-xs">Investment Range</p>
                      <p className="text-white font-bold mt-1 text-sm">
                        R{investor.investmentPreferences.minInvestment?.toLocaleString()} - 
                        R{investor.investmentPreferences.maxInvestment?.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <p className="text-slate-400 text-xs">Preferred Stages</p>
                      <p className="text-white font-bold mt-1 text-sm">{investor.investmentPreferences.stages.join(', ')}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <Link 
                      href={`/investors/${investor._id}`}
                      className="w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      View Profile
                    </Link>
                    
                    {isLoggedIn && userRole === 'entrepreneur' && (
                      <button 
                        onClick={() => handleContactInvestor(investor._id)}
                        className="w-full text-center border border-indigo-500 text-indigo-300 px-6 py-3 rounded-xl hover:bg-indigo-500/20 transition-all duration-200 font-semibold"
                      >
                        Contact
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-effect rounded-2xl p-8 text-center border border-slate-700/50 backdrop-blur-sm">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-300 text-lg mb-4">No investors match your filter criteria.</p>
            <button 
              onClick={resetFilters}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

// Mock Navbar component
function Navbar({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean; setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
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
              <Link href="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</Link>
              <Link href="/startups" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">For Entrepreneurs</Link>
              <Link href="/investors" className="text-white px-3 py-2 rounded-md text-sm font-medium bg-slate-700/50">For Investors</Link>
              <Link href="/login" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                Sign In
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-t border-slate-700/50 animate-fadeIn">
            <div className="px-4 py-4 space-y-4">
              <Link 
                href="/" 
                className="block text-slate-300 hover:text-white font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/startups" 
                className="block text-slate-300 hover:text-white font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                For Entrepreneurs
              </Link>
              <Link 
                href="/investors" 
                className="block text-white font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                For Investors
              </Link>
              <Link 
                href="/login" 
                className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
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
              <Link href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.064.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
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