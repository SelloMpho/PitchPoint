'use client';

import Link from "next/link";
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
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
              <Link href="/startups" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-200">
                For Entrepreneurs
              </Link>
              <Link href="/investors" className="text-slate-300 hover:text-indigo-400 font-medium transition-colors duration-200">
                For Investors
              </Link>
              <Link href="#about" className="text-slate-300 hover:text-white font-medium transition-colors duration-200">
                About
              </Link>
              <Link href="#contact" className="text-slate-300 hover:text-white font-medium transition-colors duration-200">
                Contact
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-slate-300 hover:text-white font-medium transition-colors duration-200">
                Login
              </Link>
              <Link href="/register" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
                Sign Up
              </Link>
            </div>

            {/* Mobile menu button */}
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
                  href="/startups" 
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
                  href="#about" 
                  className="block text-slate-300 hover:text-white font-medium transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="#contact" 
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
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        {/* Aurora Blobs Background */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-400/40 via-teal-400/30 to-indigo-400/40 animate-blob mix-blend-screen filter blur-3xl opacity-70"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/40 via-pink-400/30 to-amber-400/40 animate-blob animation-delay-2000 mix-blend-screen filter blur-3xl opacity-70"></div>
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-400/30 via-cyan-400/20 to-emerald-300/30 animate-blob animation-delay-4000 mix-blend-screen filter blur-3xl opacity-60"></div>
        <div className="absolute -bottom-32 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-indigo-400/30 animate-blob animation-delay-6000 mix-blend-screen filter blur-3xl opacity-50"></div>
        <div className="absolute -top-10 left-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-amber-400/30 via-orange-400/30 to-emerald-400/30 animate-blob animation-delay-8000 mix-blend-screen filter blur-3xl opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-12 lg:w-1/2">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-white">Empowering</span>
                <br />
                <span className="text-emerald-400">Entrepreneurs,</span>
                <br />
                <span className="text-white">Connecting</span>
                <br />
                <span className="text-indigo-400">Investors</span>
              </h1>
              <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                Showcase your startup, access growth capital, and unlock opportunities with PitchPoint.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/register?role=entrepreneur"
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 w-full sm:w-auto text-center"
              >
                Start Your Pitch
              </Link>
              <Link
                href="/register?role=investor"
                className="bg-transparent border-2 border-slate-600 hover:border-indigo-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-indigo-500/10 w-full sm:w-auto text-center"
              >
                Join as Investor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose PitchPoint?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to connect with the right people and accelerate your business growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Showcase Your Startup</h3>
              <p className="text-slate-300 leading-relaxed">
                Build a professional profile with pitch decks, traction data, and video to stand out.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Connect with Investors</h3>
              <p className="text-slate-300 leading-relaxed">
                Gain access to a trusted network of verified investors ready to back innovative businesses.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure & Trusted</h3>
              <p className="text-slate-300 leading-relaxed">
                Built-in verification, secure messaging, and fraud protection give confidence to all users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              About <span className="text-emerald-400">PitchPoint</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing how South African entrepreneurs connect with investors to build the future of business innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                PitchPoint was founded with a simple yet powerful vision: to bridge the gap between innovative entrepreneurs 
                and forward-thinking investors across South Africa. We believe that great ideas deserve the opportunity to flourish, 
                and capital should flow to where it can create the most impact.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Our platform is designed to democratize access to funding, making it easier for startups to find the right investors 
                and for investors to discover promising opportunities in the South African market.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Building Connections</h4>
                  <p className="text-slate-300">Creating meaningful partnerships between visionaries and investors</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:transform hover:scale-105 group">
              <div className="text-4xl font-bold text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors duration-300">200+</div>
              <div className="text-xl font-semibold text-white group-hover:text-white transition-colors duration-300">Startups Funded</div>
              <p className="text-slate-300 mt-2 group-hover:text-slate-200 transition-colors duration-300">Successful investment connections</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 transition-all duration-300 hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:transform hover:scale-105 group">
              <div className="text-4xl font-bold text-indigo-400 mb-2 group-hover:text-indigo-300 transition-colors duration-300">R150M+</div>
              <div className="text-xl font-semibold text-white group-hover:text-white transition-colors duration-300">Capital Deployed</div>
              <p className="text-slate-300 mt-2 group-hover:text-slate-200 transition-colors duration-300">In investments through our platform</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 transition-all duration-300 hover:bg-amber-500/10 hover:border-amber-500/30 hover:transform hover:scale-105 group">
              <div className="text-4xl font-bold text-amber-400 mb-2 group-hover:text-amber-300 transition-colors duration-300">500+</div>
              <div className="text-xl font-semibold text-white group-hover:text-white transition-colors duration-300">Active Investors</div>
              <p className="text-slate-300 mt-2 group-hover:text-slate-200 transition-colors duration-300">Ready to fund innovative businesses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Get in <span className="text-emerald-400">Touch</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Have questions or want to learn more about how PitchPoint can help you? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <p className="text-lg text-slate-300 mb-8">
                  Reach out to us through any of the following channels. Our team is ready to assist you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Phone</h4>
                    <p className="text-slate-300">+27 67 668 7955</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                    <p className="text-slate-300">info@pitchpoint.co.za</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Location</h4>
                    <p className="text-slate-300">10 Preller Square<br />Mimosa, Bloemfontein<br />9301, South Africa</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-emerald-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-indigo-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business Future?
          </h2>
          <p className="text-xl text-emerald-50 mb-10 max-w-4xl mx-auto leading-relaxed">
            Join thousands of entrepreneurs and investors already using PitchPoint to connect, grow, and build the future of South African business.
          </p>
          <Link 
            href="/register" 
            className="bg-white text-emerald-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-emerald-50 transition-all duration-300 inline-block transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-white">PitchPoint</span>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Connecting South African entrepreneurs with investors to build the future of business innovation.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-6">For Entrepreneurs</h3>
                <ul className="space-y-4">
                  <li><Link href="/register?role=entrepreneur" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">Create Pitch</Link></li>
                  <li><Link href="/funding-guide" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">Funding Guide</Link></li>
                  <li><Link href="/success-stories" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">Success Stories</Link></li>
                  <li><Link href="/resources" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">Resources</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-6">For Investors</h3>
                <ul className="space-y-4">
                  <li><Link href="/register?role=investor" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200">Join Network</Link></li>
                  <li><Link href="/deal-flow" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200">Deal Flow</Link></li>
                  <li><Link href="/portfolio" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200">Portfolio Management</Link></li>
                  <li><Link href="/market-insights" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200">Market Insights</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
                <ul className="space-y-4">
                  <li><a href="#about" className="text-slate-400 hover:text-white transition-colors duration-200">About Us</a></li>
                  <li><a href="#contact" className="text-slate-400 hover:text-white transition-colors duration-200">Contact</a></li>
                  <li><Link href="/careers" className="text-slate-400 hover:text-white transition-colors duration-200">Careers</Link></li>
                  <li><Link href="/press" className="text-slate-400 hover:text-white transition-colors duration-200">Press</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-slate-400 text-sm mb-4 md:mb-0">
                © 2024 PitchPoint. All rights reserved. Made with ❤️ in South Africa.
              </div>
              <div className="flex space-x-6 text-sm">
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors duration-200">Privacy Policy</Link>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors duration-200">Terms of Service</Link>
                <Link href="/cookies" className="text-slate-400 hover:text-white transition-colors duration-200">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}