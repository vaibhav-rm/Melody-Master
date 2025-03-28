"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function VinylRecord({ isPlaying }) {
  const canvasRef = useRef(null)

  // Draw vinyl record
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 10

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw outer ring
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.fillStyle = "#111111"
    ctx.fill()

    // Add vinyl texture (grooves)
    for (let r = radius - 10; r > radius / 3; r -= 3) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, r, 0, 2 * Math.PI)
      ctx.strokeStyle = `rgba(30, 30, 30, ${Math.random() * 0.5 + 0.5})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw label
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius / 3, 0, 2 * Math.PI)
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius / 3)
    gradient.addColorStop(0, "#a855f7")
    gradient.addColorStop(1, "#6b21a8")
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw center hole
    ctx.beginPath()
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI)
    ctx.fillStyle = "#000000"
    ctx.fill()

    // Add shine effect
    ctx.beginPath()
    ctx.ellipse(centerX - radius / 4, centerY - radius / 4, radius / 10, radius / 5, Math.PI / 4, 0, 2 * Math.PI)
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
    ctx.fill()
  }, [])

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{
          rotate: isPlaying ? 360 : 0,
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: isPlaying ? Infinity : 0,
        }}
        className="relative"
      >
        <canvas ref={canvasRef} width={240} height={240} className="rounded-full shadow-lg" />

        {/* Reflection overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  )
}