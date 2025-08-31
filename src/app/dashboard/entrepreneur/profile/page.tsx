'use client'; 
import { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define proper TypeScript interfaces
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'entrepreneur' | 'investor' | 'admin';
}

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  startup_name: string;
  industry: string;
  location: string;
  founding_year: string;
  funding_stage: string;
  funding_amount: string;
  equity_offered: string;
  use_of_funds: string;
  website: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  description: string;
  team_members: Array<{
    name: string;
    role: string;
    bio: string;
  }>;
  traction: string;
}

export default function StartupProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
    location: '',
    foundingYear: '',
    fundingStage: '',
    fundingAmount: '',
    equityOffered: '',
    useOfFunds: '',
    website: '',
    socialMedia: {
      linkedin: '',
      twitter: '',
      facebook: ''
    },
    teamMembers: [{ name: '', role: '', bio: '' }],
    traction: ''
  });

  // Mock data for development
  useEffect(() => {
    // Simulate authentication check
    setTimeout(() => {
      setUser({
        id: 'user123',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@example.com',
        role: 'entrepreneur'
      });

      // Simulate existing startup data
      const mockProfile: Profile = {
        id: 'startup123',
        first_name: 'John',
        last_name: 'Smith',
        startup_name: 'EcoSolutions',
        industry: 'CleanTech',
        location: 'Johannesburg',
        founding_year: '2020',
        funding_stage: 'Seed',
        funding_amount: '500000',
        equity_offered: '10',
        use_of_funds: 'Product development and marketing',
        website: 'https://ecosolutions.co.za',
        linkedin: 'https://linkedin.com/in/johnsmith',
        twitter: 'https://twitter.com/ecosolutions_sa',
        facebook: 'https://facebook.com/ecosolutionssa',
        description: 'We provide innovative solutions for sustainable living.',
        team_members: [
          { name: 'John Smith', role: 'CEO', bio: 'Experienced entrepreneur in the clean energy sector.' },
          { name: 'Sarah Johnson', role: 'CTO', bio: 'Software engineer with a passion for green technology.' }
        ],
        traction: '500+ active users, R1M in annual recurring revenue.'
      };

      setProfile(mockProfile);
      setFormData({
        name: mockProfile.startup_name,
        description: mockProfile.description,
        industry: mockProfile.industry,
        location: mockProfile.location,
        foundingYear: mockProfile.founding_year,
        fundingStage: mockProfile.funding_stage,
        fundingAmount: mockProfile.funding_amount,
        equityOffered: mockProfile.equity_offered,
        useOfFunds: mockProfile.use_of_funds,
        website: mockProfile.website,
        socialMedia: {
          linkedin: mockProfile.linkedin,
          twitter: mockProfile.twitter,
          facebook: mockProfile.facebook
        },
        teamMembers: mockProfile.team_members,
        traction: mockProfile.traction
      });

      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('socialMedia.')) {
      const socialKey = name.split('.')[1] as 'linkedin' | 'twitter' | 'facebook';
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTeamMemberChange = (index: number, field: 'name' | 'role' | 'bio', value: string) => {
    const newTeamMembers = [...formData.teamMembers];
    newTeamMembers[index][field] = value;
    setFormData(prev => ({
      ...prev,
      teamMembers: newTeamMembers
    }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', role: '', bio: '' }]
    }));
  };

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.description || !formData.industry) {
        throw new Error('Please fill in all required fields');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Startup profile saved successfully!');

      // Redirect to dashboard after a delay
      setTimeout(() => {
        router.push('/dashboard/entrepreneur');
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
        <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">PitchPoint</span>
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-grow flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">PitchPoint</span>
            </Link>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-300">Welcome, {user?.firstName}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">
              {profile ? 'Edit Your Startup Profile' : 'Create Your Startup Profile'}
            </h1>
            <p className="text-slate-300 mt-2">Complete your startup profile to connect with potential investors</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-emerald-300">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Startup Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200"
                    placeholder="Enter your startup name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-slate-300 mb-2">
                    Industry <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white transition-all duration-200"
                    required
                  >
                    <option value="">Select an industry</option>
                    <option value="fintech">FinTech</option>
                    <option value="healthtech">HealthTech</option>
                    <option value="edtech">EdTech</option>
                    <option value="cleantech">CleanTech</option>
                    <option value="agritech">AgriTech</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="saas">SaaS</option>
                    <option value="ai">AI/ML</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="iot">IoT</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200"
                    placeholder="e.g., Johannesburg, Cape Town"
                  />
                </div>

                <div>
                  <label htmlFor="foundingYear" className="block text-sm font-medium text-slate-300 mb-2">Founding Year</label>
                  <input
                    id="foundingYear"
                    name="foundingYear"
                    type="text"
                    value={formData.foundingYear}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200"
                    placeholder="e.g., 2020"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200 resize-y"
                  placeholder="Describe your startup, mission, and vision..."
                  required
                ></textarea>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-6">Funding Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fundingStage" className="block text-sm font-medium text-slate-300 mb-2">Funding Stage</label>
                  <select
                    id="fundingStage"
                    name="fundingStage"
                    value={formData.fundingStage}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white transition-all duration-200"
                  >
                    <option value="">Select funding stage</option>
                    <option value="pre-seed">Pre-seed</option>
                    <option value="seed">Seed</option>
                    <option value="series-a">Series A</option>
                    <option value="series-b">Series B</option>
                    <option value="series-c">Series C</option>
                    <option value="revenue-generating">Revenue Generating</option>
                    <option value="bootstrapped">Bootstrapped</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="fundingAmount" className="block text-sm font-medium text-slate-300 mb-2">Funding Amount (ZAR)</label>
                  <input
                    id="fundingAmount"
                    name="fundingAmount"
                    type="text"
                    value={formData.fundingAmount}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200"
                    placeholder="e.g., 500000"
                  />
                </div>

                <div>
                  <label htmlFor="equityOffered" className="block text-sm font-medium text-slate-300 mb-2">Equity Offered (%)</label>
                  <input
                    id="equityOffered"
                    name="equityOffered"
                    type="text"
                    value={formData.equityOffered}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200"
                    placeholder="e.g., 10"
                  />
                </div>

                <div>
                  <label htmlFor="useOfFunds" className="block text-sm font-medium text-slate-300 mb-2">Use of Funds</label>
                  <input
                    id="useOfFunds"
                    name="useOfFunds"
                    type="text"
                    value={formData.useOfFunds}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200"
                    placeholder="e.g., Product development, marketing"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-6">Online Presence</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-slate-300 mb-2">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200"
                    placeholder="https://yoursite.com"
                  />
                </div>

                <div>
                  <label htmlFor="socialMedia.linkedin" className="block text-sm font-medium text-slate-300 mb-2">LinkedIn</label>
                  <input
                    id="socialMedia.linkedin"
                    name="socialMedia.linkedin"
                    type="url"
                    value={formData.socialMedia.linkedin}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div>
                  <label htmlFor="socialMedia.twitter" className="block text-sm font-medium text-slate-300 mb-2">Twitter/X</label>
                  <input
                    id="socialMedia.twitter"
                    name="socialMedia.twitter"
                    type="url"
                    value={formData.socialMedia.twitter}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200"
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>

                <div>
                  <label htmlFor="socialMedia.facebook" className="block text-sm font-medium text-slate-300 mb-2">Facebook</label>
                  <input
                    id="socialMedia.facebook"
                    name="socialMedia.facebook"
                    type="url"
                    value={formData.socialMedia.facebook}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Team Members</h2>
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                >
                  Add Member
                </button>
              </div>

              {formData.teamMembers.map((member, index) => (
                <div key={index} className="mb-6 p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                        className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200"
                        placeholder="Full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                        className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200"
                        placeholder="e.g., CEO, CTO"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                      <textarea
                        value={member.bio}
                        onChange={(e) => handleTeamMemberChange(index, 'bio', e.target.value)}
                        rows={2}
                        className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200 resize-y"
                        placeholder="Brief bio of the team member..."
                      ></textarea>
                    </div>
                  </div>

                  {formData.teamMembers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTeamMember(index)}
                      className="mt-4 text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200"
                    >
                      Remove Member
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-6">Traction & Milestones</h2>
              
              <div>
                <label htmlFor="traction" className="block text-sm font-medium text-slate-300 mb-2">Traction</label>
                <textarea
                  id="traction"
                  name="traction"
                  value={formData.traction}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400 transition-all duration-200 resize-y"
                  placeholder="Describe your traction, milestones, user base, revenue, etc."
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-slate-700/50">
              <button
                type="button"
                onClick={() => router.push('/dashboard/entrepreneur')}
                className="px-6 py-3 border border-slate-600 text-slate-300 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:from-slate-600 disabled:to-slate-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </div>
                ) : (
                  'Save Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-slate-900/80 border-t border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">PitchPoint</h3>
              <p className="text-slate-400 mb-4 max-w-md">
                Connecting South African entrepreneurs with investors to fuel innovation and economic growth.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link href="/investors" className="text-slate-400 hover:text-white transition-colors duration-200">For Investors</Link></li>
                <li><Link href="/startups" className="text-slate-400 hover:text-white transition-colors duration-200">For Startups</Link></li>
                <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors duration-200">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors duration-200">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
              </ul>
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