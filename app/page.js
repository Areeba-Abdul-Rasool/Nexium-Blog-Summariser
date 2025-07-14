'use client'

import { useState, useEffect, useRef } from "react"
import BlogForm from "../components/blogform"
import SummaryCard from "../components/summaryCard"
import { Toaster } from "react-hot-toast"
import Image from "next/image"

export default function Home() {
  const [summaryData, setSummaryData] = useState(null)
  const [selectedUrl, setSelectedUrl] = useState("")
  const summaryRef = useRef(null)

  const handleSummary = (data) => {
    setSummaryData(data)
    setTimeout(() => {
      summaryRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="bg-[#9e72c3] w-full pb-20">
        <nav className="w-full px-6 py-4 flex justify-between items-center text-white bg-transparent">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/logo.png"
              alt="BlogSummariser Logo"
              width={220}
              height={60}
              className="object-contain drop-shadow-lg"
            />
          </div>
          <div className="flex gap-8 items-center text-white text-base">
            <a href="#how-it-works" className="hover:text-purple-200 transition">How it works</a>
            <a href="#features" className="hover:text-purple-200 transition">Features</a>
            <a href="#about" className="hover:text-purple-200 transition">About</a>
            <a
              href="#summariser"
              className="bg-white text-[#9e72c3] px-4 py-2 rounded-full shadow hover:bg-purple-100 transition text-sm"
            >
              Try Now
            </a>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="text-white space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold">Summarise Blogs with AI</h1>
            <p className="text-lg text-purple-100 max-w-md">
              Enter any blog URL and get a quick summary in English & Urdu. Smart, fast, and beautiful.
            </p>

            <BlogForm selectedUrl={selectedUrl} onSummary={handleSummary} />
          </div>

          <div>
            <Image
              src="/img.png"
              alt="AI blog graphic"
              width={500}
              height={400}
              className="rounded-xl w-full shadow-xl object-cover"
            />
          </div>
        </div>
      </div>

      <section className="bg-white py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#843179]">Try with these blogs</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "https://jamesclear.com/atomic-habits",
            "https://blog.hubspot.com/marketing/content-marketing",
            "https://www.dotcomblogs.com/food-street-in-karachi-volume-2-hussainabad/",
            "https://www.nti.org/countries/pakistan/" ,
            "https://ifthespoonfits.com/"
            
          ].map((url, i) => (
            <button
              key={i}
              onClick={() => setSelectedUrl(url)}
              className="bg-[#ede9f3] hover:bg-[#dccfea] text-[#6d48a3] font-medium px-4 py-2 rounded-full shadow-sm transition"
            >
              {url.length > 40 ? url.slice(0, 40) + "..." : url}
            </button>
          ))}
        </div>

        {summaryData && (
          <div className="mt-10" ref={summaryRef}>
            <SummaryCard
              url={summaryData.url}
              english={summaryData.summary}
              urdu={summaryData.translatedSummary}
            />
          </div>
        )}
      </section>

      <Toaster position="top-right" />
    </main>
  )
}
