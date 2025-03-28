"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Clock, Lightbulb, Trophy, Settings, Users, User } from "lucide-react";
import AudioPlayer from "./audio-player";
import GuessInput from "./guess-input";
import HintSystem from "./hint-system";
import VinylRecord from "./vinyl-record";
import Leaderboard from "./leaderboard";
import GameSettings from "./game-settings";
import Confetti from "./confetti";
import { searchSongs, getVideoUrl } from "../Helper/musicHelper"; // Import your helper functions

// Sample players for multiplayer mode
const PLAYERS = [
  { id: 1, name: "Player1", avatar: "/placeholder.svg?height=40&width=40", score: 0 },
  { id: 2, name: "You", avatar: "/placeholder.svg?height=40&width=40", score: 0 },
  { id: 3, name: "MusicMaster", avatar: "/placeholder.svg?height=40&width=40", score: 0 },
  { id: 4, name: "RhythmKing", avatar: "/placeholder.svg?height=40&width=40", score: 0 },
];

export default function MusicGame() {
  const [gameMode, setGameMode] = useState("solo"); // solo or multiplayer
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [players, setPlayers] = useState(PLAYERS);
  const [gameStarted, setGameStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [correctGuess, setCorrectGuess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const timerRef = useRef(null);

  // Start a new round
  const startNewRound = () => {
    setTimeRemaining(30);
    setHintsUsed(0);
    setIsPlaying(true);
    setCorrectGuess(false);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsPlaying(false);
          handleIncorrectGuess();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle correct guess
  const handleCorrectGuess = () => {
    clearInterval(timerRef.current);
    setIsPlaying(false);
    setCorrectGuess(true);
    setShowConfetti(true);

    const newPoints = Math.max(100 + timeRemaining * 10 - hintsUsed * 25, 50);
    setScore((prev) => prev + newPoints);
    setStreak((prev) => prev + 1);

    if (gameMode === "multiplayer") {
      setPlayers((prev) =>
        prev.map((player) => (player.name === "You" ? { ...player, score: player.score + newPoints } : player))
      );
    }

    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    setTimeout(() => {
      startNewRound();
    }, 5000);
  };

  // Handle incorrect guess
  const handleIncorrectGuess = () => {
    setStreak(0);
    setTimeout(() => {
      startNewRound();
    }, 3000);
  };

  // Handle guess submission
  const handleGuess = (guess) => {
    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedTitle = currentSong.title.toLowerCase().trim();

    if (normalizedGuess === normalizedTitle) {
      handleCorrectGuess();
    } else {
      // Handle incorrect guess feedback
    }
  };

  // Use a hint
  const useHint = (hintType) => {
    setHintsUsed((prev) => prev + 1);
    let hintMessage = "";

    switch (hintType) {
      case "artist":
        hintMessage = `Artist: ${currentSong.artist.charAt(0)}${".".repeat(currentSong.artist.length - 1)}`;
        break;
      case "year":
        hintMessage = `Year: ${currentSong.year}`;
        break;
      case "genre":
        hintMessage = `Genre: ${currentSong.genre}`;
        break;
      default:
        hintMessage = "Here's a hint!";
    }

    // Show hint feedback
  };

  // Start game
  const startGame = () => {
    setGameStarted(true);
    startNewRound();
  };

  // Function to handle song search
  const handleSearch = async () => {
    const results = await searchSongs(searchQuery);
    setSearchResults(results);
  };

  // Function to select a song
  const handleSelectSong = (videoId) => {
    const selectedSong = searchResults.find((item) => item.id.videoId === videoId);
    if (selectedSong) {
      setCurrentSong({
        title: selectedSong.snippet.title,
        artist: selectedSong.snippet.channelTitle,
        videoId: videoId,
        clip: getVideoUrl(videoId), // Use the video URL for the audio player
      });
      setSearchResults([]);
      startNewRound();
    }
  };

  // Simulate other players making guesses in multiplayer mode
  useEffect(() => {
    if (gameMode === "multiplayer" && gameStarted && isPlaying) {
      const simulatePlayerGuess = () => {
        const otherPlayers = players.filter((p) => p.name !== "You");
        const randomPlayer = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];

        const isCorrect = Math.random() < 0.3;

        if (isCorrect && !correctGuess) {
          const points = Math.floor(Math.random() * 100) + 50;

          setPlayers((prev) =>
            prev.map((player) =>
              player.id === randomPlayer.id ? { ...player, score: player.score + points } : player
            )
          );
        }
      };

      const interval = setInterval(() => {
        simulatePlayerGuess();
      }, Math.random() * 5000 + 5000);

      return () => clearInterval(interval);
    }
  }, [gameMode, gameStarted, isPlaying, players, correctGuess]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 relative min-h-screen flex flex-col">
      {showConfetti && <Confetti />}

      {/* Game Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Music className="h-8 w-8 mr-2 text-purple-400" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Melody Master
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowLeaderboard(true)}
            className="relative text-purple-400 hover:text-purple-300 hover:bg-purple-950/50 p-2 rounded-full"
          >
            <Trophy className="h-5 w-5" />
          </button>

          <button
            onClick={() => setShowSettings(true)}
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-950/50 p-2 rounded-full"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>

      {!gameStarted ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-lg bg-black/40 p-8 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Game Mode</h2>

            <div className="w-full mb-6">
              <div className="grid grid-cols-2 mb-6">
                <button
                  onClick={() => setGameMode("solo")}
                  className={`flex items-center justify-center p-4 rounded-lg ${gameMode === "solo" ? "bg-purple-600" : "bg-gray-800"}`}
                >
                  <User  className="h-4 w-4 mr-2" />
                  Solo
                </button>
                <button
                  onClick={() => setGameMode("multiplayer")}
                  className={`flex items-center justify-center p-4 rounded-lg ${gameMode === "multiplayer" ? "bg-purple-600" : "bg-gray-800"}`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Multiplayer
                </button>
              </div>

              {/* Search Bar for YouTube Songs */}
              <div className="mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a song..."
                  className="w-full p-2 rounded-lg bg-gray-800 text-white"
                />
                <button
                  onClick={handleSearch}
                  className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg"
                >
                  Search
                </button>
              </div>

              {/* Display Search Results */}
              {searchResults.length > 0 && (
                <div className="bg-black/30 rounded-lg p-3 mb-6">
                  <h3 className="text-sm font-medium text-purple-300 mb-2">Search Results:</h3>
                  <ul className="space-y-2">
                    {searchResults.map((item) => (
                      <li key={item.id.videoId} className="flex justify-between items-center">
                        <span className="text-gray-300">{item.snippet.title}</span>
                        <button
                          onClick={() => handleSelectSong(item.id.videoId)}
                          className="bg-purple-600 hover:bg-purple-700 text-white p-1 rounded-lg"
                        >
                          Select
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-lg"
              >
                Start Game
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Game Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="backdrop-blur-md bg-black/30 rounded-lg p-4 border border-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.1)]">
              <div className="text-sm text-gray-400 mb-1">Score</div>
              <div className="text-2xl font-bold text-white">{score}</div>
            </div>

            <div className="backdrop-blur-md bg-black/30 rounded-lg p-4 border border-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.1)]">
              <div className="text-sm text-gray-400 mb-1">Streak</div>
              <div className="text-2xl font-bold text-white">{streak}</div>
            </div>

            <div className="backdrop-blur-md bg-black/30 rounded-lg p-4 border border-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.1)]">
              <div className="text-sm text-gray-400 mb-1">Time</div>
              <div className="text-2xl font-bold text-white flex items-center">
                <Clock className="h-5 w-5 mr-2 text-purple-400" />
                {timeRemaining}s
              </div>
            </div>
          </div>

          {/* Main Game Area */}
          <div className="flex-1 grid md:grid-cols-5 gap-6">
            {/* Left Side - Vinyl and Audio Player */}
            <div className="md:col-span-2 flex flex-col">
              <div className="backdrop-blur-lg bg-black/40 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] p-6 flex-1 flex flex-col items-center justify-center">
                <VinylRecord isPlaying={isPlaying} />

                <div className="w-full mt-8">
                  <AudioPlayer
                    songUrl={currentSong?.clip}
                    isPlaying={isPlaying}
                    onPlayPause={() => setIsPlaying(!isPlaying)}
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Guessing and Hints */}
            <div className="md:col-span-3 flex flex-col gap-6">
              {/* Guessing Area */}
              <div className="backdrop-blur-lg bg-black/40 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] p-6">
                <h2 className="text-xl font-bold text-white mb-4">Guess The Song</h2>
                <GuessInput onGuess={handleGuess} isDisabled={!isPlaying || correctGuess} />

                {correctGuess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg"
                  >
                    <p className="text-green-300 font-medium">
                      Correct! The song was "{currentSong.title}" by {currentSong.artist}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Hints Area */}
              <div className="backdrop-blur-lg bg-black/40 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] p-6">
                <div className="flex items-center mb-4">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Hints</h2>
                </div>

                <HintSystem onUseHint={useHint} hintsUsed={hintsUsed} isDisabled={!isPlaying || correctGuess} />
              </div>

              {/* Players Area (Multiplayer Only) */}
              {gameMode === "multiplayer" && (
                <div className="backdrop-blur-lg bg-black/40 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Players</h2>

                  <div className="space-y-3">
                    {players
                      .sort((a, b) => b.score - a.score)
                      .map((player) => (
                        <div
                          key={player.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            player.name === "You" ? "bg-purple-900/30 border border-purple-500/30" : "bg-black/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-purple-800 flex items-center justify-center overflow-hidden">
                              <span>{player.name.charAt(0)}</span>
                            </div>
                            <span className="font-medium text-white">{player.name}</span>
                          </div>
                          <span className="font-bold text-purple-300">{player.score}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <AnimatePresence>{showSettings && <GameSettings onClose={() => setShowSettings(false)} />}</AnimatePresence>

      {/* Leaderboard Modal */}
      <AnimatePresence>{showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}</AnimatePresence>
    </div>
  );
}