'use client'

import { useState, useEffect, useRef } from "react"
import { Send, Loader2 } from "lucide-react"
import toast from "react-hot-toast"

export default function BlogForm({ selectedUrl, onSummary }) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    if (selectedUrl) setUrl(selectedUrl)
  }, [selectedUrl])

  const handleSubmit = async () => {
    if (!url.trim()) {
      toast.error("Please enter a blog URL")
      return
    }

    setLoading(true)

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!res.ok) throw new Error("Failed to summarise")

      const data = await res.json()
      toast.success("Summary generated!")
      onSummary({ ...data, url }) // pass to parent
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={formRef} className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 rounded px-4 py-2 outline-none bg-white text-black placeholder:text-gray-500 shadow-sm transition-all duration-200"
          placeholder="Enter Blog URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          className="bg-[#6d48a3] text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-[#5c3a93] disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-4 w-4" /> Summarise</>}
        </button>
      </div>
    </div>
  )
}
