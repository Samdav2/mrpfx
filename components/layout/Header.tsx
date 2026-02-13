'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { authService, User } from '@/lib/auth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
          } catch (error: any) {
            console.error('Failed to fetch user:', error);
            // If user is not verified (403), try to get user from token
            if (error.response && error.response.status === 403) {
              const tokenUser = authService.getUserFromToken();
              if (tokenUser) {
                setUser(tokenUser);
                return;
              }
            }
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      }
    };

    fetchUser();

    const handleAuthChange = () => {
      fetchUser();
    };

    window.addEventListener('auth-change', handleAuthChange);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setMobileSubMenu(null);
  };

  const toggleMobileSubMenu = (menu: string) => {
    setMobileSubMenu(mobileSubMenu === menu ? null : menu);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setMobileSubMenu(null);
  };

  return (
    <header id="masthead" className="sticky top-0 z-[9999] bg-white w-full">
      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between px-5 py-3 max-w-full mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <img
              alt="Mr P FX"
              src="/assets/images/mrpfxlogo.png"
              width={52}
              height={52}
              className="h-[52px] w-auto"
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav aria-label="Menu" className="flex-1 flex justify-center">
          <ul className="flex items-center justify-center gap-0.5 list-none m-0 p-0">
            <li className="relative">
              <Link
                href="/mentorship-course"
                className="inline-block px-3 py-2.5 font-dm-sans text-xs font-bold text-gray-900 uppercase tracking-wide rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Mentorship Courses
              </Link>
            </li>
            <li className="relative">
              <Link
                href="/vip-signals-group"
                className="inline-block px-3 py-2.5 font-dm-sans text-xs font-bold text-gray-900 uppercase tracking-wide rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                VIP Signals Group
              </Link>
            </li>
            <li
              className="relative group"
              onMouseEnter={() => setOpenDropdown('vip-bots')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/all-vip-resources"
                className="inline-block px-3 py-2.5 font-dm-sans text-xs font-bold text-gray-900 uppercase tracking-wide rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                VIP BOTS/INDICATORS <span className="text-[8px] ml-1 align-middle">▼</span>
              </Link>
              {/* Dropdown */}
              <ul className={`absolute top-full left-0 mt-1 min-w-[220px] bg-white z-[99999] rounded-xl shadow-lg p-2 transition-all duration-200 ${openDropdown === 'vip-bots' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}`} style={{ backgroundColor: 'white' }}>
                <li>
                  <Link
                    href="/resource_category/robot"
                    className="block px-4 py-3 font-dm-sans text-sm font-semibold text-gray-700 uppercase tracking-wide rounded-lg hover:bg-gray-100 hover:text-black transition-all"
                  >
                    BOTS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resource_category/indicator"
                    className="block px-4 py-3 font-dm-sans text-sm font-semibold text-gray-700 uppercase tracking-wide rounded-lg hover:bg-gray-100 hover:text-black transition-all"
                  >
                    INDICATORS
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative">
              <Link
                href="/all-vip-resources"
                className="inline-block px-3 py-2.5 font-dm-sans text-xs font-bold text-gray-900 uppercase tracking-wide rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                All VIP Resources
              </Link>
            </li>
            <li
              className="relative group"
              onMouseEnter={() => setOpenDropdown('free-resources')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/resource_category/free-robots-indicators-seminars"
                className="inline-block px-3 py-2.5 font-dm-sans text-xs font-bold text-gray-900 uppercase tracking-wide rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                ALL FREE RESOURCES <span className="text-[8px] ml-1 align-middle">▼</span>
              </Link>
              {/* Dropdown */}
              <ul className={`absolute top-full left-0 mt-1 min-w-[220px] bg-white rounded-xl shadow-lg p-2 transition-all duration-200 z-[99999] ${openDropdown === 'free-resources' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}`} style={{ backgroundColor: 'white' }}>
                <li>
                  <Link
                    href="/resource_category/indicator"
                    className="block px-4 py-3 font-dm-sans text-sm font-semibold text-gray-700 uppercase tracking-wide rounded-lg hover:bg-gray-100 hover:text-black transition-all"
                  >
                    FREE INDICATORS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resource_category/robot"
                    className="block px-4 py-3 font-dm-sans text-sm font-semibold text-gray-700 uppercase tracking-wide rounded-lg hover:bg-gray-100 hover:text-black transition-all"
                  >
                    FREE BOTS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentorship-course"
                    className="block px-4 py-3 font-dm-sans text-sm font-semibold text-gray-700 uppercase tracking-wide rounded-lg hover:bg-gray-100 hover:text-black transition-all"
                  >
                    FREE MENTORSHIP VIDEOS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resource_category/free-robots-indicators-seminars"
                    className="block px-4 py-3 font-dm-sans text-sm font-semibold text-gray-700 uppercase tracking-wide rounded-lg hover:bg-gray-100 hover:text-black transition-all"
                  >
                    ALL RESOURCES
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative">
              <Link
                href="/support"
                className="inline-block px-3 py-2.5 font-dm-sans text-xs font-bold text-gray-900 uppercase tracking-wide rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Support
              </Link>
            </li>
          </ul>
        </nav>

        {/* Buttons / User Dropdown */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {user ? (
            <div
              className="relative group"
              onMouseEnter={() => setOpenDropdown('user-menu')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-2 px-4 py-2 border border-[#2A3596] rounded-lg bg-white text-[#2A3596] font-bold text-sm hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-start text-xs leading-tight">
                  <span className="font-bold">Hello,</span>
                  <span className="font-medium truncate max-w-[150px]">{user.user_email}</span>
                </div>
                <span className="text-[10px]">▼</span>
              </button>

              {/* User Dropdown */}
              <ul className={`absolute top-full right-0 mt-1 min-w-[200px] bg-white rounded-xl shadow-lg p-2 transition-all duration-200 z-[99999] ${openDropdown === 'user-menu' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}`} style={{ backgroundColor: 'white' }}>
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 font-dm-sans text-sm font-bold text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    My Courses & Materials
                  </Link>
                </li>
                <li className="border-t border-gray-100 my-1"></li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 font-dm-sans text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center justify-center bg-white border-[1.5px] border-[#5B2EFF] text-[#5B2EFF] font-dm-sans text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#f8f7ff] transition-all whitespace-nowrap"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center bg-[#5B2EFF] border-[1.5px] border-[#5B2EFF] text-white font-dm-sans text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#4920cc] transition-all whitespace-nowrap"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex flex-col p-4 bg-white">
        {/* Top Row: Login / Sign Up Buttons or User Info */}
        <div className="flex justify-center gap-4 mb-6 w-full">
          {user ? (
            <div className="flex flex-col items-center w-full">
              <div className="text-center mb-4">
                <p className="text-[#2A3596] font-bold text-sm">Hello, {user.user_email}</p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center bg-white border border-[#2A3596] text-[#2A3596] font-bold text-sm px-6 py-2 rounded-md"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center bg-red-50 border border-red-200 text-red-600 font-bold text-sm px-6 py-2 rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center justify-center bg-white border border-[#1a237e] text-[#1a237e] font-bold text-sm px-8 py-2.5 rounded-md w-[120px]"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center bg-[#1a237e] text-white font-bold text-sm px-8 py-2.5 rounded-md w-[120px]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Bottom Row: Logo and Menu Toggle */}
        <div className="flex justify-between items-center w-full relative">
          <Link href="/">
            <img
              alt="Mr P FX"
              src="/assets/images/mrpfxlogo.png"
              width={52}
              height={52}
              className="h-[52px] w-auto"
            />
          </Link>

          <button
            onClick={toggleMenu}
            className="p-2 cursor-pointer bg-transparent border-none outline-none"
            aria-label="Toggle menu"
            style={{ border: 'none', outline: 'none', boxShadow: 'none', background: 'transparent' }}
          >
            {isMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="black" viewBox="0 0 24 24" style={{ border: 'none', outline: 'none' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="black" viewBox="0 0 24 24" style={{ border: 'none', outline: 'none' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown Overlay */}
        {isMenuOpen && (
          <nav className="fixed left-0 w-full bg-black z-50 overflow-y-auto animate-fadeIn" style={{
            top: '160px',
            height: 'calc(100vh - 160px)',
            padding: '40px 20px'
          }}>
            <ul className="flex flex-col items-center gap-6 list-none p-0 m-0 w-full">
              <li className="w-full text-center">
                <Link href="/mentorship-course" onClick={closeMenu} className="text-white font-bold text-lg uppercase tracking-wide hover:text-gray-300 transition-colors block py-2" style={{ color: 'white' }}>
                  Mentorship Courses
                </Link>
              </li>
              <li className="w-full text-center">
                <Link href="/vip-signals-group" onClick={closeMenu} className="text-white font-bold text-lg uppercase tracking-wide hover:text-gray-300 transition-colors block py-2" style={{ color: 'white' }}>
                  VIP Signals Group
                </Link>
              </li>
              <li className="w-full text-center">
                <button
                  onClick={() => toggleMobileSubMenu('vip-bots')}
                  className="flex items-center justify-center gap-2 text-white font-bold text-lg uppercase tracking-wide cursor-pointer py-2 w-full bg-transparent border-none"
                  style={{ color: 'white', border: 'none', outline: 'none', boxShadow: 'none' }}
                >
                  VIP BOTS/INDICATORS
                  <span className="text-sm" style={{ transform: mobileSubMenu === 'vip-bots' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                </button>
                {mobileSubMenu === 'vip-bots' && (
                  <ul className="mt-2 space-y-2">
                    <li>
                      <Link href="/resource_category/robot" onClick={closeMenu} className="text-white font-semibold text-base block py-1" style={{ color: 'white' }}>
                        BOTS
                      </Link>
                    </li>
                    <li>
                      <Link href="/resource_category/indicator" onClick={closeMenu} className="text-white font-semibold text-base block py-1" style={{ color: 'white' }}>
                        INDICATORS
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="w-full text-center">
                <Link href="/all-vip-resources" onClick={closeMenu} className="text-white font-bold text-lg uppercase tracking-wide hover:text-gray-300 transition-colors block py-2" style={{ color: 'white' }}>
                  All VIP Resources
                </Link>
              </li>
              <li className="w-full text-center">
                <button
                  onClick={() => toggleMobileSubMenu('free-resources')}
                  className="flex items-center justify-center gap-2 text-white font-bold text-lg uppercase tracking-wide cursor-pointer py-2 w-full bg-transparent border-none"
                  style={{ color: 'white', border: 'none', outline: 'none', boxShadow: 'none' }}
                >
                  ALL FREE RESOURCES
                  <span className="text-sm" style={{ transform: mobileSubMenu === 'free-resources' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                </button>
                {mobileSubMenu === 'free-resources' && (
                  <ul className="mt-2 space-y-2">
                    <li>
                      <Link href="/resource_category/indicator" onClick={closeMenu} className="text-white font-semibold text-base block py-1" style={{ color: 'white' }}>
                        FREE INDICATORS
                      </Link>
                    </li>
                    <li>
                      <Link href="/resource_category/robot" onClick={closeMenu} className="text-white font-semibold text-base block py-1" style={{ color: 'white' }}>
                        FREE BOTS
                      </Link>
                    </li>
                    <li>
                      <Link href="/mentorship-course" onClick={closeMenu} className="text-white font-semibold text-base block py-1" style={{ color: 'white' }}>
                        FREE MENTORSHIP VIDEOS
                      </Link>
                    </li>
                    <li>
                      <Link href="/resource_category/free-robots-indicators-seminars" onClick={closeMenu} className="text-white font-semibold text-base block py-1" style={{ color: 'white' }}>
                        ALL RESOURCES
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="w-full text-center mt-4">
                <Link href="/support" onClick={closeMenu} className="text-white font-bold text-lg uppercase tracking-wide hover:text-gray-300 transition-colors block py-2" style={{ color: 'white' }}>
                  Support
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
