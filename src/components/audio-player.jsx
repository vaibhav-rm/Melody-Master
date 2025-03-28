"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function AudioPlayer({ songUrl, isPlaying, onPlayPause }) {
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [audioContext, setAudioContext] = useState(null)
  const [analyser, setAnalyser] = useState(null)
  const [audioData, setAudioData] = useState(null)

  const audioRef = useRef(null)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  // Initialize audio context and analyser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const context = new AudioContext()
      const analyserNode = context.createAnalyser()
      analyserNode.fftSize = 256

      setAudioContext(context)
      setAnalyser(analyserNode)
      setAudioData(new Uint8Array(analyserNode.frequencyBinCount))
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      if (audioContext) {
        audioContext.close()
      }
    }
  }, [])

  // Connect audio element to analyser when audio is loaded
  useEffect(() => {
    if (audioRef.current && audioContext && analyser) {
      const source = audioContext.createMediaElementSource(audioRef.current)
      source.connect(analyser)
      analyser.connect(audioContext.destination)
    }
  }, [audioRef.current, audioContext, analyser])

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
        if (audioContext?.state === "suspended") {
          audioContext.resume()
        }
        drawWaveform()
      } else {
        audioRef.current.pause()
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [isPlaying, audioContext])

  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Draw waveform animation
  const drawWaveform = () => {
    if (!canvasRef.current || !analyser || !audioData) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Get frequency data
    analyser.getByteFrequencyData(audioData)

    // Draw waveform
    const barWidth = (width / audioData.length) * 2.5
    let x = 0

    for (let i = 0; i < audioData.length; i++) {
      const barHeight = (audioData[i] / 255) * height

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, "rgba(168, 85, 247, 0.8)") // Purple
      gradient.addColorStop(1, "rgba(236, 72, 153, 0.4)") // Pink

      ctx.fillStyle = gradient

      // Draw bar with rounded corners
      ctx.beginPath()
      ctx.roundRect(x, height - barHeight, barWidth - 1, barHeight, 3)
      ctx.fill()

      x += barWidth
    }

    // Add glow effect
    ctx.shadowBlur = 15
    ctx.shadowColor = "rgba(168, 85, 247, 0.5)"

    animationRef.current = requestAnimationFrame(drawWaveform)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="w-full">
      <audio ref={audioRef} src={songUrl} loop={false} crossOrigin="anonymous" className="hidden" />

      <div className="mb-4">
        <canvas ref={canvasRef} width={500} height={100} className="w-full h-[100px] rounded-lg bg-black/30" />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onPlayPause}
          className="h-10 w-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>

        <button
          onClick={toggleMute}
          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-transparent flex items-center justify-center"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={isMuted ? 0 : volume * 100}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="w-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}