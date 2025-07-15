'use client'

import { Copy, Link, Languages } from "lucide-react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

export default function SummaryCard({ url, english, urdu }) {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto mt-10 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 rounded-2xl shadow-md p-6 md:p-8 space-y-6"
    >
      <div className="flex items-center text-sm text-gray-500 gap-2 break-all">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-purple-700 gap-2 hover:underline"
        >
          <Link className="w-4 h-4" />
          <span className="break-all">{url}</span>
        </a>

      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center justify-between">
          <span className="flex items-center gap-2 text-purple-700">
            English Summary
          </span>
          <Copy
            className="w-5 h-5 text-gray-500 cursor-pointer hover:text-purple-700"
            onClick={() => handleCopy(english)}
          />
        </h2>
        <p className="text-base leading-relaxed text-gray-700">
          {english}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center justify-between">
          <span className="flex items-center gap-2 text-purple-700">
            اردو خلاصہ
          </span>
          <Copy
            className="w-5 h-5 text-gray-500 cursor-pointer hover:text-purple-700"
            onClick={() => handleCopy(urdu)}
          />
        </h2>
        <p className="text-base leading-relaxed text-right text-gray-700 font-[Jameel-Noori-Nastaleeq]">
          {urdu}
        </p>
      </div>
    </motion.div>
  )
}
