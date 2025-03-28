"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Confetti() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Confetti particles
    const particles = []
    const particleCount = 150
    const gravity = 0.3
    const colors = [
      "#a855f7", // Purple
      "#ec4899", // Pink
      "#3b82f6", // Blue
      "#10b981", // Green
      "#f59e0b", // Yellow
    ]

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        speed: Math.random() * 3 + 2,
        rotationSpeed: Math.random() * 5 - 2.5,
        oscillationSpeed: Math.random() * 0.5 + 0.5,
        oscillationDistance: Math.random() * 40 + 20,
        initialX: 0,
      })

      particles[i].initialX = particles[i].x
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.y += p.speed
        p.x = p.initialX + Math.sin((p.y * p.oscillationSpeed) / 100) * p.oscillationDistance
        p.rotation += p.rotationSpeed

        // Draw particle
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)

        // Draw confetti piece
        ctx.beginPath()
        ctx.fillStyle = p.color

        // Randomly choose between rectangle and circle
        if (i % 2 === 0) {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2)
        } else {
          ctx.arc(0, 0, p.size / 2, 0, 2 * Math.PI)
          ctx.fill()
        }

        ctx.restore()

        // Reset if particle is out of screen
        if (p.y > canvas.height) {
          particles[i].y = -p.size
          particles[i].initialX = Math.random() * canvas.width
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none z-50"
    />
  )
}