"use client"

import { useState } from "react"
import { Music, User, Camera, Edit, Save } from "lucide-react"
import DashboardHeader from "../components/dashboard-header"
//import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState("JazzMaster")
  const [email, setEmail] = useState("jazzmaster@example.com")
  const [bio, setBio] = useState(
    "Music enthusiast with a passion for jazz and classical. I've been playing piano for 10 years and love guessing music from all eras.",
  )
  const [isLoading, setIsLoading] = useState(false)
 // const { toast } = useToast()

  // Save profile changes
  const saveChanges = () => {
    if (!username.trim() || !email.trim()) {
      toast({
        title: "Error",
        description: "Username and email are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="backdrop-blur-lg bg-black/40 p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-purple-800 flex items-center justify-center overflow-hidden">
                  <User  className="h-16 w-16 text-purple-300" />
                </div>

                {isEditing && (
                  <button
                    className="absolute bottom-0 right-0 rounded-full bg-purple-600 hover:bg-purple-700 text-white p-2"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
                      <input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-black/30 border-gray-800 focus:border-purple-500 border rounded-md p-2 w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/30 border-gray-800 focus:border-purple-500 border rounded-md p-2 w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-300">Bio</label>
                      <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="bg-black/30 border-gray-800 focus:border-purple-500 border rounded-md p-2 w-full min-h-[100px]"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-white mb-2">{username}</h1>
                    <p className="text-gray-400 mb-4">{email}</p>
                    <p className="text-gray-300">{bio}</p>
                  </>
                )}
              </div>

              <div>
                {isEditing ? (
                  <button
                    onClick={saveChanges}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-2 rounded-md"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="border border-purple-500/50 text-purple-300 hover:bg-purple-950/50 p-2 rounded-md"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="w-full">
            <div className="flex mb-6 bg-black/40 border border-gray-800 rounded-md">
              <button className="flex-1 p-4 text-center text-white hover:bg-purple-600" onClick={() => setActiveTab('stats')}>Stats</button>
              <button className="flex-1 p-4 text-center text-white hover:bg-purple-600" onClick={() => setActiveTab('history')}>Game History</button>
              <button className="flex-1 p-4 text-center text-white hover:bg-purple-600" onClick={() => setActiveTab('badges')}>Badges</button>
            </div>

            {activeTab === 'stats' && (
              <div className="backdrop-blur-lg bg-black/40 p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <h2 className="text-xl font-bold text-white mb-6">Your Stats</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                    <h3 className="text-lg font-medium text-white mb-4">Overall</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Games Played</span>
                          <span className="text-sm text-purple-300">128</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full w-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Win Rate</span>
                          <span className="text-sm text-purple-300">68%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full" style={{ width: "68%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Avg. Score</span>
                          <span className="text-sm text-purple-300">720</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                    <h3 className="text-lg font-medium text-white mb-4">Genre Performance</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Pop</span>
                          <span className="text-sm text-purple-300">85%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Rock</span>
                          <span className="text-sm text-purple-300">72%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Hip-Hop</span>
                          <span className="text-sm text-purple-300">63%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full" style={{ width: "63%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                    <h3 className="text-lg font-medium text-white mb-4">Decade Performance</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">2010s</span>
                          <span className="text-sm text-purple-300">92%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">2000s</span>
                          <span className="text-sm text-purple-300">78%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">1990s</span>
                          <span className="text-sm text-purple-300">65%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="backdrop-blur-lg bg-black/40 p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <h2 className="text-xl font-bold text-white mb-6">Game History</h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Game Type</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Score</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Rank</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Songs</th>
                        <th className="text-right py-3 px-4 text-gray-400 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(10)].map((_, i) => (
                        <tr key={i} className="border-b border-gray-800/50 hover:bg-purple-900/10">
                          <td className="py-3 px-4 text-gray-300">
                            {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-white font-medium">
                            {i % 3 === 0 ? "Solo" : i % 3 === 1 ? "Multiplayer" : "Tournament"}
                          </td>
                          <td className="py-3 px-4 text-white font-medium">{Math.floor(Math.random() * 500) + 500}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                i % 4 === 0
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : i % 4 === 1
                                    ? "bg-gray-500/20 text-gray-300"
                                    : i % 4 === 2
                                      ? "bg-amber-500/20 text-amber-300"
                                      : "bg-purple-500/20 text-purple-300"
                              }`}
                            >
                              #{i % 4 === 0 ? 1 : i % 4 === 1 ? 2 : i % 4 === 2 ? 3 : Math.floor(Math.random() * 5) + 4}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {Math.floor(Math.random() * 5) + 5}/{Math.floor(Math.random() * 5) + 5}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 p-2 rounded-md"
                            >
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

            {activeTab === 'badges' && (
              <div className="backdrop-blur-lg bg-black/40 p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <h2 className="text-xl font-bold text-white mb-6">Badges & Achievements</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-lg border text-center ${
                        i < 5 ? "bg-purple-900/20 border-purple-500/30" : "bg-black/30 border-gray-800 opacity-60"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`p-3 rounded-full ${i < 5 ? "bg-purple-600" : "bg-gray-800"} mb-3`}>
                          <Music className="h-6 w-6 text-white" />
                        </div>

                        <h3 className="font-medium text-white mb-1">
                          {
                            [
                              "Music Master",
                              "Perfect Score",
                              "Streak King",
                              "Genre Expert",
                              "Quick Guesser",
                              "Completionist",
                              "Tournament Winner",
                              "Legend",
                            ][i]
                          }
                        </h3>

                        <p className="text-xs text-gray-400 mb-2">
                          {i < 5
                            ? "Earned on " + new Date(Date.now() - i * 7 * 86400000).toLocaleDateString()
                            : "Not earned yet"}
                        </p>

                        {i >= 5 && (
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-gray-400">Progress</span>
                              <span className="text-xs text-purple-300">{Math.floor(Math.random() * 70) + 10}%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full"
                                style={{ width: `${Math.floor(Math.random() * 70) + 10}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}