'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { HeaderProps } from '@/types';
import SearchBar from '@/components/ui/SearchBar';
import IconButton from '@/components/ui/IconButton';
import Avatar from '@/components/ui/Avatar';
import { User, Settings, HelpCircle, LogOut, Eye, EyeOff, X, Menu } from 'lucide-react';
import { getAlertsDataForTerm } from '@/data/dummyData';
import { useAcademicContext } from '@/contexts/AcademicContext';

const Header: React.FC<HeaderProps> = ({ user: initialUser, onToggleSidebar }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const { academicYear, semester, setAcademicYear, setSemester } = useAcademicContext();
  const [showPassword, setShowPassword] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [semesterDropdownOpen, setSemesterDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const semesterDropdownRef = useRef<HTMLDivElement>(null);

  // State for user data that can change
  const [userData, setUserData] = useState({
    name: initialUser?.name || 'Lecturer',
    email: initialUser?.email || 'lecturer@university.edu',
    role: initialUser?.role || 'Role',
    avatar: initialUser?.avatar,
  });

  const [formData, setFormData] = useState({
    username: userData.name,
    email: userData.email,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Initialize form data when userData changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      username: userData.name,
      email: userData.email,
    }));
  }, [userData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close year dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setYearDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close semester dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (semesterDropdownRef.current && !semesterDropdownRef.current.contains(event.target as Node)) {
        setSemesterDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const handleNotificationClick = () => {
    setNotificationsOpen((prev) => !prev);
  };

  const currentAlerts = useMemo(() => getAlertsDataForTerm(academicYear, semester), [academicYear, semester]);

  const sortedAlerts = useMemo(() => {
    const alerts = currentAlerts?.alerts ?? [];
    return [...alerts].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  }, [currentAlerts]);

  const formatRelativeTime = (timestamp: string) => {
    const now = Date.now();
    const t = new Date(timestamp).getTime();
    const diff = Math.max(0, now - t);
    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'} ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  };

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
  };

  const handleOpenProfile = () => {
    setProfileOpen(false);
    setProfileModalOpen(true);
  };

  const handleOpenSettings = () => {
    setProfileOpen(false);
    setSettingsModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Update user data
    setUserData({
      name: formData.username,
      email: formData.email,
      role: userData.role,
      avatar: userData.avatar,
    });
    console.log('Saving profile:', formData);
    alert('Profile updated successfully!');
    setProfileModalOpen(false);
  };

  const handleSaveSettings = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Saving settings:', formData);
    alert('Password changed successfully!');
    setSettingsModalOpen(false);
    setFormData((prev) => ({ ...prev, oldPassword: '', newPassword: '', confirmPassword: '' }));
  };

  const handleLogout = () => {
    console.log('Logging out...');
    alert('Logged out successfully!');
    setProfileOpen(false);
  };

  return (
    <>
      <header className="
        bg-white
        border-b
        border-gray-200
        sticky
        top-0
        z-50
        shadow-sm
      ">
        <div className="
          flex
          items-center
          justify-between
          px-6
          py-2.5
          gap-4
        ">
          {/* Left Section - Hamburger + Logo */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Hamburger Menu Button - Only visible on mobile/tablet */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" style={{ color: '#0A6E8A' }} />
            </button>
            <Image
              src="/images/ur-logo.jpeg"
              alt="University of Rwanda"
              width={50}
              height={50}
              className="object-contain rounded-full"
              priority
            />
            <h1 className="text-xl font-bold tracking-wide" style={{ color: '#0A6E8A' }}>
              SAMPS UR
            </h1>
          </div>

          {/* Center Section - Search Bar + Dropdowns */}
          <div className="flex-1 max-w-3xl hidden lg:flex items-center gap-3 mx-4">
            <div className="flex-1">
              <SearchBar 
                placeholder="Search resources, students, courses..."
                onSearch={handleSearch}
              />
            </div>

            {/* Academic Year Dropdown */}
            <div ref={yearDropdownRef} className="relative">
              <button
                onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[140px] justify-between"
              >
                <span>{academicYear}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {yearDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      setAcademicYear('2024-2025');
                      setYearDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                      academicYear === '2024-2025' ? 'bg-blue-50 text-[#0A6E8A] font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {academicYear === '2024-2025' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <span className={academicYear !== '2024-2025' ? 'ml-6' : ''}>2024-2025</span>
                  </button>
                  <button
                    onClick={() => {
                      setAcademicYear('2025-2026');
                      setYearDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                      academicYear === '2025-2026' ? 'bg-blue-50 text-[#0A6E8A] font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {academicYear === '2025-2026' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <span className={academicYear !== '2025-2026' ? 'ml-6' : ''}>2025-2026</span>
                  </button>
                </div>
              )}
            </div>

            {/* Semester Dropdown */}
            <div ref={semesterDropdownRef} className="relative">
              <button
                onClick={() => setSemesterDropdownOpen(!semesterDropdownOpen)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[120px] justify-between"
              >
                <span>{semester}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {semesterDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      setSemester('Fall');
                      setSemesterDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                      semester === 'Fall' ? 'bg-blue-50 text-[#0A6E8A] font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {semester === 'Fall' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <span className={semester !== 'Fall' ? 'ml-6' : ''}>Fall</span>
                  </button>
                  <button
                    onClick={() => {
                      setSemester('Spring');
                      setSemesterDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                      semester === 'Spring' ? 'bg-blue-50 text-[#0A6E8A] font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {semester === 'Spring' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <span className={semester !== 'Spring' ? 'ml-6' : ''}>Spring</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Icons & User */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Notification Icon + Dropdown */}
            <div ref={notificationsRef} className="relative">
              <IconButton
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                }
                onClick={handleNotificationClick}
                badge={currentAlerts.unreadCount}
              />

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Notifications</span>
                    <span className="text-xs text-gray-500">Latest first</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 scrollbar-hide">
                    {sortedAlerts.map((alert) => (
                      <div key={alert.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 w-2 h-2 rounded-full ${
                              alert.priority === 'high'
                                ? 'bg-red-500'
                                : alert.priority === 'medium'
                                ? 'bg-amber-400'
                                : 'bg-blue-400'
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-semibold text-gray-900 leading-tight">{alert.title}</p>
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                {formatRelativeTime(alert.time)}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{alert.message}</p>
                            {alert.from && (
                              <p className="text-[11px] text-gray-500 mt-1">From: {alert.from}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Help Icon - REMOVED */}

            {/* User Profile Section - Dropdown Trigger */}
            <div 
              ref={profileRef}
              className="
                relative
                flex
                items-center
                gap-2
                sm:gap-3
                ml-2
                pl-2
                sm:pl-3
                border-l
                border-gray-200
              "
            >
              <div className="text-right hidden sm:block">
                <p className="heading-sm">
                  {userData.name}
                </p>
                <p className="muted-text">
                  {userData.role}
                </p>
              </div>
              <button
                onClick={handleProfileClick}
                className="relative group"
              >
                <Avatar 
                  name={userData.name}
                  src={userData.avatar}
                  size="md"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="
                  absolute
                  right-0
                  top-full
                  mt-2
                  w-56
                  bg-white
                  border
                  border-gray-200
                  rounded-xl
                  shadow-lg
                  z-50
                  animate-in
                  fade-in
                  slide-in-from-top-2
                ">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="heading-sm">{userData.name}</p>
                    <p className="text-xs text-gray-600">{userData.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={handleOpenProfile}
                      className="w-full px-4 py-2.5 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors text-gray-900"
                    >
                      <User size={18} style={{ color: '#0A6E8A' }} />
                      <span className="text-sm font-medium">Profile</span>
                    </button>

                    <button
                      onClick={handleOpenSettings}
                      className="w-full px-4 py-2.5 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors text-gray-900"
                    >
                      <Settings size={18} style={{ color: '#0A6E8A' }} />
                      <span className="text-sm font-medium">Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        setHelpModalOpen(true);
                      }}
                      className="w-full px-4 py-2.5 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors text-gray-900"
                    >
                      <HelpCircle size={18} style={{ color: '#0A6E8A' }} />
                      <span className="text-sm font-medium">Help</span>
                    </button>

                    <div className="border-t border-gray-200 my-2" />

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 flex items-center gap-3 text-left hover:bg-red-50 transition-colors text-red-600"
                    >
                      <LogOut size={18} />
                      <span className="text-sm font-medium">Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0A6E8A] to-[#0a5d75] px-6 py-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Edit Profile</h2>
              <button
                onClick={() => setProfileModalOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Content */}
            <form className="p-6 space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A6E8A] focus:ring-2 focus:ring-[#0A6E8A]/20 transition-colors"
                  placeholder="Enter your username"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A6E8A] focus:ring-2 focus:ring-[#0A6E8A]/20 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="flex-1 px-4 py-2.5 bg-[#0A6E8A] hover:bg-[#085a70] text-white font-semibold rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {settingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0A6E8A] to-[#0a5d75] px-6 py-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Change Password</h2>
              <button
                onClick={() => setSettingsModalOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Content */}
            <form className="p-6 space-y-5">
              {/* Old Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Current Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A6E8A] focus:ring-2 focus:ring-[#0A6E8A]/20 transition-colors"
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A6E8A] focus:ring-2 focus:ring-[#0A6E8A]/20 transition-colors pr-10"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A6E8A] focus:ring-2 focus:ring-[#0A6E8A]/20 transition-colors"
                  placeholder="Confirm new password"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSettingsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="flex-1 px-4 py-2.5 bg-[#0A6E8A] hover:bg-[#085a70] text-white font-semibold rounded-lg transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {helpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0A6E8A] to-[#0a5d75] px-6 py-6 flex items-center justify-between sticky top-0">
              <h2 className="text-xl font-bold text-white">Help & Support</h2>
              <button
                onClick={() => setHelpModalOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* FAQ Section */}
              <div>
                <h3 className="heading-sm mb-4">Frequently Asked Questions</h3>
                
                <div className="space-y-3">
                  <details className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors group">
                    <summary className="flex items-center justify-between font-semibold text-gray-900">
                      <span>How do I update my profile information?</span>
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-sm text-gray-600 mt-3">
                      Click on your profile avatar in the header, select &quot;Profile&quot; from the dropdown menu, and edit your username or email. Save your changes to update your profile.
                    </p>
                  </details>

                  <details className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors group">
                    <summary className="flex items-center justify-between font-semibold text-gray-900">
                      <span>How do I change my password?</span>
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-sm text-gray-600 mt-3">
                      Click on your profile avatar, select &quot;Settings&quot;, and enter your current password along with your new password. Make sure to confirm your new password before submitting.
                    </p>
                  </details>

                  <details className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors group">
                    <summary className="flex items-center justify-between font-semibold text-gray-900">
                      <span>What should I do if I forget my password?</span>
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-sm text-gray-600 mt-3">
                      On the login page, click &quot;Forgot Password&quot; and follow the instructions sent to your registered email address.
                    </p>
                  </details>

                  <details className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors group">
                    <summary className="flex items-center justify-between font-semibold text-gray-900">
                      <span>How can I contact support?</span>
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-sm text-gray-600 mt-3">
                      You can reach our support team at support@university.edu or call +1-800-SUPPORT. We typically respond within 24 hours.
                    </p>
                  </details>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-[#0A6E8A]/5 border border-[#0A6E8A]/30 rounded-lg p-4">
                <h3 className="heading-sm mb-3" style={{ color: '#0A6E8A' }}>Need More Help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Can&apos;t find what you&apos;re looking for? Our support team is here to help.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> support@university.edu</p>
                  <p><strong>Phone:</strong> +1-800-SUPPORT</p>
                  <p><strong>Live Chat:</strong> Available Mon-Fri, 9AM-5PM</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setHelpModalOpen(false)}
                className="w-full px-4 py-2.5 bg-[#0A6E8A] hover:bg-[#085a70] text-white font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
