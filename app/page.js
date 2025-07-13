import BlogForm from "../components/blogform"
import { Toaster } from "react-hot-toast"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 py-20">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
          Blog Summariser
        </h1>
        <BlogForm />
      </div>
      <Toaster position="top-right" />
    </main>
  )
}
