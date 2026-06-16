import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CrystalServiceCard from './components/CrystalServiceCard';
import CoverFlow3D from './components/CoverFlow3D';
import { 
  Star, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Box as CubeIcon, 
  LayoutGrid, 
  Sun,
  MessageSquare, 
  MapPin, 
  Clock, 
  Send, 
  Check, 
  Menu, 
  X, 
  Briefcase, 
  User, 
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { 
  LEADERSHIP_DATA, 
  SERVICE_CARDS, 
  CONTACT_INFO, 
  PORTFOLIO_DATA, 
  PortfolioItem,
  FINISHED_PROJECTS,
  FinishedProject
} from './data';

import heroBgImg from './assets/images/roofing_worker_hero_1781597952285.jpg';

export default function App() {
  // Mobile navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Portfolio filter state
  const [activeFilter, setActiveFilter] = useState<'All' | 'Metal' | 'Cement' | 'Polycarbonate'>('All');
  
  // Selected project for Lightbox
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Sheet Fixing',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRequests, setSubmittedRequests] = useState<any[]>([]);

  // DOM Refs for smooth scrolling
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    setIsMobileMenuOpen(false);
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide both your name and phone number so we can reach you!");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate real database submission / API proxy delay
    setTimeout(() => {
      const newRequest = {
        ...formData,
        id: 'REQ-' + Math.floor(Math.random() * 90000 + 10000),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString()
      };
      
      setSubmittedRequests([newRequest, ...submittedRequests]);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset inputs but keep selected service
      setFormData({
        name: '',
        phone: '',
        service: 'Sheet Fixing',
        details: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#1E508C] selection:text-white antialiased">
      
      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => scrollToSection(heroRef)} 
            className="flex items-center cursor-pointer group"
            id="logo-container"
          >
            {/* Custom Roof Logo matching screenshot orange/charcoal style */}
            <div className="relative w-[60px] h-[45px] flex-shrink-0 mr-1.5">
              <svg className="w-full h-full" viewBox="0 0 100 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Dark Charcoal roof chevron */}
                <path d="M9,44 L46,12 L83,44 L73,44 L46,23 L19,44 Z" fill="#2D3540" />
                {/* Left column / pillar (Charcoal) */}
                <rect x="19" y="44" width="10" height="34" fill="#2D3540" />
                {/* Middle gabled wall (Orange) */}
                <polygon points="31,78 31,37 46,26 62,37 62,78" fill="#F37021" />
                {/* Right vertical pillar (Orange) */}
                <rect x="65" y="46" width="8" height="32" fill="#F37021" />
              </svg>
            </div>
            <div className="flex items-center leading-none">
              <span className="font-sans font-black text-[25px] tracking-tight text-[#1E508C]">
                GLOBAL
              </span>
              <span className="font-sans font-black text-[25px] tracking-tight text-[#1C2430] ml-1">
                ROOFING
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection(servicesRef)} 
              className="text-sm font-semibold text-slate-600 hover:text-[#1E508C] hover:scale-105 active:scale-95 transition cursor-pointer"
              id="nav-services"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection(portfolioRef)} 
              className="text-sm font-semibold text-slate-600 hover:text-[#1E508C] hover:scale-105 active:scale-95 transition cursor-pointer"
              id="nav-portfolio"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection(aboutRef)} 
              className="text-sm font-semibold text-slate-600 hover:text-[#1E508C] hover:scale-105 active:scale-95 transition cursor-pointer"
              id="nav-about"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection(contactRef)} 
              className="text-sm font-semibold text-slate-600 hover:text-[#1E508C] hover:scale-105 active:scale-95 transition cursor-pointer"
              id="nav-contact"
            >
              Contact
            </button>
          </nav>

          {/* Call Primary Action Button */}
          <div className="hidden lg:flex items-center">
            <a 
              href="tel:6381421900" 
              className="bg-[#1E508C] text-white px-5 py-2.5 rounded-lg hover:bg-[#153e70] active:scale-95 transition-all font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg"
              id="header-call-btn"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>6381421900</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg z-40 relative"
            id="mobile-nav-panel"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              <button 
                onClick={() => scrollToSection(servicesRef)}
                className="block w-full text-left py-2.5 px-4 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1E508C] transition"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection(portfolioRef)}
                className="block w-full text-left py-2.5 px-4 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1E508C] transition"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection(aboutRef)}
                className="block w-full text-left py-2.5 px-4 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1E508C] transition"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection(contactRef)}
                className="block w-full text-left py-2.5 px-4 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1E508C] transition"
              >
                Contact
              </button>
              
              <div className="pt-4 border-t border-slate-100 px-4">
                <a 
                  href="tel:6381421900"
                  className="w-full bg-[#1E508C] text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md"
                >
                  <Phone className="w-4 h-4 fill-white" />
                  <span>Call 6381421900</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative min-h-[580px] md:min-h-[640px] flex items-center bg-slate-900 overflow-hidden"
        id="hero-banner"
      >
        {/* Background Image with Dark Linear Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBgImg}
            alt="Global Roofing premium construction sheet fixing"
            className="w-full h-full object-cover object-center opacity-85 scale-102 filter brightness-[0.7] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Sizable gradient overlay for high contrast text support */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-955/95 via-slate-900/75 to-transparent" />
          <div className="absolute inset-0 bg-blue-950/20 backdrop-brightness-[0.85]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Premium Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/50 backdrop-blur-md border border-amber-500/30 text-[11px] font-bold tracking-wider text-[#FAB319] uppercase"
              id="hero-badge"
            >
              <Star className="w-3.5 h-3.5 fill-[#FAB319] text-[#FAB319]" />
              <span>PREMIUM ROOFING EXCELLENCE</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight font-display"
              id="hero-title"
            >
              Providing Secure <br className="hidden sm:inline" />
              <span className="relative inline-block text-[#FAB319] pr-1">
                Shelter
                {/* Thick accent blue border mimicking the logo context perfectly */}
                <span className="absolute left-0 bottom-1 w-full h-[5px] bg-[#1E508C] rounded-full" />
              </span>{' '}
              For Your <br className="sm:hidden" /> Future
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-200 text-base sm:text-lg md:text-xl max-w-xl font-normal leading-relaxed"
              id="hero-description"
            >
              Global Roofing specializes in high-quality sheet fixing and fabrication works. We deliver precision engineering with metal, cement, and polycarbonate sheets.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
              id="hero-actions"
            >
              <button 
                onClick={() => scrollToSection(servicesRef)}
                className="bg-[#1E508C] hover:bg-blue-700 text-white px-7 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition duration-200 shadow-xl cursor-pointer hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-base group"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection(contactRef)}
                className="border-2 border-white/40 hover:border-white text-white hover:bg-white/10 px-7 py-3.5 rounded-xl font-bold transition duration-200 cursor-pointer flex items-center justify-center text-sm md:text-base"
              >
                Contact Our Team
              </button>
            </motion.div>
          </div>

          {/* Floating Safety Badge with glass extension layout */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative w-full max-w-sm flex items-center"
              id="safety-guarantor"
            >
              {/* Glass container behind acting as shadow bar in Screenshot 1 */}
              <div className="absolute right-[-40px] left-[60px] h-16 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl hidden sm:block pointer-events-none z-0" />
              
              {/* Primary Floating safety badge card */}
              <div className="relative z-10 w-full sm:w-[280px] bg-white p-5 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-100 hover:scale-103 transition duration-300">
                <div className="bg-emerald-50 text-emerald-600 rounded-2xl p-3.5 flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-100">
                  <ShieldCheck className="w-6 h-6 fill-emerald-100 text-emerald-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-slate-900 font-extrabold text-[15px] tracking-tight leading-tight">Safety Guaranteed</h3>
                  <p className="text-slate-400 font-semibold text-[11px] uppercase tracking-wide mt-0.5">Certified Team</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* SERVICES CARDS BLOCK */}
      <section 
        ref={servicesRef}
        className="py-20 bg-gradient-to-tr from-pastel-green/25 via-white to-pastel-yellow/30 border-b border-slate-100 scroll-mt-10 animate-fade-in"
        id="services"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Dynamic Service Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[#1E508C] text-xs font-black tracking-widest uppercase">
              Our Professional Services
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display">
              Unmatched Sheet Fabrication & Fixing
            </h2>
            <div className="w-12 h-1 bg-[#1E508C] mx-auto rounded-full mt-4" />
          </div>

          {/* Immersive 3d Cover Flow Carousel for Our Professional Services */}
          <div className="relative" id="services-coverflow">
            <CoverFlow3D
              uniqueId="services-cf"
              items={SERVICE_CARDS}
              renderCard={(service, isActive, index) => (
                <div className="w-full h-full pb-4">
                  <CrystalServiceCard 
                    service={service}
                    index={index}
                    scrollToSection={scrollToSection}
                    contactRef={contactRef}
                  />
                </div>
              )}
            />
          </div>

        </div>
      </section>

      {/* PORTFOLIO SECTION (Beautiful gallery with live screenshot slider!) */}
      <section 
        ref={portfolioRef}
        className="py-20 bg-white border-b border-slate-100 scroll-mt-10 overflow-hidden"
        id="portfolio"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-left space-y-3 mb-10">
            <span className="text-[#1E508C] text-xs font-black tracking-widest uppercase block">
              OUR FINISHED PROJECTS
            </span>
            <h2 className="text-4xl font-extrabold text-[#1E3A5F] tracking-tight font-display">
              Completed Construction Works
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-2xl leading-relaxed">
              Below is the live gallery of our actual fabrication sites, showcasing premium corrugated metal sheds, Mangalore tile cooling systems, and structural framing.
            </p>
          </div>

          {/* Immersive 3D Cover Flow Carousel for Completed Construction Works */}
          <div className="relative mb-20" id="projects-coverflow">
            <CoverFlow3D
              uniqueId="projects-cf"
              items={FINISHED_PROJECTS}
              renderCard={(project, isActive, index) => {
                const handleClickCard = () => {
                  // Match to portfolio items for lightbox viewing
                  const mappedItem = PORTFOLIO_DATA.find(p => p.title.replace(/\s+/g, '').toLowerCase().includes(project.title.replace(/\s+/g, '').toLowerCase().substring(0, 15)));
                  if (mappedItem) {
                    setSelectedProject(mappedItem);
                  } else {
                    setSelectedProject({
                      id: project.id,
                      title: project.title,
                      category: 'All',
                      location: 'Erode District, Tamil Nadu',
                      image: project.image
                    });
                  }
                };

                return (
                  <div 
                    onClick={handleClickCard}
                    className="relative w-full h-full rounded-[24px] overflow-hidden shadow-2xl transition-all duration-500 group/card bg-slate-900 border border-slate-800/40 cursor-pointer flex flex-col justify-end"
                  >
                    {/* Glass sheen highlight */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
                    
                    {/* Fill Background Image */}
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-108 transition-all duration-700 ease-out z-0"
                      referrerPolicy="no-referrer"
                    />

                    {/* Dark gradient overlay on photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 z-10" />

                    {/* Spotlight glow inside */}
                    <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#1E508C]/15 rounded-full blur-2xl group-hover/card:scale-150 transition-transform duration-500 pointer-events-none z-10" />

                    {/* Caption Overlay Container resembling luxury Glassmorphic visual cards */}
                    <div className={`relative z-15 p-5 text-center flex flex-col justify-end items-center h-[50%] transition-transform duration-500 ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
                    }`}>
                      <span className="text-[10px] uppercase font-black tracking-widest text-[#FAB319] mb-2 drop-shadow-md">
                        Global Roofing Finished Project
                      </span>
                      <h4 className="text-white font-display font-black text-[14px] sm:text-[15.5px] leading-snug tracking-normal drop-shadow-md">
                        {project.title}
                      </h4>

                      {/* Integrated "Get Best Quote" buttons inside the overlay container */}
                      {project.hasQuoteButton && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData(prev => ({ ...prev, service: project.title }));
                            scrollToSection(contactRef);
                          }}
                          className="mt-4 bg-white hover:bg-[#FAB319] text-[#1E508C] hover:text-white active:scale-95 transition-all text-[11px] font-black px-5 py-2.5 rounded-full shadow-lg uppercase tracking-wider border border-white/20 hover:border-transparent cursor-pointer"
                        >
                          Get Best Quote
                        </button>
                      )}
                    </div>
                  </div>
                );
              }}
            />
          </div>

          {/* Interactive filterable grid as secondary exploration */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-100 gap-6">
            <div className="text-left">
              <h3 className="font-display font-extrabold text-xl md:text-2xl text-slate-950">
                Explore by Material Category
              </h3>
              <p className="text-slate-400 text-xs mt-1 font-medium">Use filters to browse specific sheet fabrications built in Erode.</p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100 self-start md:self-end">
              {(['All', 'Metal', 'Cement', 'Polycarbonate'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                    activeFilter === filter 
                      ? 'bg-white shadow-sm text-[#1E3A5F] font-black' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Animated filtered items */}
          <motion.div 
            layout
            className="responsive-grid"
            id="portfolio-items"
          >
            <AnimatePresence mode="popLayout">
              {PORTFOLIO_DATA
                .filter(item => activeFilter === 'All' || item.category === activeFilter)
                .map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={item.id}
                    onClick={() => setSelectedProject(item)}
                    className="group overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg cursor-pointer text-left"
                  >
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-50">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-104 transition duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white/90 text-[#1E508C] text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Maximize view</span>
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-extrabold text-base text-slate-900 leading-snug group-hover:text-[#1E508C] transition">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-2.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              }
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section 
        ref={aboutRef}
        className="py-20 bg-gradient-to-br from-pastel-yellow/35 via-white to-pastel-orange/25 border-b border-slate-100 scroll-mt-10"
        id="about-us"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start" id="leadership-layout">
          
          {/* Left Column Content */}
          <div className="text-left space-y-6">
            <span className="text-[#1E508C] text-xs font-black tracking-widest uppercase block">
              Meet Our Leadership
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight font-display">
              Driving Excellence in Every Project
            </h2>
            <p className="text-slate-600 text-base leading-relaxed font-normal">
              Global Roofing is built on trust and a commitment to delivering the best roofing solutions in the region. Our leadership team brings together technical mastery and operational efficiency.
            </p>

            {/* Quote Block with subtle border matching Screenshot 3 perfectly */}
            <div className="border border-slate-200/80 bg-white p-7 rounded-2xl shadow-sm space-y-5 max-w-md" id="quote-card">
              <p className="italic text-slate-700 text-[15.5px] leading-relaxed font-normal">
                "Our goal is not just to fix sheets, but to build structures that provide safety and peace of mind for generations."
              </p>
              
              <div className="flex items-center">
                <div className="bg-blue-50 text-blue-600 rounded-full p-2 mr-3 flex items-center justify-center border border-blue-100 shadow-sm">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">R. Venkatesan</h4>
                  <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-0.5">Founder & Proprietor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Leadership Cards List */}
          <div className="space-y-6 flex flex-col justify-center" id="leadership-manager-cards">
            {LEADERSHIP_DATA.map((leader, index) => {
              const bgIconColor = leader.iconType === 'shield' ? 'bg-[#1E508C]' : 'bg-amber-500';
              const IconComponent = leader.iconType === 'shield' ? ShieldCheck : Briefcase;
              
              return (
                <div 
                  key={index}
                  className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start gap-4 sm:gap-6 hover:shadow-md transition duration-200"
                >
                  {/* Left Solid colored icon panel */}
                  <div className={`p-4 rounded-xl text-white ${bgIconColor} flex-shrink-0 shadow-md flex items-center justify-center mx-auto sm:mx-0`}>
                    <IconComponent className="w-6 h-6 fill-white/20" />
                  </div>

                  {/* Right description block */}
                  <div className="text-left flex-1 mt-3 sm:mt-0">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-black tracking-wider text-[#1E508C] uppercase mt-1">
                      {leader.role}
                    </p>
                    <p className="text-[13.5px] text-slate-500 font-medium mt-3 leading-relaxed">
                      {leader.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section 
        ref={contactRef}
        className="py-20 bg-gradient-to-tr from-pastel-green/20 via-white to-pastel-orange/20 scroll-mt-10"
        id="contact"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-start" id="contact-layout">
          
          {/* Left Column info details */}
          <div className="lg:col-span-5 text-left space-y-6">
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Roofing Project
            </h2>
            <p className="text-slate-600 text-base leading-relaxed font-normal">
              Have a question about sheet fixing or fabrication? Contact Mr. R. Venkatesan or Mr. B. Nithish Kumar today for a free consultation and quote.
            </p>

            {/* 2x2 Grid of details cards */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4" id="info-cards-grid">
              {CONTACT_INFO.map((info, idx) => {
                
                // Icon select helper
                const renderInfoIcon = () => {
                  const iconStyle = "w-5 h-5 text-[#1E508C]";
                  if (info.iconType === 'phone') return <Phone className={iconStyle} />;
                  if (info.iconType === 'whatsapp') {
                    return (
                      <svg className="w-5 h-5 fill-emerald-600 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.004 2C6.48 2 2 6.48 2 12C2 13.91 2.54 15.7 3.48 17.22L2 22L6.92 20.6C8.38 21.5 10.12 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12.004 2ZM16.31 16.5C16.1 17.08 15.22 17.54 14.61 17.65C14.09 17.74 13.43 17.8 11.16 16.86C8.16 15.62 6.22 12.56 6.07 12.36C5.92 12.16 4.83 10.71 4.83 9.21C4.83 7.71 5.59 6.98 5.9 6.66C6.15 6.4 6.57 6.28 6.95 6.28C7.07 6.28 7.18 6.29 7.27 6.29C7.54 6.3 7.68 6.32 7.86 6.75C8.08 7.3 8.62 8.62 8.69 8.76C8.76 8.9 8.83 9.09 8.73 9.27C8.64 9.46 8.56 9.55 8.41 9.72C8.26 9.89 8.13 10.02 7.98 10.2C7.84 10.37 7.68 10.55 7.86 10.87C8.04 11.18 8.67 12.21 9.61 13.05C10.82 14.13 11.81 14.47 12.13 14.61C12.45 14.75 12.64 14.72 12.82 14.51C13 14.3 13.59 13.6 13.78 13.32C13.97 13.04 14.16 13.08 14.42 13.18C14.68 13.28 16.08 13.97 16.36 14.11C16.64 14.25 16.83 14.32 16.9 14.44C16.97 14.56 16.97 15.11 16.76 15.69L16.31 16.5Z"/>
                      </svg>
                    );
                  }
                  if (info.iconType === 'map') return <MapPin className={iconStyle} />;
                  return <Clock className={iconStyle} />;
                };

                // Link tag generator helper
                const renderLinkWrapper = (content: React.ReactNode) => {
                  if (info.iconType === 'phone') {
                    return (
                      <a href={`tel:${info.value}`} className="block focus:outline-hidden group h-full">
                        {content}
                      </a>
                    );
                  }
                  if (info.iconType === 'whatsapp') {
                    const cleanPhone = info.value.replace(/[^0-9]/g, '');
                    const textMessage = encodeURIComponent("hello Global roofing need your service");
                    return (
                      <a 
                        href={`https://wa.me/${cleanPhone}?text=${textMessage}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block focus:outline-hidden group h-full"
                      >
                        {content}
                      </a>
                    );
                  }
                  return content;
                };

                const cardContent = (
                  <div 
                    className={`bg-slate-50/70 border border-slate-100 p-5 rounded-2xl transition duration-150 text-left flex flex-col justify-between min-h-[110px] h-full ${
                      info.iconType === 'phone' || info.iconType === 'whatsapp' 
                        ? 'cursor-pointer hover:bg-slate-100 hover:border-[#1E508C]/30 hover:shadow-xs' 
                        : ''
                    }`}
                  >
                    <div className="bg-white shadow-xs rounded-xl p-2.5 w-10 h-10 flex items-center justify-center flex-shrink-0 border border-slate-100/50">
                      {renderInfoIcon()}
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                        {info.title}
                      </h4>
                      <p className={`text-[14.5px] font-extrabold mt-1 leading-snug transition-colors duration-150 ${
                        info.iconType === 'phone' ? 'text-[#1E508C] group-hover:text-blue-700' :
                        info.iconType === 'whatsapp' ? 'text-emerald-600 group-hover:text-emerald-700' :
                        'text-slate-950'
                      }`}>
                        {info.value}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <div key={idx} className="h-full">
                    {renderLinkWrapper(cardContent)}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column message card Form block matching exact screenshot layout */}
          <div className="lg:col-span-7" id="contact-form-block">
            <div className="bg-white shadow-xl hover:shadow-2xl transition duration-300 border border-slate-100 p-6 sm:p-9 rounded-3xl flex flex-col text-left">
              
              <h3 className="font-display text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                <span>Send a Quick Message</span>
              </h3>

              {/* Submission status renderer */}
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-8 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-slate-900">Request Scheduled!</h4>
                      <p className="text-sm text-slate-500 max-w-sm mx-auto p-1 leading-relaxed">
                        Thank you! Your call request was successfully logged. Mr. Venkatesan or Mr. Nithish Kumar will reach out shortly.
                      </p>
                    </div>

                    {/* Request Reference Receipt */}
                    {submittedRequests.length > 0 && (
                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl max-w-sm mx-auto text-xs space-y-2 mt-4">
                        <div className="flex justify-between text-slate-400">
                          <span>Ref ID:</span>
                          <span className="font-mono text-slate-800 font-bold">{submittedRequests[0].id}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Requested Service:</span>
                          <span className="text-slate-800 font-bold">{submittedRequests[0].service}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Date/Time:</span>
                          <span className="text-slate-800 font-bold">{submittedRequests[0].date} at {submittedRequests[0].time}</span>
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-[#1E508C] font-semibold tracking-wider uppercase hover:underline pt-2 cursor-pointer block mx-auto"
                    >
                      Send another query
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    {/* Name + Phone side-by-side row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-widest block">
                          Your Name
                        </label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="John Doe"
                          className="bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 h-12 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1E508C] transition duration-150 text-sm w-full font-medium"
                        />
                      </div>

                      {/* Phone Input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-widest block">
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+91 00000 00000"
                          className="bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 h-12 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1E508C] transition duration-150 text-sm w-full font-medium"
                        />
                      </div>

                    </div>

                    {/* Select Dropdown row */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-widest block">
                        Required Service
                      </label>
                      <select 
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 h-12 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1E508C] transition duration-150 text-sm w-full font-semibold appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231E508C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>")`, backgroundPosition: 'calc(100% - 14px) 50%', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
                      >
                        <option value="Sheet Fixing">Sheet Fixing</option>
                        <option value="Metal Sheets">Metal Sheets</option>
                        <option value="Cement Sheets">Cement Sheets</option>
                        <option value="Fabrication Work">Fabrication Work</option>
                        <option value="Polycarbonate Canopy">Polycarbonate Canopy</option>
                      </select>
                    </div>

                    {/* Textarea details input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-widest block">
                        Project Details
                      </label>
                      <textarea 
                        value={formData.details}
                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                        placeholder="Describe your roofing requirement..."
                        className="bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 min-h-[140px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1E508C] transition duration-150 text-sm w-full font-medium resize-none"
                      />
                    </div>

                    {/* Submit callback button with elegant spinner */}
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#1E508C] hover:bg-[#163D6C] disabled:bg-slate-400 text-white py-4 px-6 rounded-xl font-bold text-sm transition duration-200 flex items-center justify-center gap-2 shadow-lg cursor-pointer select-none border border-transparent"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Processing Callback...</span>
                        </>
                      ) : (
                        <>
                          <span>Request a Callback</span>
                          <Send className="w-4 h-4 fill-white" />
                        </>
                      )}
                    </button>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER BAR */}
      <footer className="bg-slate-900 text-white border-t border-slate-850 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            
            {/* Logo/Desc Box */}
            <div className="md:col-span-2 space-y-4 text-left">
              <div className="flex items-center">
                <div className="relative w-[60px] h-[45px] flex-shrink-0 mr-1.5">
                  <svg className="w-full h-full" viewBox="0 0 100 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Light Slate roof chevron for high contrast on dark footer */}
                    <path d="M9,44 L46,12 L83,44 L73,44 L46,23 L19,44 Z" fill="#E2E8F0" />
                    {/* Left column / pillar (Light Slate) */}
                    <rect x="19" y="44" width="10" height="34" fill="#E2E8F0" />
                    {/* Middle gabled wall (Orange) */}
                    <polygon points="31,78 31,37 46,26 62,37 62,78" fill="#F37021" />
                    {/* Right vertical pillar (Orange) */}
                    <rect x="65" y="46" width="8" height="32" fill="#F37021" />
                  </svg>
                </div>
                <div className="flex items-center leading-none">
                  <span className="font-sans font-black text-xl tracking-tight text-white">
                    GLOBAL
                  </span>
                  <span className="font-sans font-black text-xl tracking-tight text-white/90 ml-1">
                    ROOFING
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                Expert sheet fixing and mechanical fabrication services in Erode and nearby regions with a dedicated team committed to longevity, safety, and modern designs.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-left space-y-4">
              <h4 className="text-xs font-black tracking-widest text-[#FAB319] uppercase">Navigation</h4>
              <ul className="space-y-2 text-sm text-slate-400 font-medium">
                <li><button onClick={() => scrollToSection(servicesRef)} className="hover:text-white transition">Services</button></li>
                <li><button onClick={() => scrollToSection(portfolioRef)} className="hover:text-white transition">Portfolio Gallery</button></li>
                <li><button onClick={() => scrollToSection(aboutRef)} className="hover:text-white transition">Leadership</button></li>
                <li><button onClick={() => scrollToSection(contactRef)} className="hover:text-white transition">Contact Portal</button></li>
              </ul>
            </div>

            {/* Services helper */}
            <div className="text-left space-y-4">
              <h4 className="text-xs font-black tracking-widest text-[#FAB319] uppercase">Offerings</h4>
              <ul className="space-y-2 text-sm text-slate-400 font-medium">
                <li><button onClick={() => scrollToSection(servicesRef)} className="hover:text-white transition">Sheet Fixing</button></li>
                <li><button onClick={() => { setFormData({...formData, service: 'Metal Sheets'}); scrollToSection(contactRef); }} className="hover:text-white transition">Metal Roofing</button></li>
                <li><button onClick={() => { setFormData({...formData, service: 'Cement Sheets'}); scrollToSection(contactRef); }} className="hover:text-white transition">Cement Structures</button></li>
                <li><button onClick={() => { setFormData({...formData, service: 'Polycarbonate Canopy'}); scrollToSection(contactRef); }} className="hover:text-white transition">Polycarbonate Canopies</button></li>
              </ul>
            </div>

          </div>

          {/* Copy section */}
          <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Global Roofing. All Rights Reserved.</p>
            <p>Designed for premium quality, safety and precision roofing sheet solutions.</p>
          </div>

        </div>
      </footer>

      {/* PORTFOLIO LIGHTBOX COMPONENT */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4"
            id="portfolio-lightbox"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-slate-900/85 hover:bg-slate-900 text-white rounded-full p-2.5 z-10 transition duration-150 cursor-pointer shadow-md"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-16/10 w-full bg-slate-100 overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-8 text-left space-y-4">
                <span className="bg-blue-50 text-[#1E508C] text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full border border-blue-100">
                  {selectedProject.category} ROOFING PROJECT
                </span>
                <h3 className="font-display font-black text-2xl text-slate-900">
                  {selectedProject.title}
                </h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>Located at {selectedProject.location}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pt-2">
                  This showcase demonstrates our high standards in roofing services. Using top-grade local assets and safe procedures, our certified installation team delivered this project ahead of schedule, meeting all safety codes perfectly.
                </p>

                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, service: selectedProject.category === 'All' ? 'Sheet Fixing' : `${selectedProject.category} Sheets` }));
                      setSelectedProject(null);
                      scrollToSection(contactRef);
                    }}
                    className="bg-[#1E508C] hover:bg-[#163D6C] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Inquire about this structure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons for Easy Access */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
        {/* Floating Call Action Button */}
        <a 
          href="tel:6381421900"
          className="bg-[#1E508C] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:bg-[#153e70] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group relative border border-white/20 pointer-events-auto"
          title="Call Global Roofing"
        >
          {/* Pulsing indicator circle */}
          <span className="absolute inset-0 rounded-full bg-[#1E508C]/40 animate-ping -z-10 group-hover:opacity-0 transition" />
          
          <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
          
          {/* Label tooltip peaking on hover */}
          <span className="absolute right-16 bg-slate-950/95 text-white text-[12px] font-black px-3.5 py-2 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-xl whitespace-nowrap border border-slate-800">
            Call 6381421900 Now
          </span>
        </a>

        {/* Floating WhatsApp Action Button */}
        <a 
          href={`https://wa.me/916381421900?text=${encodeURIComponent("hello Global roofing need your service")}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group relative border border-white/20 pointer-events-auto"
          title="Chat on WhatsApp"
        >
          {/* Pulsing indicator circle */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping -z-10 group-hover:opacity-0 transition" />
          
          {/* Recognizable WhatsApp Brand Vector SVG */}
          <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.673 1.451 5.4 0 9.794-4.394 9.797-9.793.001-2.614-1.017-5.071-2.871-6.927C16.338 2.028 13.882 1.01 11.272 1.01 5.867 1.01 1.477 5.4 1.474 10.806c0 2.045.524 3.826 1.522 5.53l-.994 3.63 3.731-.978-.182-.104zM18.006 14.79c-.33-.165-1.937-.954-2.235-1.063-.298-.11-.515-.165-.73.165-.216.33-.837 1.063-1.026 1.282-.19.219-.378.247-.708.082-.33-.165-1.393-.513-2.653-1.637-1-.892-1.676-1.994-1.874-2.323-.197-.33-.021-.508.144-.672.148-.147.33-.378.495-.568.165-.19.219-.324.329-.54.11-.217.055-.405-.027-.57-.083-.165-.73-1.76-1-.24-.265-.63-.55-.66-.73-.08a1.217 1.217 0 0 0-.69.24c-.218.19-.85.83-.85 2.03 0 1.2.87 2.36.99 2.53.12.17 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.15.2-.56.2-1.04.14-1.14-.06-.1-.23-.17-.56-.34z"/>
          </svg>
          
          {/* Label tooltip peaking on hover */}
          <span className="absolute right-16 bg-slate-950/95 text-white text-[12px] font-black px-3.5 py-2 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-xl whitespace-nowrap border border-slate-800">
            Need Roofing Service? Chat Now
          </span>
        </a>
      </div>

    </div>
  );
}
