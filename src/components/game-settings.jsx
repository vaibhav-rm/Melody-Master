"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Music, Clock, Volume2, Moon } from "lucide-react"

// Sample genres and decades
const genres = [
  { id: "pop", name: "Pop" },
  { id: "rock", name: "Rock" },
  { id: "hiphop", name: "Hip-Hop" },
  { id: "electronic", name: "Electronic" },
  { id: "rnb", name: "R&B" },
  { id: "country", name: "Country" },
  { id: "jazz", name: "Jazz" },
  { id: "classical", name: "Classical" },
]

const decades = [
  { id: "2020s", name: "2020s" },
  { id: "2010s", name: "2010s" },
  { id: "2000s", name: "2000s" },
  { id: "1990s", name: "1990s" },
  { id: "1980s", name: "1980s" },
  { id: "1970s", name: "1970s" },
  { id: "1960s", name: "1960s" },
  { id: "older", name: "Older" },
]

export default function GameSettings({ onClose }) {
  const [difficultyLevel, setDifficultyLevel] = useState("medium")
  const [clipLength, setClipLength] = useState(5)
  const [nightclubMode, setNightclubMode] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [selectedGenres, setSelectedGenres] = useState(["pop", "rock"])
  const [selectedDecades, setSelectedDecades] = useState(["2010s", "2000s"])

  // Toggle genre selection
  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    } else {
      setSelectedGenres([...selectedGenres, genre])
    }
  }

  // Toggle decade selection
  const toggleDecade = (decade) => {
    if (selectedDecades.includes(decade)) {
      setSelectedDecades(selectedDecades.filter((d) => d !== decade))
    } else {
      setSelectedDecades([...selectedDecades, decade])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gradient-to-b from-gray-900 to-black border border-purple-500/20 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.15)] max-w-md w-full max-h-[80vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
          <h2 className="text-xl font-bold text-white">Game Settings</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(80vh-60px)]">
          <div className="space-y-6">
            {/* Gameplay Settings */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Difficulty Level</h3>
              <div className="grid grid-cols-3 gap-2">
                {["easy", "medium", "hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficultyLevel(level)}
                    className={`capitalize p-2 rounded-md transition-colors ${
                      difficultyLevel === level
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-transparent hover:bg-gray-800/50 text-gray-300"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-300">Clip Length</h3>
                <span className="text-sm text-purple-300">{clipLength} seconds</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-500" />
                <input
                  type="range"
                  min={3}
                  max={10}
                  step={1}
                  value={clipLength}
                  onChange={(e) => setClipLength(Number(e.target.value))}
                  className="flex-1 cursor-pointer"
                />
              </div>
            </div>

            {/* Music Settings */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Genres</h3>
              <div className="grid grid-cols-2 gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => toggleGenre(genre.id)}
                    className={`justify-start p-2 rounded-md transition-colors ${
                      selectedGenres.includes(genre.id)
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-transparent hover:bg-gray-800/50 text-gray-300"
                    }`}
                  >
                    <Music className="h-4 w-4 mr-2" />
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Decades</h3>
              <div className="grid grid-cols-2 gap-2">
                {decades.map((decade) => (
                  <button
                    key={decade.id}
                    onClick={() => toggleDecade(decade.id)}
                    className={`justify-start p-2 rounded-md transition-colors ${
                      selectedDecades.includes(decade.id)
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-transparent hover:bg-gray-800/50 text-gray-300"
                    }`}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {decade.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Settings */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-purple-400" />
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Nightclub Mode</h3>
                  <p className="text-xs text-gray-500">Pulsing visuals synced to the beat</p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={nightclubMode}
                onChange={() => setNightclubMode(!nightclubMode)}
                className="cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-purple-400" />
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Dark Mode</h3>
                  <p className="text-xs text-gray-500">Use dark theme for the interface</p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-purple-500/20">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-2 rounded-md"
          >
            Save Settings
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}