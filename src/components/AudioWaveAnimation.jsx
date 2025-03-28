"use client"

import { useEffect, useRef } from "react"

function AudioWaveAnimation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 500
    canvas.height = 100

    // Animation variables
    const bars = 50
    const barWidth = (canvas.width / bars) * 0.8
    const barMargin = (canvas.width / bars) * 0.2
    let animationFrame

    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw bars
      for (let i = 0; i < bars; i++) {
        // Calculate bar height (simulated audio data)
        const time = Date.now() / 1000
        const frequency = 0.5 + (i / bars) * 2 // Different frequency for each bar
        const amplitude = 0.3 + (Math.sin(time * 0.5) + 1) / 4 // Varying amplitude over time
        const barHeight = Math.abs(Math.sin(time * frequency) * amplitude * canvas.height)

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "rgba(168, 85, 247, 0.8)") // Purple
        gradient.addColorStop(1, "rgba(236, 72, 153, 0.4)") // Pink

        ctx.fillStyle = gradient

        // Draw bar with rounded corners
        const x = i * (barWidth + barMargin)
        const y = canvas.height - barHeight

        ctx.beginPath()
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, barHeight, 3)
        } else {
          // Fallback for browsers that don't support roundRect
          ctx.rect(x, y, barWidth, barHeight)
        }
        ctx.fill()
      }

      // Add glow effect
      ctx.shadowBlur = 15
      ctx.shadowColor = "rgba(168, 85, 247, 0.5)"

      animationFrame = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="w-full max-w-md mx-auto">
      <canvas ref={canvasRef} width={500} height={100} className="w-full h-[100px]" />
    </div>
  )
}

export default AudioWaveAnimation

