"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Copy, Music, Users, Lock, Globe, Clock } from "lucide-react"

export default function CreateLobbyModal({ onClose }) {
  const [lobbyName, setLobbyName] = useState("My Music Lobby")
  const [isPrivate, setIsPrivate] = useState(true)
  const [maxPlayers, setMaxPlayers] = useState(4)
  const [selectedGenres, setSelectedGenres] = useState(["pop", "rock"])
  const [difficulty, setDifficulty] = useState("medium")
  const [lobbyCode, setLobbyCode] = useState("")
  const [isCreated, setIsCreated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Toggle genre selection
  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    } else {
      setSelectedGenres([...selectedGenres, genre])
    }
  }

  // Create lobby
  const createLobby = () => {
    if (!lobbyName.trim()) {
      alert("Please enter a lobby name") // Replace toast with alert for simplicity
      return
    }

    if (selectedGenres.length === 0) {
      alert("Please select at least one genre") // Replace toast with alert for simplicity
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Generate random lobby code
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      setLobbyCode(code)
      setIsCreated(true)

      alert("Lobby created successfully") // Replace toast with alert for simplicity
    }, 1500)
  }

  // Copy lobby code to clipboard
  const copyLobbyCode = () => {
    navigator.clipboard.writeText(lobbyCode)
    alert("Lobby code copied to clipboard") // Replace toast with alert for simplicity
  }

  // Start game
  const startGame = () => {
    // Redirect to lobby (replace with your routing logic)
    console.log(`Starting game in lobby: ${lobbyCode}`)
    onClose()
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
          <h2 className="text-xl font-bold text-white">{isCreated ? "Lobby Created" : "Create Lobby"}</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(80vh-60px)]">
          {!isCreated ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="lobbyName" className="block text-sm font-medium text-gray-300">Lobby Name</label>
                <input
                  id="lobbyName"
                  value={lobbyName}
                  onChange={(e) => setLobbyName(e.target.value)}
                  placeholder="Enter lobby name"
                  className="bg-black/30 border border-gray-800 focus:border-purple-500 h-12 text-white placeholder:text-gray-500 rounded-md p-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-300">Private Lobby</h3>
                    <p className="text-xs text-gray-500">Only players with the code can join</p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={() => setIsPrivate(!isPrivate)}
                  className="cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-300">Max Players</label>
                  <span className="text-sm text-purple-300">{maxPlayers}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-gray-500" />
                  <input
                    type="range"
                    min={2}
                    max={8}
                    step={1}
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(Number(e.target.value))}
                    className="flex-1 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Difficulty</label>
                <div className="flex space-x-2">
                  {["easy", "medium", "hard"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`p-2 rounded-md transition-colors ${
                        difficulty === level
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
                <label className="mb-2 block text-sm font-medium text-gray-300">Music Genres</label>
                <div className="grid grid-cols-2 gap-2">
                  {["pop", "rock", "hiphop", "electronic", "rnb", "country"].map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`justify-start capitalize p-2 rounded-md transition-colors ${
                                                selectedGenres.includes(genre)
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : "bg-transparent hover:bg-gray-800/50 text-gray-300"
                      }`}
                    >
                      <Music className="h-4 w-4 mr-2" />
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={createLobby}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-2 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Lobby"}
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30 mx-auto max-w-xs">
                <h3 className="text-lg font-medium text-white mb-2">Lobby Code</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="text-2xl font-bold tracking-widest text-purple-300 bg-black/30 px-4 py-2 rounded-md">
                    {lobbyCode}
                  </div>
                  <button
                    onClick={copyLobbyCode}
                    className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2 rounded-full"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-400">Share this code with your friends to let them join your lobby</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Lobby Name:</span>
                  <span className="text-white">{lobbyName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Privacy:</span>
                  <span className="text-white flex items-center">
                    {isPrivate ? (
                      <>
                        <Lock className="h-4 w-4 mr-1 text-purple-400" />
                        Private
                      </>
                    ) : (
                      <>
                        <Globe className="h-4 w-4 mr-1 text-green-400" />
                        Public
                      </>
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Max Players:</span>
                  <span className="text-white">{maxPlayers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Difficulty:</span>
                  <span
                    className={`text-white capitalize ${
                      difficulty === "easy"
                        ? "text-green-400"
                        : difficulty === "medium"
                          ? "text-yellow-400"
                          : "text-red-400"
                    }`}
                  >
                    {difficulty}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Genres:</span>
                  <span className="text-white capitalize">{selectedGenres.join(", ")}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-2 rounded-md"
                >
                  Start Game
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}