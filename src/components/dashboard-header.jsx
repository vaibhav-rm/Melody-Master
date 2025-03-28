"use client"

import { useState } from "react"
import { Music, Bell, User, Settings, LogOut, Menu, X } from "lucide-react"
// import { useHistory } from "react-router-dom"; // Use react-router-dom for navigation

export default function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const history = useHistory(); // Use history for navigation

  const handleLogout = () => {
    // Simulate logout
    history.push("/login"); // Redirect to login page
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/dashboard" className="flex items-center">
            <Music className="h-6 w-6 mr-2 text-purple-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Melody Master
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/dashboard" className="text-gray-300 hover:text-purple-300 transition-colors">
              Dashboard
            </a>
            <a href="/play" className="text-gray-300 hover:text-purple-300 transition-colors">
              Play
            </a>
            <a href="/leaderboard" className="text-gray-300 hover:text-purple-300 transition-colors">
              Leaderboard
            </a>
            <a href="/shop" className="text-gray-300 hover:text-purple-300 transition-colors">
              Shop
            </a>
          </nav>

          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button className="relative text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="relative">
              <button className="h-8 w-8 rounded-full bg-purple-800 flex items-center justify-center">
                <span className="text-sm">J</span>
              </button>
              <div className="absolute right-0 w-56 bg-gray-900 border border-gray-800 mt-2 rounded-md shadow-lg">
                <div className="p-2 text-gray-300">My Account</div>
                <div className="bg-gray-800 h-px"></div>
                <a href="/profile" className="flex items-center text-gray-300 hover:bg-gray-800 p-2">
                  <User  className="mr-2 h-4 w-4" />
                  Profile
                </a>
                <a href="/settings" className="flex items-center text-gray-300 hover:bg-gray-800 p-2">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </a>
                <div className="bg-gray-800 h-px"></div>
                <button
                  className="flex items-center text-red-400 hover:bg-gray-800 p-2 w-full text-left"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              <a
                href="/dashboard"
                className="text-gray-300 hover:text-purple-300 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </a>
              <a
                href="/play"
                className="text-gray-300 hover:text-purple-300 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Play
              </a>
              <a
                href="/leaderboard"
                className="text-gray-300 hover:text-purple-300 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leaderboard
              </a>
              <a
                href="/shop"
                className="text-gray-300 hover:text-purple-300 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </a>

              <div className="flex flex-col gap-2 pt-4 border-t border-gray-800">
                <a
                  href="/profile"
                  className="text-gray-300 hover:text-purple-300 transition-colors py-2 flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User  className="h-5 w-5 mr-2" />
                  Profile
                </a>
                <a
                  href="/settings"
                  className="text-gray-300 hover:text-purple-300 transition-colors py-2 flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </a>
                <button
                  className="text-red-400 hover:text-red-300 transition-colors py-2 flex items-center"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Log out
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}