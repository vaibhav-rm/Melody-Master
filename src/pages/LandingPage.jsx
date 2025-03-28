import { Link } from "react-router-dom"
import { Music, Play, Users, Trophy, Sparkles, ArrowRight } from "lucide-react"
import LandingHeader from "../components/LandingHeader"
import FeatureCard from "../components/FeatureCard"
import AudioWaveAnimation from "../components/AudioWaveAnimation"

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950">
      <LandingHeader />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 relative z-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Melody Master
            </span>
          </h1>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>

        <p className="text-xl text-gray-300 mb-10 max-w-2xl">
          The ultimate music guessing game. Test your knowledge, challenge your friends, and discover new music in this
          immersive audio experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            to="/play"
            className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium flex items-center justify-center transition-colors"
          >
            <Play className="mr-2 h-5 w-5" />
            Play Now
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-md border border-purple-500/50 text-purple-300 hover:bg-purple-950/50 font-medium flex items-center justify-center transition-colors"
          >
            <Users className="mr-2 h-5 w-5" />
            Join Multiplayer
          </Link>
        </div>

        <AudioWaveAnimation />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Game Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Music className="h-10 w-10 text-purple-400" />}
            title="Vast Music Library"
            description="Thousands of songs across different genres and decades to test your music knowledge."
          />

          <FeatureCard
            icon={<Users className="h-10 w-10 text-purple-400" />}
            title="Multiplayer Lobbies"
            description="Create private lobbies and invite friends to compete in real-time music challenges."
          />

          <FeatureCard
            icon={<Trophy className="h-10 w-10 text-purple-400" />}
            title="Global Leaderboards"
            description="Compete with players worldwide and climb the ranks to become a Melody Master."
          />

          <FeatureCard
            icon={<Sparkles className="h-10 w-10 text-purple-400" />}
            title="Dynamic Difficulty"
            description="Adaptive gameplay that adjusts to your skill level for the perfect challenge."
          />

          <FeatureCard
            icon={<Music className="h-10 w-10 text-purple-400" />}
            title="Genre Specialization"
            description="Focus on your favorite genres or expand your horizons with new musical styles."
          />

          <FeatureCard
            icon={<Music className="h-10 w-10 text-purple-400" />}
            title="Custom Game Modes"
            description="Create custom game modes with specific settings for a personalized experience."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden backdrop-blur-lg bg-black/40 p-10 rounded-xl border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to test your music knowledge?</h2>
              <p className="text-gray-300 mb-6">
                Create an account to track your progress, join multiplayer lobbies, and compete on the global
                leaderboards.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium flex items-center justify-center transition-colors"
                >
                  Create Account
                </Link>

                <Link
                  to="/login"
                  className="px-6 py-3 rounded-md border border-purple-500/50 text-purple-300 hover:bg-purple-950/50 font-medium flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Log In
                </Link>
              </div>
            </div>

            <div className="hidden md:block w-64 h-64 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full animate-pulse"></div>
              <div
                className="absolute inset-4 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full animate-pulse"
                style={{ animationDelay: "300ms" }}
              ></div>
              <div
                className="absolute inset-8 bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-full animate-pulse"
                style={{ animationDelay: "600ms" }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Music className="h-20 w-20 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Music className="h-6 w-6 mr-2 text-purple-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Melody Master
            </span>
          </div>

          <div className="flex gap-6">
            <Link to="/about" className="text-gray-400 hover:text-purple-300 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-purple-300 transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-purple-300 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-purple-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Melody Master. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

