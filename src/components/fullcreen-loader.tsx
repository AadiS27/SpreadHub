"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FullscreenLoaderProps {
  label?: string
  description?: string
  variant?: "default" | "minimal" | "branded"
  showProgress?: boolean
}

export const FullscreenLoader = ({
  label = "Loading",
  description,
  variant = "default",
  showProgress = false,
}: FullscreenLoaderProps) => {
  const [progress, setProgress] = useState(0)

  // Simulate progress for visual feedback
  useEffect(() => {
    if (!showProgress) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Slow down as we approach 100%
        const increment = Math.max(0.5, (100 - prev) / 20)
        const newValue = Math.min(99, prev + increment)
        return newValue
      })
    }, 300)

    return () => clearInterval(interval)
  }, [showProgress])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        {variant === "branded" ? (
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-70 blur-lg"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-lg">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <LoaderIcon className="size-10 text-primary" />
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <motion.div
              className={cn(
                "absolute -inset-4 rounded-full opacity-20",
                variant === "minimal" ? "bg-muted" : "bg-primary/20",
              )}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <LoaderIcon className={cn("size-10", variant === "minimal" ? "text-muted-foreground" : "text-primary")} />
            </motion.div>
          </div>
        )}

        {label && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h3
              className={cn("text-xl font-medium", variant === "minimal" ? "text-muted-foreground" : "text-foreground")}
            >
              {label}
            </h3>

            {description && <p className="text-sm text-muted-foreground max-w-xs">{description}</p>}
          </motion.div>
        )}

        {showProgress && (
          <motion.div
            className="w-64 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
            </div>
            {variant !== "minimal" && (
              <p className="text-xs text-muted-foreground mt-1 text-right">{Math.round(progress)}%</p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
