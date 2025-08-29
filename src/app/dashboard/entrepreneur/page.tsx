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

interface Startup {
  _id: string;
  name: string;
  logo: string | null;
  description: string;
  industry: string;
  location: string;
  fundingStage: string;
  fundingAmount: number;
  equityOffered: number;
  foundingYear: number;
  website: string;
}

export default function EntrepreneurDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    views: 0,
    contacts: 0,
    bookmarks: 0,
  });

  useEffect(() => {
    // Simulate authentication check
    setTimeout(() => {
      // Mock user data
      const mockUser: User = {
        _id: 'user123',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@ecosolutions.co.za',
        role: 'entrepreneur'
      };
      
      setUser(mockUser);
      
      // Mock startup data
      const mockStartup: Startup = {
        _id: 'startup123',
        name: 'EcoSolutions',
        logo: null,
        description: 'EcoSolutions is developing innovative sustainable energy solutions for residential buildings in South Africa. Our patented solar panel technology increases efficiency by 30% compared to standard panels while reducing costs by 20%. We aim to make renewable energy accessible to middle-income households across the country.',
        industry: 'CleanTech',
        location: 'Cape Town',
        fundingStage: 'Seed',
        fundingAmount: 500000,
        equityOffered: 10,
        foundingYear: 2020,
        website: 'https://ecosolutions.co.za'
      };
      
      setStartup(mockStartup);
      
      // Set mock stats
      setStats({
        views: 45,
        contacts: 12,
        bookmarks: 8,
      });
      
      setLoading(false);
    }, 500);
  }, [router]);

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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Entrepreneur Dashboard</h1>
          <p className="text-slate-300 text-lg">Welcome back, {user?.firstName || 'Entrepreneur'}!</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-900/50 text-indigo-400 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Profile Views</p>
                <p className="text-2xl font-bold text-white">{stats.views}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-900/50 text-green-400 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Contact Requests</p>
                <p className="text-2xl font-bold text-white">{stats.contacts}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-900/50 text-yellow-400 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Investor Bookmarks</p>
                <p className="text-2xl font-bold text-white">{stats.bookmarks}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Startup Profile Section */}
        <div className="glass-effect rounded-2xl mb-8 border border-slate-700/50 backdrop-blur-sm">
          <div className="p-6 border-b border-slate-700/50">
            <h2 className="text-2xl font-bold text-white">Startup Profile</h2>
          </div>
          
          {startup ? (
            <div className="p-6">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/4 mb-6 lg:mb-0 lg:pr-6">
                  <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-xl h-40 w-40 flex items-center justify-center border border-slate-700/50 mx-auto lg:mx-0">
                    {startup.logo ? (
                      <img src={startup.logo} alt={`${startup.name} logo`} className="max-h-full max-w-full rounded-lg" />
                    ) : (
                      <span className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {startup.name.substring(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="lg:w-3/4">
                  <h3 className="text-2xl font-bold text-white mb-4">{startup.name}</h3>
                  
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
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">{startup.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">FUNDING ASK</p>
                      <p className="text-white font-bold">R{startup.fundingAmount?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">EQUITY OFFERED</p>
                      <p className="text-white font-bold">{startup.equityOffered}%</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">FOUNDED</p>
                      <p className="text-white font-bold">{startup.foundingYear}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">WEBSITE</p>
                      <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                        {startup.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => router.push('/startup/edit')} 
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
              <p className="text-slate-300 text-lg mb-4">You haven't created a startup profile yet.</p>
              <button 
                onClick={() => router.push('/startup/create')} 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                Create Startup Profile
              </button>
            </div>
          )}
        </div>
        
        {/* Messages Section */}
        <div className="glass-effect rounded-2xl border border-slate-700/50 backdrop-blur-sm">
          <div className="p-6 border-b border-slate-700/50">
            <h2 className="text-2xl font-bold text-white">Recent Messages</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {/* Mock messages for now */}
              <div className="border-b border-slate-700/50 pb-6">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">SJ</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">Sarah Johnson</p>
                    <p className="text-indigo-400 text-sm">Venture Capital Partners</p>
                  </div>
                  <div className="ml-auto text-sm text-slate-400">2 days ago</div>
                </div>
                <p className="text-slate-300 leading-relaxed">I'm interested in learning more about your growth projections. Do you have time for a call next week? I've been following your work with EcoSolutions and believe there's strong potential for collaboration.</p>
              </div>
              
              <div className="border-b border-slate-700/50 pb-6">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-teal-600 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">MN</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">Michael Ndlovu</p>
                    <p className="text-green-400 text-sm">Angel Investor</p>
                  </div>
                  <div className="ml-auto text-sm text-slate-400">5 days ago</div>
                </div>
                <p className="text-slate-300 leading-relaxed">Your startup looks promising. I'd like to schedule a meeting to discuss potential investment opportunities. I'm particularly impressed with your approach to sustainable pest control and the traction you've gained in the Johannesburg market.</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => router.push('/messages')} 
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200 group flex items-center justify-center mx-auto"
              >
                <span>View All Messages</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
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
              <a href="/investors" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Investors</a>
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