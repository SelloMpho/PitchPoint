'use client';

import Link from 'next/link'; // Added the missing import
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

interface InvestmentPreferences {
  industries: string[];
  stages: string[];
  locations: string[];
  minInvestment: number;
  maxInvestment: number;
}

interface SocialMedia {
  linkedin: string;
  twitter: string;
  facebook: string;
}

interface FormData {
  companyName: string;
  investorType: string;
  bio: string;
  investmentPreferences: InvestmentPreferences;
  website: string;
  socialMedia: SocialMedia;
}

export default function InvestorProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [investor, setInvestor] = useState<any>(null);
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    investorType: '',
    bio: '',
    investmentPreferences: {
      industries: [],
      stages: [],
      locations: [],
      minInvestment: 0,
      maxInvestment: 0
    },
    website: '',
    socialMedia: {
      linkedin: '',
      twitter: '',
      facebook: ''
    }
  });

  // Options for form selects
  const investorTypeOptions = [
    'Angel Investor',
    'Venture Capital',
    'Private Equity',
    'Corporate Investor',
    'Family Office',
    'Accelerator/Incubator',
    'Impact Investor',
    'Other'
  ];

  const industryOptions = [
    'FinTech',
    'HealthTech',
    'EdTech',
    'AgriTech',
    'E-commerce',
    'SaaS',
    'AI/ML',
    'CleanTech',
    'Blockchain',
    'IoT',
    'Logistics',
    'Manufacturing',
    'Real Estate',
    'Food & Beverage',
    'Travel & Tourism',
    'Media & Entertainment',
    'Other'
  ];

  const stageOptions = [
    'Pre-seed',
    'Seed',
    'Series A',
    'Series B',
    'Series C',
    'Series D+',
    'Growth',
    'Mature'
  ];

  const locationOptions = [
    'Cape Town',
    'Johannesburg',
    'Durban',
    'Pretoria',
    'Port Elizabeth',
    'East London',
    'Bloemfontein',
    'Western Cape',
    'Gauteng',
    'KwaZulu-Natal',
    'Eastern Cape',
    'Free State',
    'North West',
    'Mpumalanga',
    'Limpopo',
    'Northern Cape',
    'Other'
  ];

  useEffect(() => {
    // Simulate authentication check
    setTimeout(() => {
      setUser({
        _id: 'user123',
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael@horizonventures.co.za',
        role: 'investor'
      });

      // Simulate existing investor data
      const mockInvestor = {
        _id: 'investor123',
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
        website: 'https://horizonventures.co.za',
        socialMedia: {
          linkedin: 'https://linkedin.com/company/horizon-ventures-sa',
          twitter: 'https://twitter.com/horizonventures_sa',
          facebook: ''
        }
      };

      setInvestor(mockInvestor);
      
      // Populate form with existing data
      setFormData({
        companyName: mockInvestor.companyName || '',
        investorType: mockInvestor.investorType || '',
        bio: mockInvestor.bio || '',
        investmentPreferences: {
          industries: mockInvestor.investmentPreferences?.industries || [],
          stages: mockInvestor.investmentPreferences?.stages || [],
          locations: mockInvestor.investmentPreferences?.locations || [],
          minInvestment: mockInvestor.investmentPreferences?.minInvestment || 0,
          maxInvestment: mockInvestor.investmentPreferences?.maxInvestment || 0
        },
        website: mockInvestor.website || '',
        socialMedia: {
          linkedin: mockInvestor.socialMedia?.linkedin || '',
          twitter: mockInvestor.socialMedia?.twitter || '',
          facebook: mockInvestor.socialMedia?.facebook || ''
        }
      });
      
      setLoading(false);
    }, 800);
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested objects like socialMedia.linkedin
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => {
        if (parent === 'investmentPreferences') {
          return {
            ...prev,
            investmentPreferences: {
              ...prev.investmentPreferences,
              [child]: value
            }
          };
        } else if (parent === 'socialMedia') {
          return {
            ...prev,
            socialMedia: {
              ...prev.socialMedia,
              [child]: value
            }
          };
        }
        return prev;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMultiSelectChange = (field: string, value: string) => {
    const path = field.split('.');
    const parent = path[0];
    const child = path[1];
    
    setFormData(prev => {
      if (parent === 'investmentPreferences') {
        const currentValues = prev.investmentPreferences[child as keyof InvestmentPreferences] as string[];
        
        // Toggle selection
        if (currentValues.includes(value)) {
          return {
            ...prev,
            investmentPreferences: {
              ...prev.investmentPreferences,
              [child]: currentValues.filter(item => item !== value)
            }
          };
        } else {
          return {
            ...prev,
            investmentPreferences: {
              ...prev.investmentPreferences,
              [child]: [...currentValues, value]
            }
          };
        }
      }
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      // Validate form data
      if (!formData.companyName || !formData.investorType || !formData.bio) {
        throw new Error('Please fill in all required fields');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('Investor profile saved successfully!');
      
      // Redirect to dashboard after a delay
      setTimeout(() => {
        router.push('/dashboard/investor');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto glass-effect rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 px-8 py-6 border-b border-slate-700/50">
            <h1 className="text-2xl font-bold text-white">
              {investor ? 'Edit Your Investor Profile' : 'Create Your Investor Profile'}
            </h1>
            <p className="text-slate-300 mt-2">Complete your investor profile to connect with promising startups</p>
          </div>
          
          <div className="p-8">
            {error && (
              <div className="mb-6 glass-effect rounded-2xl p-6 border border-red-500/20 backdrop-blur-sm">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-300">{error}</p>
                </div>
              </div>
            )}
            
            {success && (
              <div className="mb-6 glass-effect rounded-2xl p-6 border border-green-500/20 backdrop-blur-sm">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-300">{success}</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div className="mb-8">
                <div className="flex items-center mb-6 pb-3 border-b border-slate-700/50">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m5 10v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1v5h6z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white">Basic Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-slate-300 mb-2">
                      Company/Fund Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200"
                      placeholder="Enter your company or fund name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="investorType" className="block text-sm font-medium text-slate-300 mb-2">
                      Investor Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="investorType"
                      name="investorType"
                      value={formData.investorType}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white transition-all duration-200"
                      required
                    >
                      <option value="">Select Investor Type</option>
                      {investorTypeOptions.map(option => (
                        <option key={option} value={option} className="bg-slate-800 text-white">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="bio" className="block text-sm font-medium text-slate-300 mb-2">
                    Bio/Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Provide a description of your investment firm, philosophy, and approach. What makes your firm unique? How do you add value to your portfolio companies?"
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200 resize-none"
                    required
                  />
                </div>
              </div>
              
              {/* Investment Preferences */}
              <div className="mb-8">
                <div className="flex items-center mb-6 pb-3 border-b border-slate-700/50">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white">Investment Preferences</h2>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Industries of Interest
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {industryOptions.map(industry => (
                      <div key={industry} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`industry-${industry}`}
                          checked={formData.investmentPreferences.industries.includes(industry)}
                          onChange={() => handleMultiSelectChange('investmentPreferences.industries', industry)}
                          className="h-5 w-5 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 transition duration-200"
                        />
                        <label htmlFor={`industry-${industry}`} className="ml-3 block text-sm text-slate-300 cursor-pointer">
                          {industry}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Investment Stages
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {stageOptions.map(stage => (
                      <div key={stage} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`stage-${stage}`}
                          checked={formData.investmentPreferences.stages.includes(stage)}
                          onChange={() => handleMultiSelectChange('investmentPreferences.stages', stage)}
                          className="h-5 w-5 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 transition duration-200"
                        />
                        <label htmlFor={`stage-${stage}`} className="ml-3 block text-sm text-slate-300 cursor-pointer">
                          {stage}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Preferred Locations
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {locationOptions.map(location => (
                      <div key={location} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`location-${location}`}
                          checked={formData.investmentPreferences.locations.includes(location)}
                          onChange={() => handleMultiSelectChange('investmentPreferences.locations', location)}
                          className="h-5 w-5 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 transition duration-200"
                        />
                        <label htmlFor={`location-${location}`} className="ml-3 block text-sm text-slate-300 cursor-pointer">
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="investmentPreferences.minInvestment" className="block text-sm font-medium text-slate-300 mb-2">
                      Minimum Investment (R)
                    </label>
                    <input
                      type="number"
                      id="investmentPreferences.minInvestment"
                      name="investmentPreferences.minInvestment"
                      value={formData.investmentPreferences.minInvestment}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="Amount in Rand"
                      className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="investmentPreferences.maxInvestment" className="block text-sm font-medium text-slate-300 mb-2">
                      Maximum Investment (R)
                    </label>
                    <input
                      type="number"
                      id="investmentPreferences.maxInvestment"
                      name="investmentPreferences.maxInvestment"
                      value={formData.investmentPreferences.maxInvestment}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="Amount in Rand"
                      className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
              
              {/* Web Presence */}
              <div className="mb-8">
                <div className="flex items-center mb-6 pb-3 border-b border-slate-700/50">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white">Web Presence</h2>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="website" className="block text-sm font-medium text-slate-300 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://"
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="socialMedia.linkedin" className="block text-sm font-medium text-slate-300 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      id="socialMedia.linkedin"
                      name="socialMedia.linkedin"
                      value={formData.socialMedia.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/company/"
                      className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="socialMedia.twitter" className="block text-sm font-medium text-slate-300 mb-2">
                      Twitter
                    </label>
                    <input
                      type="url"
                      id="socialMedia.twitter"
                      name="socialMedia.twitter"
                      value={formData.socialMedia.twitter}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/"
                      className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="socialMedia.facebook" className="block text-sm font-medium text-slate-300 mb-2">
                      Facebook
                    </label>
                    <input
                      type="url"
                      id="socialMedia.facebook"
                      name="socialMedia.facebook"
                      value={formData.socialMedia.facebook}
                      onChange={handleInputChange}
                      placeholder="https://facebook.com/"
                      className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-slate-700/50">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard/investor')}
                  className="px-6 py-3 border border-slate-600 text-slate-300 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : 'Save Profile'}
                </button>
              </div>
            </form>
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
              <Link href="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</Link>
              <Link href="/investors" className="text-white px-3 py-2 rounded-md text-sm font-medium bg-slate-700/50">Investors</Link>
              <Link href="/startups" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Startups</Link>
              <Link href="/resources" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Resources</Link>
              <Link href="/login" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                Sign In
              </Link>
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