import React, { useState, useEffect, useRef } from "react";
import {
  Droplets,
  Sparkles,
  Calendar,
  Clock,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const CustomStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    * {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    @keyframes float-slow {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-30px); }
    }
    @keyframes blob-animation {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(20px, -50px) scale(1.1); }
      50% { transform: translate(-20px, 20px) scale(0.9); }
      75% { transform: translate(50px, 50px) scale(1.05); }
    }
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    .animate-float-slow {
      animation: float-slow 8s ease-in-out infinite;
    }
    .animate-blob {
      animation: blob-animation 20s ease-in-out infinite;
    }
    .shimmer-line {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      background-size: 1000px 100%;
      animation: shimmer 3s infinite;
    }
  `}</style>
);

export default function LandingPage({ onGetStarted }) {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());

  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const heroCardRef = useRef(null);

  const fullTitle = "Book Your\nLaundry with Ease";
  const fullSubtitle = "Experience hassle-free laundry scheduling. Book slots, track status, and manage your routine—all in one place.";

  const features = [
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Book your laundry slots with just a few clicks",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Track your laundry status in real-time",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with top-tier security",
    },
  ];

  // Page fade-in effect
  useEffect(() => {
    setIsPageVisible(true);
  }, []);

  // Typing effect for hero text
  useEffect(() => {
    let titleIndex = 0;
    let subtitleIndex = 0;

    const titleInterval = setInterval(() => {
      if (titleIndex <= fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, titleIndex));
        titleIndex++;
      } else {
        clearInterval(titleInterval);

        // Start subtitle typing after title is done
        const subtitleInterval = setInterval(() => {
          if (subtitleIndex <= fullSubtitle.length) {
            setDisplayedSubtitle(fullSubtitle.slice(0, subtitleIndex));
            subtitleIndex++;
          } else {
            clearInterval(subtitleInterval);
          }
        }, 20);
      }
    }, 50);

    return () => clearInterval(titleInterval);
  }, []);

  // Scroll-triggered animations using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleElements(prev => new Set([...prev, entry.target.dataset.animateId]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe elements
    const elementsToObserve = document.querySelectorAll('[data-animate-id]');
    elementsToObserve.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CustomStyles />
      <div className={`min-h-screen bg-white dark:bg-black relative overflow-hidden transition-opacity duration-1000 ${isPageVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-950 dark:to-black pointer-events-none" />

        {/* Animated subtle blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gray-200 dark:bg-gray-900 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gray-300 dark:bg-gray-800 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-gray-100 dark:bg-gray-900 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Navigation */}
        <nav className="relative bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-cyan-500 dark:bg-cyan-400 rounded-2xl blur-sm opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Droplets className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">
                    Wash-E
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold tracking-wider">SMART LAUNDRY</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  onClick={onGetStarted}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 text-white rounded-xl font-bold text-sm hover:from-cyan-600 hover:to-cyan-700 dark:hover:from-cyan-500 dark:hover:to-cyan-600 transition-all duration-200 hover:scale-105 shadow-lg shadow-cyan-500/30"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-32 sm:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-950/50 rounded-full mb-8 border border-cyan-200 dark:border-cyan-800">
                  <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-sm font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider">
                    The Future of Laundry
                  </span>
                </div>

                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-800 dark:text-white mb-8 tracking-tighter leading-[0.9] min-h-[200px]">
                  {displayedTitle.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {i === 0 && line}
                      {i === 1 && (
                        <>
                          <br />
                          {line.includes("with Ease") ? (
                            <>
                              {line.split("with Ease")[0]}
                              <span className="relative inline-block">
                                <span className="relative z-10 text-cyan-600 dark:text-cyan-400">with Ease</span>
                                <div className="absolute bottom-2 left-0 right-0 h-4 bg-cyan-500 dark:bg-cyan-400 opacity-20" />
                              </span>
                            </>
                          ) : (
                            line
                          )}
                        </>
                      )}
                    </React.Fragment>
                  ))}
                  <span className="animate-blink text-cyan-600 dark:text-cyan-400">|</span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium min-h-[80px]">
                  {displayedSubtitle}
                  {displayedSubtitle.length < fullSubtitle.length && <span className="animate-blink">|</span>}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16">
                  <button
                    onClick={onGetStarted}
                    className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 text-white px-8 py-4 rounded-xl font-black text-lg hover:scale-105 transition-all duration-200 shadow-2xl shadow-cyan-500/40"
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <span>Get Started</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                    </div>
                    <div className="absolute inset-0 shimmer-line" />
                  </button>

                  <button className="px-8 py-4 bg-transparent text-gray-800 dark:text-white rounded-xl font-bold text-lg border-2 border-cyan-500 dark:border-cyan-400 hover:bg-cyan-500 dark:hover:bg-cyan-400 hover:text-white dark:hover:text-white transition-all duration-200">
                    Learn More
                  </button>
                </div>

                {/* Stats */}
                <div
                  className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-800"
                  data-animate-id="stats"
                  ref={statsRef}
                >
                  <div
                    className={`transition-all duration-700 ${visibleElements.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: '0ms' }}
                  >
                    <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400">24/7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">Available</div>
                  </div>
                  <div
                    className={`transition-all duration-700 ${visibleElements.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: '200ms' }}
                  >
                    <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400">100%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">Secure</div>
                  </div>
                  <div
                    className={`transition-all duration-700 ${visibleElements.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: '400ms' }}
                  >
                    <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400">Instant</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">Booking</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Illustration */}
              <div
                className="relative hidden lg:block"
                data-animate-id="hero-card"
                ref={heroCardRef}
              >
                <div className={`relative animate-float-slow transition-all duration-1000 ${visibleElements.has('hero-card') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
                  {/* Main Card */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-cyan-500 dark:bg-cyan-400 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                    <div className="relative bg-white dark:bg-gray-950 rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-800 shadow-2xl">
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                            <Droplets className="w-6 h-6 text-white" strokeWidth={2.5} />
                          </div>
                          <div>
                            <div className="font-black text-gray-800 dark:text-white">Building 36</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Active Booking</div>
                          </div>
                        </div>
                        <div className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-lg shadow-lg">
                          <span className="text-xs font-black text-white uppercase tracking-wider">In Progress</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                          <div className="p-2 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-lg shadow-md">
                            <Calendar className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Day</div>
                            <div className="font-bold text-gray-800 dark:text-white">Monday</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                          <div className="p-2 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-lg shadow-md">
                            <Clock className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Time</div>
                            <div className="font-bold text-gray-800 dark:text-white">10:00 AM</div>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Progress</span>
                          <span className="font-black text-cyan-600 dark:text-cyan-400">65%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-full w-[65%] shadow-md" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Icons */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/40">
                    <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-xl flex items-center justify-center shadow-xl shadow-cyan-500/40">
                    <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10" ref={featuresRef}>
            <div
              className={`text-center mb-16 transition-all duration-1000 ${visibleElements.has('features-heading') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              data-animate-id="features-heading"
            >
              <h2 className="text-5xl font-black text-gray-800 dark:text-white mb-4 tracking-tighter">
                Why Choose Wash-E?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                Everything you need for seamless laundry management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative transition-all duration-700 ${visibleElements.has(`feature-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  data-animate-id={`feature-${index}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="absolute inset-0 bg-cyan-500 dark:bg-cyan-400 rounded-2xl blur opacity-5 group-hover:opacity-15 transition-opacity" />
                  <div className="relative bg-white dark:bg-gray-950 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                      <feature.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-black text-gray-800 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative border-t border-gray-200 dark:border-gray-800 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                  <Droplets className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-black text-gray-800 dark:text-white">Wash-E</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                © 2025 Wash-E. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
