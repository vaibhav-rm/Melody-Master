"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"

// Sample song database for autocomplete
const SONG_DATABASE = [
  "Bohemian Rhapsody",
  "Billie Jean",
  "Smells Like Teen Spirit",
  "Lose Yourself",
  "Rolling in the Deep",
  "Sweet Child O' Mine",
  "Hotel California",
  "Imagine",
  "Thriller",
  "Stairway to Heaven",
  "Like a Rolling Stone",
  "Yesterday",
  "Purple Haze",
  "Respect",
  "Johnny B. Goode",
]

export default function GuessInput({ onGuess, isDisabled }) {
  const [guess, setGuess] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Update suggestions when guess changes
  useEffect(() => {
    if (guess.length > 1) {
      const filteredSuggestions = SONG_DATABASE.filter((song) =>
        song.toLowerCase().includes(guess.toLowerCase()),
      ).slice(0, 5)

      setSuggestions(filteredSuggestions)
      setShowSuggestions(filteredSuggestions.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [guess])

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (guess.trim() && !isDisabled) {
      onGuess(guess)
      setGuess("")
    }
  }

  // Select suggestion
  const selectSuggestion = (suggestion) => {
    setGuess(suggestion)
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Type your guess here..."
          disabled={isDisabled}
          className={`pr-12 bg-black/30 border border-purple-500/30 focus:border-purple-500 h-12 text-white placeholder:text-gray-500 rounded-md ${
            isDisabled ? "opacity-50" : ""
          }`}
        />

        <button
          type="submit"
          disabled={isDisabled || !guess.trim()}
          className="absolute right-1 top-1 h-10 w-10 bg-purple-600 hover:bg-purple-700 rounded-md flex items-center justify-center"
        >
          <Search className="h-5 w-5 text-white" />
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-black/80 backdrop-blur-md border border-purple-500/30 shadow-lg py-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => selectSuggestion(suggestion)}
              className="px-4 py-2 hover:bg-purple-800/30 cursor-pointer text-gray-300 hover:text-white transition-colors"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}