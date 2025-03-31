"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface AnimatedButtonProps {
  title: string
}

export default function AnimatedButton({title, className}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
      <div className="relative group">
        {/* Base animated border */}
        <motion.div
          className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
          animate={{
            background: [
              "linear-gradient(0deg, #2563eb, #9333ea, #db2777)",
              "linear-gradient(90deg, #db2777, #2563eb, #9333ea)",
              "linear-gradient(180deg, #9333ea, #db2777, #2563eb)",
              "linear-gradient(270deg, #2563eb, #9333ea, #db2777)",
            ],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 4,
            ease: "linear",
          }}
        />

        {/* Button */}
        <motion.button
          className="relative px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium text-[16px] shadow-xl overflow-hidden"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Leading gradient effect */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ left: "-100%" }}
            animate={{ left: ["0%", "100%"] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2.5,
              ease: "easeInOut",
              repeatDelay: 0.5,
            }}
          >
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
          </motion.div>

          {/* Moving vertical line */}
          <motion.div
            className="absolute top-0 bottom-0 w-0.5 bg-white opacity-40 blur-[2px] rounded-full z-10"
            initial={{ left: "-5%" }}
            animate={{
              left: ["0%", "100%"],
              boxShadow: [
                "0 0 6px 1px rgba(255, 255, 255, 0.4), 0 0 8px 2px rgba(168, 111, 255, 0.4)",
                "0 0 6px 1px rgba(255, 255, 255, 0.4), 0 0 8px 2px rgba(191, 111, 255, 0.4)",
                "0 0 6px 1px rgba(255, 255, 255, 0.4), 0 0 8px 2px rgba(216, 111, 255, 0.4)",
              ],
            }}
            transition={{
              left: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 2.5,
                ease: "easeInOut",
                repeatDelay: 0.5,
              },
              boxShadow: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "linear",
              },
            }}
          />

          <motion.span
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="relative z-20"
          >
            {title}
          </motion.span>

          {/* Particles on hover */}
          {isHovered && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full z-20"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 100],
                    y: [0, (Math.random() - 0.5) * 100],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: i * 0.05,
                  }}
                />
              ))}
            </>
          )}
        </motion.button>
      </div>
  )
}

