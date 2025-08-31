'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 

// Define TypeScript interfaces for type safety
interface Startup {
  _id: string;
  name: string;
  industry: string;
  location: string;
  fundingStage: string;
  fundingAmount: number;
  equityOffered: number;
  description: string;
  logo: string | null;
}

export default function StartupsListing() {
  const router = useRouter();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookmarkedStartups, setBookmarkedStartups] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    fundingStage: '',
    fundingAmount: '',
    searchTerm: ''
  });
  
  // Available filter options
  const industries = ['All', 'FinTech', 'HealthTech', 'EdTech', 'CleanTech', 'AgriTech', 'E-commerce', 'SaaS', 'AI/ML', 'Other'];
  const locations = ['All', 'Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Other'];
  const fundingStages = ['All', 'Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Growth'];
  const fundingAmounts = [
    { label: 'All', value: '' },
    { label: 'Under R100K', value: '0-100000' },
    { label: 'R100K - R500K', value: '100000-500000' },
    { label: 'R500K - R1M', value: '500000-1000000' },
    { label: 'R1M - R5M', value: '1000000-5000000' },
    { label: 'R5M+', value: '5000000-' }
  ];

  useEffect(() => {
    // Simulate authentication check
    setTimeout(() => {
      setIsLoggedIn(true);
      setUserRole('investor');
    }, 100);

    // Mock data for startups
    const mockStartups: Startup[] = [
      {
        _id: '1',
        name: 'EcoSolutions',
        industry: 'CleanTech',
        location: 'Cape Town',
        fundingStage: 'Seed',
        fundingAmount: 500000,
        equityOffered: 10,
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
        equityOffered: 15,
        description: 'Connecting patients with healthcare providers in rural areas through telemedicine and mobile health clinics.',
        logo: null
      },
      {
        _id: '3',
        name: 'AgriTech Solutions',
        industry: 'AgriTech',
        location: 'Pretoria',
        fundingStage: 'Series A',
        fundingAmount: 1500000,
        equityOffered: 8,
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
        equityOffered: 12,
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
        equityOffered: 20,
        description: 'Interactive learning platform for primary school students with gamified curriculum and personalized learning paths.',
        logo: null
      },
      {
        _id: '6',
        name: 'LogisticsPlus',
        industry: 'E-commerce',
        location: 'Johannesburg',
        fundingStage: 'Series A',
        fundingAmount: 2000000,
        equityOffered: 7,
        description: 'Last-mile delivery solutions for e-commerce businesses with real-time tracking and optimized routing algorithms.',
        logo: null
      }
    ];
    
    setStartups(mockStartups);
    setFilteredStartups(mockStartups);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Apply filters whenever filters change
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = [...startups];
    
    // Apply industry filter
    if (filters.industry && filters.industry !== 'All') {
      filtered = filtered.filter(startup => startup.industry === filters.industry);
    }
    
    // Apply location filter
    if (filters.location && filters.location !== 'All') {
      filtered = filtered.filter(startup => startup.location === filters.location);
    }
    
    // Apply funding stage filter
    if (filters.fundingStage && filters.fundingStage !== 'All') {
      filtered = filtered.filter(startup => startup.fundingStage === filters.fundingStage);
    }
    
    // Apply funding amount filter
    if (filters.fundingAmount) {
      const [min, max] = filters.fundingAmount.split('-').map(Number);
      if (min && max) {
        filtered = filtered.filter(startup => startup.fundingAmount >= min && startup.fundingAmount <= max);
      } else if (min) {
        filtered = filtered.filter(startup => startup.fundingAmount >= min);
      }
    }
    
    // Apply search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(startup => 
        startup.name.toLowerCase().includes(term) || 
        startup.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredStartups(filtered);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookmark = (startupId: string, isBookmarked: boolean) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    if (userRole !== 'investor') {
      alert('Only investors can bookmark startups');
      return;
    }
    
    // Update bookmark state
    if (isBookmarked) {
      setBookmarkedStartups(prev => prev.filter(id => id !== startupId));
    } else {
      setBookmarkedStartups(prev => [...prev, startupId]);
    }
  };

  const resetFilters = () => {
    setFilters({
      industry: '',
      location: '',
      fundingStage: '',
      fundingAmount: '',
      searchTerm: ''
    });
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
          <div className="glass-effect rounded-2xl p-8 text-center border border-slate-700/50 backdrop-blur-sm max-w-md">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-slate-300 text-lg mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
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
              Discover South African
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Startups</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Find promising startups seeking investment across various industries and stages. 
              Connect with innovative founders building the future of African business.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-grow container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="glass-effect rounded-2xl p-6 mb-8 border border-slate-700/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Filter Startups</h2>
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
              <label htmlFor="industry" className="block text-sm font-medium text-slate-300 mb-2">
                Industry
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
              <label htmlFor="fundingStage" className="block text-sm font-medium text-slate-300 mb-2">
                Funding Stage
              </label>
              <select
                id="fundingStage"
                name="fundingStage"
                value={filters.fundingStage}
                onChange={handleFilterChange}
                className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white transition-all duration-200"
              >
                {fundingStages.map(stage => (
                  <option key={stage} value={stage} className="bg-slate-800 text-white">
                    {stage}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="fundingAmount" className="block text-sm font-medium text-slate-300 mb-2">
                Funding Amount
              </label>
              <select
                id="fundingAmount"
                name="fundingAmount"
                value={filters.fundingAmount}
                onChange={handleFilterChange}
                className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white transition-all duration-200"
              >
                {fundingAmounts.map(amount => (
                  <option key={amount.label} value={amount.value} className="bg-slate-800 text-white">
                    {amount.label}
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
            {filteredStartups.length} {filteredStartups.length === 1 ? 'startup' : 'startups'} found
          </p>
        </div>
        
        {filteredStartups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map(startup => {
              const isBookmarked = bookmarkedStartups.includes(startup._id);
              
              return (
                <div key={startup._id} className="glass-effect rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 group">
                  <div className="h-32 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 flex items-center justify-center border-b border-slate-700/50">
                    {startup.logo ? (
                      <img src={startup.logo} alt={`${startup.name} logo`} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {startup.name.substring(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-200">
                        {startup.name}
                      </h3>
                      {isLoggedIn && userRole === 'investor' && (
                        <button 
                          onClick={() => handleBookmark(startup._id, isBookmarked)}
                          className="text-slate-400 hover:text-yellow-400 transition-colors duration-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="bg-indigo-900/50 text-indigo-300 text-sm px-3 py-1 rounded-full border border-indigo-700/50">
                        {startup.industry}
                      </span>
                      <span className="bg-slate-800/50 text-slate-300 text-sm px-3 py-1 rounded-full border border-slate-700/50">
                        {startup.location}
                      </span>
                      <span className="bg-green-900/50 text-green-300 text-sm px-3 py-1 rounded-full border border-green-700/50">
                        {startup.fundingStage}
                      </span>
                    </div>
                    
                    <p className="text-slate-300 mb-6 line-clamp-3 leading-relaxed">{startup.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <p className="text-slate-400 text-xs">Funding Ask</p>
                        <p className="text-white font-bold mt-1 text-sm">R{startup.fundingAmount?.toLocaleString()}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <p className="text-slate-400 text-xs">Equity Offered</p>
                        <p className="text-white font-bold mt-1 text-sm">{startup.equityOffered}%</p>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/startups/${startup._id}`}
                      className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-effect rounded-2xl p-8 text-center border border-slate-700/50 backdrop-blur-sm">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-300 text-lg mb-4">No startups match your filter criteria.</p>
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
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</Link>
              <Link href="/startups" className="text-white px-3 py-2 rounded-md text-sm font-medium bg-slate-700/50">For Entrepreneurs</Link>
              <Link href="/investors" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">For Investors</Link>
              <Link href="/login" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                Login
              </Link>
              <Link href="/register" className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-400 hover:to-teal-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
                Sign Up
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
                className="block text-white font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                For Entrepreneurs
              </Link>
              <Link 
                href="/investors" 
                className="block text-slate-300 hover:text-white font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                For Investors
              </Link>
              <Link 
                href="/login" 
                className="block text-slate-300 hover:text-white font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="block w-full text-center bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
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
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Blog</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Guides</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Webinars</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Events</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">About</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Careers</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Contact</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Privacy</Link></li>
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