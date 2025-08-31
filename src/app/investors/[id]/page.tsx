'use client'; 
import { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';


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

interface PortfolioItem {
  name: string;
  industry: string;
  description: string;
  website: string;
}

interface SocialMedia {
  linkedin?: string;
  twitter?: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
}

interface Investor {
  _id: string;
  user: User;
  companyName: string;
  investorType: string;
  bio: string;
  investmentPreferences: InvestmentPreferences;
  portfolio: PortfolioItem[];
  website: string;
  socialMedia: SocialMedia;
  isVerified: boolean;
  investmentCriteria: string[];
  investmentProcess: string[];
  team: TeamMember[];
}

export default function InvestorDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  const [investor, setInvestor] = useState<Investor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate authentication check
    setTimeout(() => {
      setIsLoggedIn(true);
      setUserRole('entrepreneur');
    }, 100);

    // Mock data for Horizon Ventures
    const mockInvestor: Investor = {
      _id: id,
      user: { _id: 'user1', firstName: 'Michael', lastName: 'Johnson' },
      companyName: 'Horizon Ventures',
      investorType: 'Venture Capital',
      bio: `Horizon Ventures is a leading VC firm focused on early-stage tech startups in South Africa. 
We invest in innovative companies with high growth potential and strong founding teams. 
Our investment approach is hands-on, providing not just capital but also strategic guidance, industry connections, and operational support to help our portfolio companies scale rapidly.`,
      investmentPreferences: {
        industries: ['FinTech', 'HealthTech', 'SaaS', 'AI/ML'],
        stages: ['Seed', 'Series A'],
        locations: ['Cape Town', 'Johannesburg'],
        minInvestment: 500000,
        maxInvestment: 5000000,
      },
      portfolio: [
        {
          name: 'PayFast',
          industry: 'FinTech',
          description: 'Leading payment gateway in South Africa',
          website: 'https://payfast.co.za',
        },
        {
          name: 'MediHealth',
          industry: 'HealthTech',
          description: 'Telemedicine platform connecting patients with healthcare providers',
          website: 'https://medihealth.co.za',
        },
      ],
      website: 'https://horizonventures.co.za',
      socialMedia: {
        linkedin: 'https://linkedin.com/company/horizon-ventures-sa',
        twitter: 'https://twitter.com/horizonventures_sa',
      },
      isVerified: true,
      investmentCriteria: [
        'Strong founding team with domain expertise',
        'Innovative solution addressing a significant market need',
        'Clear path to revenue and scalability',
        'Potential for 10x return within 5-7 years',
      ],
      investmentProcess: [
        'Initial screening and evaluation',
        'First meeting with investment team',
        'Due diligence process',
        'Investment committee presentation',
        'Term sheet and legal documentation',
        'Funding and post-investment support',
      ],
      team: [
        {
          name: 'Michael Johnson',
          role: 'Managing Partner',
          bio: '15+ years experience in venture capital and technology investments. Previously founded and exited two tech startups.',
          linkedin: 'https://linkedin.com/in/michaeljohnson',
        },
      ],
    };

    setInvestor(mockInvestor);
    setLoading(false);
  }, [id]);

  const handleContactClick = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    if (userRole !== 'entrepreneur') {
      alert('Only entrepreneurs can contact investors');
      return;
    }
    setShowContactModal(true);
  };

  const handleContactSuccess = () => {
    alert('Message sent successfully! The investor will be notified.');
    setShowContactModal(false);
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

  if (error || !investor) {
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
            <p className="text-slate-300 text-lg mb-4">{error || 'Investor not found'}</p>
            <Link
              href="/investors"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Back to Investors
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Contact Modal */}
      {showContactModal && (
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
                    <h3 className="text-2xl leading-6 font-bold text-white mb-6">Contact {investor.companyName}</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleContactSuccess(); }}>
                      <div className="mb-6">
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200"
                          placeholder="I&apos;d like to discuss investment opportunities"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                        <textarea
                          id="message"
                          rows={4}
                          className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-400 transition-all duration-200 resize-none"
                          placeholder="Please share details about your startup, funding needs, and why you think there&apos;s a good fit with this investor..."
                        ></textarea>
                      </div>
                      <div className="mt-8 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-base font-semibold text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1"
                        >
                          Send Message
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowContactModal(false)}
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

      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Back link */}
        <div className="mb-6">
          <Link href="/investors" className="text-indigo-400 hover:text-indigo-300 flex items-center transition-colors duration-200 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Investors
          </Link>
        </div>

        {/* Header */}
        <div className="glass-effect rounded-2xl p-6 md:p-8 mb-8 border border-slate-700/50 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white flex items-center mb-2">
                {investor.companyName}
                {investor.isVerified && (
                  <span className="ml-4 flex items-center text-green-400 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                )}
              </h1>
              <p className="text-slate-300 text-lg md:text-xl">{investor.investorType}</p>
            </div>

            {isLoggedIn && userRole === 'entrepreneur' ? (
              <button
                onClick={handleContactClick}
                className="mt-4 lg:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Contact Investor
              </button>
            ) : !isLoggedIn ? (
              <Link
                href="/login"
                className="mt-4 lg:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Login to Contact
              </Link>
            ) : null}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <section className="glass-effect rounded-2xl p-6 md:p-8 border border-slate-700/50 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">About {investor.companyName}</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-300 leading-relaxed mb-4">
                  Horizon Ventures is a leading VC firm focused on early-stage tech startups in South Africa. 
                  We invest in innovative companies with high growth potential and strong founding teams. 
                  Our investment approach is hands-on, providing not just capital but also strategic guidance, 
                  industry connections, and operational support to help our portfolio companies scale rapidly.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  With a track record of successful investments in the African tech ecosystem, we bring 
                  deep industry expertise and a vast network of contacts to help founders navigate the 
                  challenges of scaling their businesses.
                </p>
              </div>
            </section>

            <section className="glass-effect rounded-2xl p-6 md:p-8 border border-slate-700/50 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Investment Criteria</h2>
              <ul className="space-y-4">
                {investor.investmentCriteria.map((criterion, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300 text-sm md:text-base">{criterion}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="glass-effect rounded-2xl p-6 md:p-8 border border-slate-700/50 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Investment Process</h2>
              <ol className="space-y-6">
                {investor.investmentProcess.map((step, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-4 mt-1 text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <span className="text-slate-300 text-sm md:text-base">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="glass-effect rounded-2xl p-6 md:p-8 border border-slate-700/50 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Team</h2>
              <div className="space-y-6">
                {investor.team.map((member, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-base md:text-lg">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-indigo-400 mb-2 text-sm md:text-base">{member.role}</p>
                      <p className="text-slate-300 text-sm mb-3">{member.bio}</p>
                      <Link 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200 flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        LinkedIn
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-effect rounded-2xl p-6 md:p-8 border border-slate-700/50 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Portfolio</h2>
              <div className="space-y-6">
                {investor.portfolio.map((company, i) => (
                  <div key={i} className="border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/30 transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white">{company.name}</h3>
                        <p className="text-indigo-400 mb-2 text-sm md:text-base">{company.industry}</p>
                        <p className="text-slate-300 text-sm mb-3">{company.description}</p>
                      </div>
                      <Link 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200 flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Visit Website
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="glass-effect rounded-2xl p-6 md:p-8 border border-slate-700/50 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Investment Focus</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs md:text-sm font-semibold text-slate-300 mb-3">INDUSTRIES</h3>
                  <div className="flex flex-wrap gap-2">
                    {investor.investmentPreferences.industries.map((ind) => (
                      <span key={ind} className="bg-indigo-900/50 text-indigo-300 text-xs md:text-sm px-3 py-1 rounded-full border border-indigo-700/50">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-semibold text-slate-300 mb-3">STAGES</h3>
                  <div className="flex flex-wrap gap-2">
                    {investor.investmentPreferences.stages.map((st) => (
                      <span key={st} className="bg-green-900/50 text-green-300 text-xs md:text-sm px-3 py-1 rounded-full border border-green-700/50">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-semibold text-slate-300 mb-3">LOCATIONS</h3>
                  <div className="flex flex-wrap gap-2">
                    {investor.investmentPreferences.locations.map((loc) => (
                      <span key={loc} className="bg-slate-700/50 text-slate-300 text-xs md:text-sm px-3 py-1 rounded-full border border-slate-600/50">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-semibold text-slate-300 mb-3">INVESTMENT RANGE</h3>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <p className="text-slate-300 text-sm">R{investor.investmentPreferences.minInvestment?.toLocaleString()} – R{investor.investmentPreferences.maxInvestment?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="glass-effect rounded-2xl p-6 md:p-8 border border-slate-700/50 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Connect</h2>
              <div className="space-y-4">
                {investor.website && (
                  <Link
                    href={investor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-800/50 rounded-full flex items-center justify-center mr-3 md:mr-4 group-hover:bg-indigo-600/20 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 md:h-5 w-4 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base">Website</span>
                  </Link>
                )}
                {investor.socialMedia.linkedin && (
                  <Link
                    href={investor.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-800/50 rounded-full flex items-center justify-center mr-3 md:mr-4 group-hover:bg-indigo-600/20 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 md:h-5 w-4 md:w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <span className="text-sm md:text-base">LinkedIn</span>
                  </Link>
                )}
                {investor.socialMedia.twitter && (
                  <Link
                    href={investor.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-800/50 rounded-full flex items-center justify-center mr-3 md:mr-4 group-hover:bg-indigo-600/20 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 md:h-5 w-4 md:w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </div>
                    <span className="text-sm md:text-base">Twitter</span>
                  </Link>
                )}
              </div>
            </section>
          </aside>
        </div>
      </main>

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
              <Link href="/investors" className="text-white px-3 py-2 rounded-md text-sm font-medium bg-slate-700/50">Investors</Link>
              <Link href="/startups" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Startups</Link>
              <Link href="/resources" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Resources</Link>
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
                href="/investors" 
                className="block text-white font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Investors
              </Link>
              <Link 
                href="/startups" 
                className="block text-slate-300 hover:text-white font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Startups
              </Link>
              <Link 
                href="/resources" 
                className="block text-slate-300 hover:text-white font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
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
