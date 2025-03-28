"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Music, Trophy, Plus, Users } from "lucide-react"
import DashboardHeader from "../components/dashboard-header"
import CreateLobbyModal from "../components/create-lobby-modal"
import JoinLobbyModal from "../components/join-lobby-modal"

// Sample recent games data
const RECENT_GAMES = [
  { id: 1, date: "2023-06-15", score: 850, rank: 2, players: 4, genre: "Pop" },
  { id: 2, date: "2023-06-14", score: 720, rank: 1, players: 3, genre: "Rock" },
  { id: 3, date: "2023-06-12", score: 650, rank: 3, players: 5, genre: "Hip-Hop" },
  { id: 4, date: "2023-06-10", score: 920, rank: 1, players: 4, genre: "Electronic" },
]

// Sample friends data
const FRIENDS = [
  { id: 1, name: "MusicMaster", status: "online", lastPlayed: "2 hours ago" },
  { id: 2, name: "BeatDetective", status: "offline", lastPlayed: "1 day ago" },
  { id: 3, name: "RhythmKing", status: "in-game", lastPlayed: "Just now" },
  { id: 4, name: "MelodyHunter", status: "online", lastPlayed: "3 hours ago" },
]

// Sample achievements data
const ACHIEVEMENTS = [
  { id: 1, name: "First Victory", description: "Win your first game", completed: true, date: "2023-06-10" },
  { id: 2, name: "Perfect Score", description: "Get all songs correct in a game", completed: true, date: "2023-06-12" },
  {
    id: 3,
    name: "Genre Master",
    description: "Win 5 games in a specific genre",
    completed: false,
    progress: 3,
    total: 5,
  },
  { id: 4, name: "Streak Master", description: "Achieve a 10-song streak", completed: false, progress: 7, total: 10 },
]

function DashboardPage() {
  const [showCreateLobby, setShowCreateLobby] = useState(false)
  const [showJoinLobby, setShowJoinLobby] = useState(false)
  const [activeTab, setActiveTab] = useState("recent")

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="backdrop-blur-lg bg-black/40 p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <h2 className="text-lg font-medium text-gray-300 mb-4">Your Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Score</p>
                <p className="text-2xl font-bold text-white">12,450</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Games Played</p>
                <p className="text-2xl font-bold text-white">28</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Win Rate</p>
                <p className="text-2xl font-bold text-white">68%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Best Streak</p>
                <p className="text-2xl font-bold text-white">15</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-black/40 p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <h2 className="text-lg font-medium text-gray-300 mb-4">Global Rank</h2>
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-3">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <p className="text-3xl font-bold text-white">#156</p>
                <p className="text-sm text-gray-400">Top 5%</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-black/40 p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <h2 className="text-lg font-medium text-gray-300 mb-4">Genre Mastery</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Pop</span>
                  <span className="text-sm text-purple-400">85%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Rock</span>
                  <span className="text-sm text-purple-400">72%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                    style={{ width: "72%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Hip-Hop</span>
                  <span className="text-sm text-purple-400">63%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                    style={{ width: "63%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Play Options */}
        <div className="backdrop-blur-lg bg-black/40 p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Play Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/play"
              className="h-auto py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-md flex flex-col items-center transition-colors"
            >
              <Music className="h-8 w-8 mb-2" />
              <span className="text-lg font-medium text-white">Quick Play</span>
              <span className="text-xs text-purple-200">Play solo instantly</span>
            </Link>

            <button
              className="h-auto py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-md flex flex-col items-center transition-colors"
              onClick={() => setShowCreateLobby(true)}
            >
              <Plus className="h-8 w-8 mb-2 text-white" />
              <span className="text-lg font-medium text-white">Create Lobby</span>
              <span className="text-xs text-blue-200">Host a game with friends</span>
            </button>

            <button
              className="h-auto py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-md flex flex-col items-center transition-colors"
              onClick={() => setShowJoinLobby(true)}
            >
              <Users className="h-8 w-8 mb-2 text-white" />
              <span className="text-lg font-medium text-white">Join Lobby</span>
              <span className="text-xs text-green-200">Enter a lobby code</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="w-full">
          <div className="flex border-b border-gray-800 mb-6">
            <button
              className={`py-2 px-4 font-medium ${activeTab === "recent" ? "text-white border-b-2 border-purple-600" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("recent")}
            >
              Recent Games
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === "friends" ? "text-white border-b-2 border-purple-600" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("friends")}
            >
              Friends
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === "achievements" ? "text-white border-b-2 border-purple-600" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("achievements")}
            >
              Achievements
            </button>
          </div>

          {activeTab === "recent" && (
            <div className="backdrop-blur-lg bg-black/40 p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <h2 className="text-xl font-bold text-white mb-6">Recent Games</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Score</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Rank</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Players</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Genre</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_GAMES.map((game) => (
                      <tr key={game.id} className="border-b border-gray-800/50 hover:bg-purple-900/10">
                        <td className="py-3 px-4 text-gray-300">{game.date}</td>
                        <td className="py-3 px-4 text-white font-medium">{game.score}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              game.rank === 1
                                ? "bg-yellow-500/20 text-yellow-300"
                                : game.rank === 2
                                  ? "bg-gray-500/20 text-gray-300"
                                  : "bg-amber-500/20 text-amber-300"
                            }`}
                          >
                            #{game.rank}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{game.players}</td>
                        <td className="py-3 px-4 text-gray-300">{game.genre}</td>
                        <td className="py-3 px-4 text-right">
                          <button className="px-3 py-1 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 rounded-md transition-colors">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "friends" && (
            <div className="backdrop-blur-lg bg-black/40 p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Friends</h2>
                <button className="px-3 py-1 border border-purple-500/50 text-purple-300 hover:bg-purple-950/50 rounded-md transition-colors flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Friend
                </button>
              </div>

              <div className="space-y-4">
                {FRIENDS.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-black/30 hover:bg-purple-900/10"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-800 flex items-center justify-center overflow-hidden mr-3">
                        <span className="text-white">{friend.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{friend.name}</p>
                        <div className="flex items-center">
                          <span
                            className={`h-2 w-2 rounded-full mr-2 ${
                              friend.status === "online"
                                ? "bg-green-500"
                                : friend.status === "in-game"
                                  ? "bg-blue-500"
                                  : "bg-gray-500"
                            }`}
                          ></span>
                          <p className="text-xs text-gray-400">
                            {friend.status === "online"
                              ? "Online"
                              : friend.status === "in-game"
                                ? "In Game"
                                : "Offline"}
                            {" · "}
                            {friend.lastPlayed}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button className="px-3 py-1 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 rounded-md transition-colors">
                        Invite
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="backdrop-blur-lg bg-black/40 p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <h2 className="text-xl font-bold text-white mb-6">Achievements</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.completed ? "bg-purple-900/20 border-purple-500/30" : "bg-black/30 border-gray-800"
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`p-2 rounded-full ${achievement.completed ? "bg-purple-600" : "bg-gray-800"} mr-3`}
                      >
                        <Trophy className="h-5 w-5 text-white" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-white mb-1">{achievement.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>

                        {achievement.completed ? (
                          <div className="flex items-center">
                            <span className="text-xs text-purple-300">Completed on {achievement.date}</span>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-gray-400">Progress</span>
                              <span className="text-xs text-purple-300">
                                {achievement.progress}/{achievement.total}
                              </span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full"
                                style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Create Lobby Modal */}
      {showCreateLobby && <CreateLobbyModal onClose={() => setShowCreateLobby(false)} />}

      {/* Join Lobby Modal */}
      {showJoinLobby && <JoinLobbyModal onClose={() => setShowJoinLobby(false)} />}
    </div>
  )
}

export default DashboardPage

