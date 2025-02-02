"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

import { ReactNode } from "react";

interface SequentialItemProps {
  children: ReactNode;
  index: number;
}

const SequentialItem = ({ children, index }: SequentialItemProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1])
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -100 : 100, 0, 0])

  return (
    <motion.div ref={ref} style={{ opacity, scale, x }} className="mb-32 last:mb-0">
      {children}
    </motion.div>
  )
}

export default function SequentialReveal() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

const backgroundColor = useTransform(scrollYProgress, [0, 1], ["#1e293b", "#1e293b"])

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      className="min-h-screen overflow-hidden flex flex-col relative items-center justify-start py-20"
    >
      <div className="absolute inset-0 w-full h-full z-20  bg-slate-900 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <div className="w-full max-w-4xl mx-auto flex flex-col relative z-20 px-4">
        <SequentialItem index={0}>
          <div className="flex flex-col md:flex-row items-center bg-slate-900 rounded-lg p-6 shadow-lg">
            <Image
              alt="Collaborative Spreadsheet"
              src="/1.svg"
              height={450}
              width={450}
              className="mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent mb-2">
                Superior to Google Spreadsheet
              </h2>
              <p className="text-gray-300">
                Our collaborative spreadsheet system with version control outperforms Google Sheets by ensuring
                structured editing, controlled data visibility, and robust conflict resolution. It's the ideal choice
                for teams requiring accurate and approved data modifications.
              </p>
            </div>
          </div>
        </SequentialItem>

        <SequentialItem index={1}>
          <div className="flex flex-col md:flex-row-reverse items-center bg-slate-900 rounded-lg p-6 shadow-lg">
            <Image
              alt="Conflict Resolution"
              src="/2.jpg"
              width={450}
              height={450}
              className="mb-4 md:mb-0 md:ml-6"
            />
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent mb-2">
                Minimizing Conflicts, Maximizing Efficiency
              </h2>
              <p className="text-gray-300">
                Our system excels in conflict detection and resolution. When multiple editors modify the same cell, it
                flags the conflict and requires owner approval, preventing unintended overwrites - a crucial feature
                absent in Google Sheets.
              </p>
            </div>
          </div>
        </SequentialItem>

        <SequentialItem index={2}>
          <div className="flex flex-col md:flex-row items-center bg-slate-900 rounded-lg p-6 shadow-lg">
            <Image alt="Data Visibility" src="/3.jpg" width={450} height={450} className="mb-4 md:mb-0 md:mr-6" />
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent mb-2">
                Enhanced Data Visibility and Integration
              </h2>
              <p className="text-gray-300">
                We offer controlled data visibility and structured tracking, with changes visible only after owner
                approval. Our system seamlessly integrates with databases like MySQL or PostgreSQL, enabling structured
                storage and connections to other applications.
              </p>
            </div>
          </div>
        </SequentialItem>

        <SequentialItem index={3}>
          <div className="flex flex-col md:flex-row-reverse items-center bg-slate-900 rounded-lg p-6 shadow-lg">
            <Image alt="Collaboration" src="/4.jpg" width={450} height={450} className="mb-4 md:mb-0 md:ml-6" />
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent mb-2">
                Perfect for Precision and Teamwork
              </h2>
              <p className="text-gray-300">
                Our system is tailor-made for teams requiring version control, conflict resolution, and commit-based
                editing. It ensures superior accuracy and collaboration, making it particularly valuable in fields such
                as finance, inventory management, and project tracking.
              </p>
            </div>
          </div>
        </SequentialItem>
      </div>
    </motion.div>
  )
}

