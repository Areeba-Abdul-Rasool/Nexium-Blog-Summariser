'use client'

import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
import SummaryCard from "./summaryCard"
import toast from "react-hot-toast"

export default function BlogForm() {

  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState(null)

  const handleSubmit = async () => {
    if (!url.trim()){
      toast.error("please enter a blog URL")
      return
    }

    setLoading(true)
    setSummary(null)

    try{
      const res = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL, {
       method : "POST",
       headers : {"content-Type" : "application/json" },
       body : JSON.stringify({url})  
      })

      if (!res.ok) throw new Error("Failed to summarise")
      
      const data = await res.json()
      toast.success("Summary generated!")
      setSummary(data)
    }
    catch (err){
      console.error(err)
      toast.error("something went wrong.")
    }finally{
      setLoading(false)
    }
  }


  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-4 outline-none shadow-sm"
          placeholder="Enter Blog URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)} />

        <button
          className="bg-black text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-gray-900 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading} >
            
          {loading ? ( <Loader2 className="h-4 w-4 animate-spin" /> )
          : ( <> <Send className="h-4 w-4" /> Summarise </>
          )}
        </button>
      </div>
      {summary && (
        <SummaryCard
          url={url}
          english={summary.summary}
          urdu={summary.translatedSummary}
        />
      )}
    </div>
  )
}
