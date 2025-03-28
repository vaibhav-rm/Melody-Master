"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Music, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Music className="h-6 w-6 mr-2 text-purple-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Melody Master
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-purple-300 transition-colors">
              Home
            </Link>
            <Link to="/play" className="text-gray-300 hover:text-purple-300 transition-colors">
              Play
            </Link>
            <Link to="/leaderboard" className="text-gray-300 hover:text-purple-300 transition-colors">
              Leaderboard
            </Link>
            <Link to="/how-to-play" className="text-gray-300 hover:text-purple-300 transition-colors">
              How to Play
            </Link>
          </nav>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 border-b border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:text-purple-300 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/play"
                  className="text-gray-300 hover:text-purple-300 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Play
                </Link>
                <Link
                  to="/leaderboard"
                  className="text-gray-300 hover:text-purple-300 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Leaderboard
                </Link>
                <Link
                  to="/how-to-play"
                  className="text-gray-300 hover:text-purple-300 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How to Play
                </Link>

                <div className="flex flex-col gap-2 pt-4 border-t border-gray-800">
                  <Link
                    to="/login"
                    className="w-full py-2 px-4 border border-gray-700 rounded-md text-center text-gray-300 hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>

                  <Link
                    to="/register"
                    className="w-full py-2 px-4 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-center transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default LandingHeader

