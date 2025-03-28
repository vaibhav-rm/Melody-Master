"use client"

import { motion } from "framer-motion"
import { X, Trophy, Medal, Award } from "lucide-react"

// Sample leaderboard data
const LEADERBOARD_DATA = [
  { rank: 1, name: "MusicMaster", score: 12500, streak: 25 },
  { rank: 2, name: "BeatDetective", score: 10200, streak: 18 },
  { rank: 3, name: "RhythmKing", score: 9800, streak: 15 },
  { rank: 4, name: "MelodyHunter", score: 8600, streak: 12 },
  { rank: 5, name: "SongSleuth", score: 7900, streak: 10 },
  { rank: 6, name: "You", score: 7500, streak: 8 },
  { rank: 7, name: "TuneTracker", score: 6800, streak: 7 },
  { rank: 8, name: "BassBooster", score: 5900, streak: 5 },
  { rank: 9, name: "HarmonyHero", score: 5200, streak: 4 },
  { rank: 10, name: "ChordCrusher", score: 4800, streak: 3 },
]

export default function Leaderboard({ onClose }) {
  // Get medal for top 3 ranks
  const getMedal = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-400" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-300" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return null
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
          <h2 className="text-xl font-bold text-white flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
            Global Leaderboard
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(80vh-60px)]">
          <div className="space-y-2">
            {LEADERBOARD_DATA.map((entry) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: entry.rank * 0.05 }}
                className={`flex items-center p-3 rounded-lg ${
                  entry.name === "You"
                    ? "bg-purple-900/30 border border-purple-500/30"
                    : entry.rank <= 3
                      ? "bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/30"
                      : "bg-gray-900/30"
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 mr-3">
                  {getMedal(entry.rank) || <span className="text-gray-400 font-medium">{entry.rank}</span>}
                </div>

                <div className="flex-1">
                  <div className="font-medium text-white">{entry.name}</div>
                  <div className="text-xs text-gray-400">Best Streak: {entry.streak}</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-purple-300">{entry.score.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">points</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}