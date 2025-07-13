'use client'

import { Copy, Link } from "lucide-react"
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
      className="mt-6 p-6 bg-white border rounded-lg shadow-lg space-y-4"
    >
      <div className="flex items-center text-sm text-muted-foreground gap-1 break-all">
        <Link className="w-4 h-4 text-muted-foreground" />
        <span>{url}</span>
      </div>

      <div>
        <h2 className="font-semibold flex justify-between">
          English Summary
          <Copy
            className="w-4 h-4 cursor-pointer text-gray-500"
            onClick={() => handleCopy(english)}
          />
        </h2>
        <p className="text-base mt-1">{english}</p>
      </div>

      <div>
        <h2 className="font-semibold flex justify-between">
          Urdu Summary
          <Copy
            className="w-4 h-4 cursor-pointer text-gray-500"
            onClick={() => handleCopy(urdu)}
          />
        </h2>
        <p className="text-base mt-1 font-[Jameel-Noori-Nastaleeq]">{urdu}</p>
      </div>
    </motion.div>
  )
}
