'use client'; 
import { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// Define proper TypeScript interface for form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  startupName: string;
  industry: string;
  investmentFocus: string;
  investmentAmount: string;
}

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams?.get('role') || '';
  
  const [activeForm, setActiveForm] = useState(defaultRole || 'entrepreneur');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: defaultRole,
    startupName: '',
    industry: '',
    investmentFocus: '',
    investmentAmount: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Role-specific validations
    if (activeForm === 'entrepreneur') {
      if (!formData.startupName.trim()) newErrors.startupName = 'Startup name is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
    } else if (activeForm === 'investor') {
      if (!formData.investmentFocus) newErrors.investmentFocus = 'Investment focus is required';
      if (!formData.investmentAmount) newErrors.investmentAmount = 'Investment amount range is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Step 1: Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: activeForm,
            first_name: formData.firstName,
            last_name: formData.lastName,
            // Store role-specific data for later use
            ...(activeForm === 'entrepreneur' && {
              startup_name: formData.startupName,
              industry: formData.industry
            }),
            ...(activeForm === 'investor' && {
              investment_focus: formData.investmentFocus,
              investment_amount: formData.investmentAmount
            })
          }
        }
      });

      if (error) {
        // Handle specific error codes
        if (error.message.includes('Email not confirmed')) {
          setErrors({ form: 'Please check your email to confirm your account.' });
          return;
        }
        throw error;
      }

      // Step 2: Redirect to login with success message
      // The trigger will handle creating the entrepreneur/investor profile
      router.push('/login?registered=true');
      
    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        form: error.message || 'Registration failed. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">PitchPoint</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/entrepreneurs" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-200">
                For Entrepreneurs
              </Link>
              <Link href="/investors" className="text-slate-300 hover:text-indigo-400 font-medium transition-colors duration-200">
                For Investors
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-white font-medium transition-colors duration-200">
                About
              </Link>
              <Link href="/contact" className="text-slate-300 hover:text-white font-medium transition-colors duration-200">
                Contact
              </Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-slate-300 hover:text-white font-medium transition-colors duration-200">
                Login
              </Link>
              <Link href="/register" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
                Sign Up
              </Link>
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
            <div className="md:hidden bg-slate-900/95 border-t border-slate-700/50">
              <div className="px-4 py-4 space-y-4">
                <Link 
                  href="/entrepreneurs" 
                  className="block text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  For Entrepreneurs
                </Link>
                <Link 
                  href="/investors" 
                  className="block text-slate-300 hover:text-indigo-400 font-medium transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  For Investors
                </Link>
                <Link 
                  href="/about" 
                  className="block text-slate-300 hover:text-white font-medium transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="block text-slate-300 hover:text-white font-medium transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="pt-4 border-t border-slate-700/50">
                  <Link 
                    href="/login" 
                    className="block text-slate-300 hover:text-white font-medium transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="block w-full text-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Registration Form */}
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-4">Join PitchPoint</h2>
            <p className="text-xl text-slate-300">
              Start your journey to connect with investors and entrepreneurs
            </p>
            <p className="mt-4 text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors duration-200">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="flex bg-slate-800/50 rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveForm('entrepreneur')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeForm === 'entrepreneur'
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🚀 Entrepreneur
            </button>
            <button
              onClick={() => setActiveForm('investor')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeForm === 'investor'
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              💼 Investor
            </button>
          </div>

          {/* Registration Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
            {errors.form && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-300 text-sm">{errors.form}</p>
                </div>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-slate-300 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-700/50 border ${
                      errors.firstName ? 'border-red-400' : 'border-slate-600'
                    } rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="mt-2 text-sm text-red-400">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-slate-300 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-700/50 border ${
                      errors.lastName ? 'border-red-400' : 'border-slate-600'
                    } rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="mt-2 text-sm text-red-400">{errors.lastName}</p>}
                </div>
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border ${
                    errors.email ? 'border-red-400' : 'border-slate-600'
                  } rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
              </div>
              
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border ${
                    errors.password ? 'border-red-400' : 'border-slate-600'
                  } rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Create a strong password"
                />
                {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
              </div>
              
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-300 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border ${
                    errors.confirmPassword ? 'border-red-400' : 'border-slate-600'
                  } rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-400">{errors.confirmPassword}</p>}
              </div>

              {/* Role-specific fields */}
              {activeForm === 'entrepreneur' && (
                <>
                  <div>
                    <label htmlFor="startupName" className="block text-sm font-semibold text-slate-300 mb-2">
                      Startup Name
                    </label>
                    <input
                      id="startupName"
                      name="startupName"
                      type="text"
                      value={formData.startupName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border ${
                        errors.startupName ? 'border-red-400' : 'border-slate-600'
                      } rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter your startup name"
                    />
                    {errors.startupName && <p className="mt-2 text-sm text-red-400">{errors.startupName}</p>}
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-semibold text-slate-300 mb-2">
                      Industry
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border ${
                        errors.industry ? 'border-red-400' : 'border-slate-600'
                      } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200`}
                    >
                      <option value="" className="bg-slate-700">Select your industry</option>
                      <option value="technology" className="bg-slate-700">Technology</option>
                      <option value="healthcare" className="bg-slate-700">Healthcare</option>
                      <option value="finance" className="bg-slate-700">Finance</option>
                      <option value="education" className="bg-slate-700">Education</option>
                      <option value="ecommerce" className="bg-slate-700">E-commerce</option>
                      <option value="cleanTech" className="bg-slate-700">CleanTech</option>
                      <option value="healthTech" className="bg-slate-700">HealthTech</option>
                      <option value="other" className="bg-slate-700">Other</option>
                    </select>
                    {errors.industry && <p className="mt-2 text-sm text-red-400">{errors.industry}</p>}
                  </div>
                </>
              )}

              {activeForm === 'investor' && (
                <>
                  <div>
                    <label htmlFor="investmentFocus" className="block text-sm font-semibold text-slate-300 mb-2">
                      Investment Focus
                    </label>
                    <select
                      id="investmentFocus"
                      name="investmentFocus"
                      value={formData.investmentFocus}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border ${
                        errors.investmentFocus ? 'border-red-400' : 'border-slate-600'
                      } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                    >
                      <option value="" className="bg-slate-700">Select investment focus</option>
                      <option value="early-stage" className="bg-slate-700">Early Stage</option>
                      <option value="growth-stage" className="bg-slate-700">Growth Stage</option>
                      <option value="seed" className="bg-slate-700">Seed Funding</option>
                      <option value="series-a" className="bg-slate-700">Series A+</option>
                      <option value="pre-seed" className="bg-slate-700">Pre-seed</option>
                      <option value="venture-capital" className="bg-slate-700">Venture Capital</option>
                    </select>
                    {errors.investmentFocus && <p className="mt-2 text-sm text-red-400">{errors.investmentFocus}</p>}
                  </div>

                  <div>
                    <label htmlFor="investmentAmount" className="block text-sm font-semibold text-slate-300 mb-2">
                      Investment Range
                    </label>
                    <select
                      id="investmentAmount"
                      name="investmentAmount"
                      value={formData.investmentAmount}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border ${
                        errors.investmentAmount ? 'border-red-400' : 'border-slate-600'
                      } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                    >
                      <option value="" className="bg-slate-700">Select investment range</option>
                      <option value="50k-250k" className="bg-slate-700">R50k - R250k</option>
                      <option value="250k-1m" className="bg-slate-700">R250k - R1M</option>
                      <option value="1m-5m" className="bg-slate-700">R1M - R5M</option>
                      <option value="5m-10m" className="bg-slate-700">R5M - R10M</option>
                      <option value="10m+" className="bg-slate-700">R10M+</option>
                    </select>
                    {errors.investmentAmount && <p className="mt-2 text-sm text-red-400">{errors.investmentAmount}</p>}
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r ${
                  activeForm === 'entrepreneur' 
                    ? 'from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500' 
                    : 'from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500'
                } disabled:from-slate-600 disabled:to-slate-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-emerald-500/25 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating your account...
                  </div>
                ) : (
                  `Create ${activeForm === 'entrepreneur' ? 'Entrepreneur' : 'Investor'} Account`
                )}
              </button>
              
              {/* Terms and Privacy */}
              <div className="text-center">
                <p className="text-sm text-slate-400">
                  By creating an account, you agree to our{' '}
                  <Link href="/terms" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors duration-200">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Social Proof */}
          <div className="mt-10 text-center">
            <p className="text-slate-400 text-sm mb-4">Trusted by entrepreneurs and investors across South Africa</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
              <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
              <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
              <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}