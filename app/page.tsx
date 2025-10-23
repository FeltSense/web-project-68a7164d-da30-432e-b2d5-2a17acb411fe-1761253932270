'use client'

import React, { useState, FormEvent } from 'react'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    const form = e.currentTarget as HTMLFormElement
    
    const formData = {
      name: (form.querySelector('#name') as HTMLInputElement).value,
      email: (form.querySelector('#email') as HTMLInputElement).value,
      phone: (form.querySelector('#phone') as HTMLInputElement).value,
      company: (form.querySelector('#company') as HTMLInputElement).value,
      budget: (form.querySelector('#budget') as HTMLSelectElement).value,
      services: (form.querySelector('#services') as HTMLSelectElement).value,
      message: (form.querySelector('#message') as HTMLTextAreaElement).value,
      source: 'Imaginary Space Contact Form',
      industry: 'Marketing'
    }

    try {
      const response = await fetch('https://deep-api-server-2moiw.kinsta.app/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you! We\'ll be in touch within 24 hours to discuss your marketing needs.',
      })
      form.reset()
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or email us directly at hello@imaginaryspace.com',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out" id="navbar">
  <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 transition-all duration-500" id="nav-content">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between transition-all duration-500 py-6" id="nav-inner">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 transition-all duration-500" id="logo-container">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg transform rotate-6 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg transform -rotate-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xl z-10">IS</span>
            </div>
          </div>
          <span className="text-white font-bold text-2xl tracking-tight transition-all duration-500" id="brand-text">
            Imaginary Space
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <a href="#home" className="text-white hover:text-cyan-300 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 font-medium">
            Home
          </a>
          <a href="#services" className="text-white hover:text-cyan-300 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 font-medium">
            Services
          </a>
          <a href="#about" className="text-white hover:text-cyan-300 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 font-medium">
            About
          </a>
          <a href="#pricing" className="text-white hover:text-cyan-300 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 font-medium">
            Pricing
          </a>
          <a href="#contact" className="ml-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300" id="mobile-menu-button">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  <div className="md:hidden hidden bg-gradient-to-b from-indigo-900 to-purple-900 border-t border-white/10" id="mobile-menu">
    <div className="px-4 py-4 space-y-2">
      <a href="#home" className="block text-white hover:text-cyan-300 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 font-medium">
        Home
      </a>
      <a href="#services" className="block text-white hover:text-cyan-300 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 font-medium">
        Services
      </a>
      <a href="#about" className="block text-white hover:text-cyan-300 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 font-medium">
        About
      </a>
      <a href="#pricing" className="block text-white hover:text-cyan-300 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 font-medium">
        Pricing
      </a>
      <a href="#contact" className="block bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-300">
        Contact
      </a>
    </div>
  </div>

  <script dangerouslySetInnerHTML={{__html: `
    (function() {
      const navbar = document.getElementById('navbar');
      const navContent = document.getElementById('nav-content');
      const navInner = document.getElementById('nav-inner');
      const brandText = document.getElementById('brand-text');
      const logoContainer = document.getElementById('logo-container');
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      
      let lastScroll = 0;
      
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
          navInner.classList.remove('py-6');
          navInner.classList.add('py-3');
          brandText.classList.remove('text-2xl');
          brandText.classList.add('text-xl');
          logoContainer.classList.remove('w-10', 'h-10');
          logoContainer.classList.add('w-8', 'h-8');
          navContent.classList.add('shadow-lg', 'shadow-purple-900/50');
        } else {
          navInner.classList.remove('py-3');
          navInner.classList.add('py-6');
          brandText.classList.remove('text-xl');
          brandText.classList.add('text-2xl');
          logoContainer.classList.remove('w-8', 'h-8');
          logoContainer.classList.add('w-10', 'h-10');
          navContent.classList.remove('shadow-lg', 'shadow-purple-900/50');
        }
        
        lastScroll = currentScroll;
      });
      
      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    })();
  `}} />
</nav>
      
      {/* Hero Section */}
      <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0E27]">
  {/* Animated Gradient Background */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F3A] via-[#0A0E27] to-[#2D3561] animate-gradient-shift"></div>
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00F0FF] opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B47EFF] opacity-10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#00F0FF] opacity-5 rounded-full blur-3xl animate-float"></div>
  </div>

  {/* Floating Grid Pattern */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute inset-0" style={{
      backgroundImage: 'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)',
      backgroundSize: '100px 100px',
      opacity: 0.1
    }}></div>
  </div>

  {/* Content Container */}
  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
    
    {/* Floating Badge */}
    <div className="mb-8 animate-float">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1F3A] border border-[#00F0FF]/30 backdrop-blur-sm">
        <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></div>
        <span className="text-sm font-medium text-[#00F0FF]">AI-Powered Marketing Intelligence</span>
      </div>
    </div>

    {/* Main Headline - Floating Animation */}
    <h1 className="text-center mb-6 animate-fade-in-up">
      <div className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
        <span className="inline-block text-white animate-float animation-delay-100">Transform</span>
        {' '}
        <span className="inline-block bg-gradient-to-r from-[#00F0FF] to-[#B47EFF] text-transparent bg-clip-text animate-float animation-delay-300">Campaigns</span>
      </div>
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold">
        <span className="inline-block text-white/90 animate-float animation-delay-500">Into</span>
        {' '}
        <span className="inline-block text-[#00F0FF] animate-float animation-delay-700">Conversions</span>
      </div>
    </h1>

    {/* Description - Floating */}
    <p className="text-xl md:text-2xl text-white/70 text-center max-w-3xl mb-12 leading-relaxed animate-fade-in-up animation-delay-1000">
      <span className="inline-block animate-float animation-delay-1200">Imaginary Space</span>
      {' '}
      <span className="inline-block animate-float animation-delay-1400">harnesses AI to predict</span>
      {' '}
      <span className="inline-block animate-float animation-delay-1600">audience behavior,</span>
      {' '}
      <span className="inline-block animate-float animation-delay-1800">optimize ad spend,</span>
      {' '}
      <span className="inline-block animate-float animation-delay-2000">and deliver</span>
      {' '}
      <span className="inline-block text-[#B47EFF] animate-float animation-delay-2200">10x ROI</span>
      {' '}
      <span className="inline-block animate-float animation-delay-2400">for modern brands.</span>
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up animation-delay-2600">
      <button className="group relative px-8 py-4 bg-gradient-to-r from-[#00F0FF] to-[#B47EFF] rounded-full font-semibold text-[#0A0E27] text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]">
        <span className="relative z-10">Launch Your Campaign</span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>
      <button className="px-8 py-4 bg-[#1A1F3A] border-2 border-[#00F0FF]/50 rounded-full font-semibold text-white text-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#2D3561] hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
        View Case Studies
      </button>
    </div>

    {/* Floating Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full animate-fade-in-up animation-delay-3000">
      <div className="text-center p-6 rounded-2xl bg-[#1A1F3A]/50 backdrop-blur-sm border border-[#00F0FF]/20 animate-float animation-delay-3200">
        <div className="text-4xl font-bold text-[#00F0FF] mb-2">847%</div>
        <div className="text-white/60">Avg. ROAS Increase</div>
      </div>
      <div className="text-center p-6 rounded-2xl bg-[#1A1F3A]/50 backdrop-blur-sm border border-[#B47EFF]/20 animate-float animation-delay-3400">
        <div className="text-4xl font-bold text-[#B47EFF] mb-2">2.4M+</div>
        <div className="text-white/60">Campaigns Optimized</div>
      </div>
      <div className="text-center p-6 rounded-2xl bg-[#1A1F3A]/50 backdrop-blur-sm border border-[#00F0FF]/20 animate-float animation-delay-3600">
        <div className="text-4xl font-bold text-[#00F0FF] mb-2">94%</div>
        <div className="text-white/60">Client Retention</div>
      </div>
    </div>
  </div>

  <style jsx>{`
    @keyframes gradient-shift {
      0%, 100% { transform: scale(1) rotate(0deg); }
      50% { transform: scale(1.1) rotate(5deg); }
    }
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.1; transform: scale(1); }
      50% { opacity: 0.2; transform: scale(1.1); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-gradient-shift { animation: gradient-shift 15s ease-in-out infinite; }
    .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
    .animation-delay-100 { animation-delay: 0.1s; }
    .animation-delay-300 { animation-delay: 0.3s; }
    .animation-delay-500 { animation-delay: 0.5s; }
    .animation-delay-700 { animation-delay: 0.7s; }
    .animation-delay-1000 { animation-delay: 1s; }
    .animation-delay-1200 { animation-delay: 1.2s; }
    .animation-delay-1400 { animation-delay: 1.4s; }
    .animation-delay-1600 { animation-delay: 1.6s; }
    .animation-delay-1800 { animation-delay: 1.8s; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-2200 { animation-delay: 2.2s; }
    .animation-delay-2400 { animation-delay: 2.4s; }
    .animation-delay-2600 { animation-delay: 2.6s; }
    .animation-delay-3000 { animation-delay: 3s; }
    .animation-delay-3200 { animation-delay: 3.2s; }
    .animation-delay-3400 { animation-delay: 3.4s; }
    .animation-delay-3600 { animation-delay: 3.6s; }
  `}</style>
</div>
      
      {/* Services Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-24 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-slate-900 mb-4">
        Imaginary Space Services
      </h2>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto">
        Transforming marketing with AI-powered solutions that deliver measurable results
      </p>
    </div>

    {/* Bento Grid */}
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-fr">
      
      {/* Large Card - Custom AI Development */}
      <div className="md:col-span-6 lg:col-span-7 lg:row-span-2 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between min-h-[400px]">
        <div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-4">Custom AI Development</h3>
          <p className="text-purple-100 text-lg leading-relaxed">
            Imaginary Space crafts bespoke AI solutions tailored to your marketing objectives. From predictive customer analytics to automated content generation, we build intelligent systems that align perfectly with your brand strategy and business needs.
          </p>
        </div>
        <div className="mt-6 flex items-center text-purple-200">
          <span className="text-sm font-semibold">End-to-end service from strategy to deployment</span>
        </div>
      </div>

      {/* Tall Card - Expert Team */}
      <div className="md:col-span-3 lg:col-span-5 lg:row-span-2 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between border border-slate-200 min-h-[400px]">
        <div>
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Expert AI/ML Team</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Our specialists at Imaginary Space bring deep expertise in machine learning, natural language processing, and marketing technology to every project.
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-emerald-600">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Deep AI/ML expertise</span>
          </div>
          <div className="flex items-center text-emerald-600">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Marketing technology focus</span>
          </div>
        </div>
      </div>

      {/* Wide Card - Proven Results */}
      <div className="md:col-span-3 lg:col-span-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 text-slate-900 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] min-h-[200px]">
        <div className="w-16 h-16 bg-white/30 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
          <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-3">Proven Track Record</h3>
        <p className="text-slate-800 leading-relaxed">
          Imaginary Space delivers measurable ROI with data-driven campaigns that increase conversions by an average of 47%.
        </p>
      </div>

      {/* Medium Card - Ethical AI */}
      <div className="md:col-span-3 lg:col-span-4 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-slate-200 min-h-[200px]">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">Ethical AI Practices</h3>
        <p className="text-slate-600 leading-relaxed">
          Transparent processes and responsible AI implementation at Imaginary Space ensure brand safety and customer trust.
        </p>
      </div>

      {/* Wide Card - Ongoing Support */}
      <div className="md:col-span-6 lg:col-span-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex items-center min-h-[200px]">
        <div className="flex-1">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-3">Ongoing Support & Optimization</h3>
          <p className="text-rose-100 text-lg leading-relaxed">
            Imaginary Space provides continuous monitoring, performance optimization, and strategic updates to ensure your AI marketing solutions evolve with your business and market trends.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
      
      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        What Our Clients Say
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Discover how Imaginary Space transforms marketing strategies
      </p>
    </div>

    {/* Slider Container */}
    <div className="relative overflow-hidden">
      <div className="flex gap-8 animate-scroll">
        {/* Testimonial 1 */}
        <div className="min-w-[350px] md:min-w-[450px] bg-white rounded-2xl shadow-xl p-8 flex flex-col">
          <div className="flex items-start gap-6 mb-6">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
              alt="Sarah Mitchell"
              className="w-20 h-20 rounded-full object-cover ring-4 ring-purple-100"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">Sarah Mitchell</h3>
              <p className="text-purple-600 font-medium">CMO, TechVision Inc.</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed flex-1">
            &quot;Imaginary Space revolutionized our content marketing approach. Their data-driven strategies increased our engagement by 340% in just three months. The team&apos;s creativity and analytical mindset are unmatched.&quot;
          </p>
        </div>

        {/* Testimonial 2 */}
        <div className="min-w-[350px] md:min-w-[450px] bg-white rounded-2xl shadow-xl p-8 flex flex-col">
          <div className="flex items-start gap-6 mb-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
              alt="Marcus Rodriguez"
              className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">Marcus Rodriguez</h3>
              <p className="text-blue-600 font-medium">Marketing Director, BrandFlow</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed flex-1">
            &quot;Working with Imaginary Space has been a game-changer. Their innovative campaigns helped us break into new markets and our ROI doubled. They truly understand the pulse of modern marketing.&quot;
          </p>
        </div>

        {/* Testimonial 3 */}
        <div className="min-w-[350px] md:min-w-[450px] bg-white rounded-2xl shadow-xl p-8 flex flex-col">
          <div className="flex items-start gap-6 mb-6">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
              alt="Emily Chen"
              className="w-20 h-20 rounded-full object-cover ring-4 ring-purple-100"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">Emily Chen</h3>
              <p className="text-purple-600 font-medium">VP Marketing, Nexus Digital</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed flex-1">
            &quot;Imaginary Space doesn&apos;t just execute campaigns—they craft experiences. Their strategic insights and creative excellence helped us achieve a 250% increase in qualified leads. Absolutely phenomenal partnership!&quot;
          </p>
        </div>

        {/* Duplicate for seamless loop */}
        <div className="min-w-[350px] md:min-w-[450px] bg-white rounded-2xl shadow-xl p-8 flex flex-col">
          <div className="flex items-start gap-6 mb-6">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
              alt="Sarah Mitchell"
              className="w-20 h-20 rounded-full object-cover ring-4 ring-purple-100"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">Sarah Mitchell</h3>
              <p className="text-purple-600 font-medium">CMO, TechVision Inc.</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed flex-1">
            &quot;Imaginary Space revolutionized our content marketing approach. Their data-driven strategies increased our engagement by 340% in just three months. The team&apos;s creativity and analytical mindset are unmatched.&quot;
          </p>
        </div>
      </div>
    </div>

    {/* Navigation Dots */}
    <div className="flex justify-center gap-3 mt-12">
      <button className="w-3 h-3 rounded-full bg-purple-600"></button>
      <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400"></button>
      <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400"></button>
    </div>
  </div>

  <style jsx>{`
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-450px * 3 - 2rem * 3));
      }
    }
    .animate-scroll {
      animation: scroll 20s linear infinite;
    }
    .animate-scroll:hover {
      animation-play-state: paused;
    }
  `}</style>
</section>
      
      {/* Pricing Section - Stripe Integration */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
  </div>

  <div className="relative max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-4">
        Imaginary Space Pricing
      </h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Transform your marketing strategy with cutting-edge tools designed for modern brands
      </p>
    </div>

    {/* Tiered Gradient Pricing Card */}
    <div className="relative max-w-4xl mx-auto">
      {/* Gradient glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl blur-2xl opacity-75 animate-pulse"></div>
      
      {/* Main pricing card */}
      <div className="relative bg-gradient-to-br from-slate-800/90 via-purple-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-purple-500/20">
        
        {/* Top tier - Header section */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">Marketing Pro</h3>
              <p className="text-purple-100">Everything you need to dominate your market</p>
            </div>
            <div className="text-right">
              <div className="flex items-start">
                <span className="text-2xl font-semibold text-white mt-2">$</span>
                <span className="text-6xl font-extrabold text-white">79</span>
              </div>
              <p className="text-purple-100 text-sm">per month</p>
            </div>
          </div>
        </div>

        {/* Middle tier - Features section */}
        <div className="px-8 py-10 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">AI-Powered Campaign Analytics</h4>
                <p className="text-gray-400 text-sm">Real-time insights and predictive performance metrics</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Multi-Channel Automation</h4>
                <p className="text-gray-400 text-sm">Seamlessly manage email, social, and content marketing</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Advanced Audience Segmentation</h4>
                <p className="text-gray-400 text-sm">Target the right customers with precision tools</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Brand Asset Management</h4>
                <p className="text-gray-400 text-sm">Centralized hub for all your creative resources</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">ROI Tracking Dashboard</h4>
                <p className="text-gray-400 text-sm">Measure every dollar spent with detailed attribution</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">24/7 Priority Support</h4>
                <p className="text-gray-400 text-sm">Dedicated team ready to help you succeed</p>
              </div>
            </div>
          </div>

          {/* Bottom tier - CTA section */}
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = 'https://buy.stripe.com/test_5kQ7sN0IX2Pqalc8WP0VO00'}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg text-lg"
            >
              Start with Imaginary Space Now
            </button>
            
            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-sm font-medium">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path>
                </svg>
                <span className="text-sm font-medium">Instant Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"></div>
      </div>
    </div>

    {/* Additional trust text */}
    <p className="text-center text-gray-400 mt-8 text-sm">
      Join 10,000+ marketing teams using Imaginary Space • Cancel anytime • No hidden fees
    </p>
  </div>
</div>
      
      {/* Contact Form - Supabase Integration */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let&apos;s Create Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Extraordinary</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Partner with Imaginary Space to transform your brand&apos;s digital presence
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
              <h3 className="text-2xl font-bold text-white mb-2">Start Your Project</h3>
              <p className="text-purple-100">Fill out the form below and we&apos;ll get back to you within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="services" className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Interested In *
                  </label>
                  <select
                    id="services"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all