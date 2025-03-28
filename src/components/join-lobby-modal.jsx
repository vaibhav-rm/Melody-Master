"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

export default function JoinLobbyModal({ onClose }) {
  const [lobbyCode, setLobbyCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Join lobby
  const joinLobby = () => {
    if (!lobbyCode.trim()) {
      alert("Please enter a lobby code") // Replace toast with alert for simplicity
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Check if lobby exists (this is just a simulation)
      if (lobbyCode.length === 6 && lobbyCode === lobbyCode.toUpperCase()) {
        alert("Joining lobby...") // Replace toast with alert for simplicity

        // Simulate navigation to lobby
        console.log(`Redirecting to lobby: ${lobbyCode}`);
        onClose(); // Close the modal after joining
      } else {
        alert("Invalid lobby code or lobby not found") // Replace toast with alert for simplicity
      }
    }, 1500)
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
        className="bg-gradient-to-b from-gray-900 to-black border border-purple-500/20 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.15)] max-w-md w-full"
      >
        <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
          <h2 className="text-xl font-bold text-white">Join Lobby</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="lobbyCode" className="mb-2 block text-sm font-medium text-gray-300">
                Enter Lobby Code
              </label>
              <input
                id="lobbyCode"
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value.toUpperCase())}
                placeholder="e.g. ABC123"
                className="bg-black/30 border border-gray-800 focus:border-purple-500 text-center text-xl tracking-widest uppercase h-12 rounded-md p-2"
                maxLength={6}
              />
              <p className="mt-2 text-sm text-gray-400">Enter the 6-character code provided by the lobby host</p>
            </div>

            <button
              onClick={joinLobby}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Joining..." : "Join Lobby"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}