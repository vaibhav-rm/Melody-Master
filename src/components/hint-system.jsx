"use client"

import { Lightbulb, Music, Calendar, Tag } from "lucide-react"
import { motion } from "framer-motion"

export default function HintSystem({ onUseHint, hintsUsed, isDisabled }) {
  const hints = [
    {
      id: "artist",
      icon: <Music className="h-4 w-4" />,
      label: "Artist",
      description: "First letter of the artist's name",
    },
    {
      id: "year",
      icon: <Calendar className="h-4 w-4" />,
      label: "Year",
      description: "Year the song was released",
    },
    {
      id: "genre",
      icon: <Tag className="h-4 w-4" />,
      label: "Genre",
      description: "Music genre of the song",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {hints.map((hint, index) => {
        const isUsed = hintsUsed > index

        return (
          <motion.div
            key={hint.id}
            whileHover={{ scale: isDisabled || isUsed ? 1 : 1.03 }}
            className={`relative overflow-hidden rounded-lg border ${
              isUsed
                ? "bg-purple-900/20 border-purple-500/30"
                : "bg-black/30 border-gray-800 hover:border-purple-500/30"
            } p-4 transition-colors`}
          >
            {isUsed && (
              <div className="absolute top-0 right-0 bg-purple-600 px-2 py-1 text-xs font-medium text-white rounded-bl-lg">
                Used
              </div>
            )}

            <div className="flex flex-col items-center text-center">
              <div className={`p-2 rounded-full ${isUsed ? "bg-purple-600/30" : "bg-gray-800"} mb-3`}>
                {hint.icon}
              </div>

              <h3 className="text-sm font-medium text-white mb-1">{hint.label}</h3>
              <p className="text-xs text-gray-400 mb-3">{hint.description}</p>

              <button
                disabled={isDisabled || isUsed}
                onClick={() => onUseHint(hint.id)}
                className={`w-full flex items-center justify-center p-2 rounded-md transition-colors ${
                  isUsed
                    ? "bg-purple-800/30 text-purple-300 hover:bg-purple-800/30"
                    : "bg-transparent hover:bg-purple-900/30 hover:text-purple-300"
                }`}
              >
                <Lightbulb className="h-3 w-3 mr-1" />
                {isUsed ? "Hint Used" : "Use Hint"}
              </button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}