"use client"

import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const MAX_FILE_SIZE = 70 * 1024 * 1024 // 70 MB

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      alert("File too large. Max file size is 70MB.")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("originalSize", file.size.toString())

    try {
      await axios.post("/api/video-upload", formData)
      alert("Upload successful")
      router.push("/")
    } catch (error) {
      console.error(error)
      alert("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>📹 Upload Video</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter video title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter video description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="video">Video File</Label>
              <Input
                id="video"
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
                className="file:bg-green-600 file:hover:bg-green-700 file:text-white file:font-medium file:border-none file:px-1 file:py-1"
              />
              <p className="text-sm text-muted-foreground">Max size: 70MB</p>
            </div>

            {isUploading && <Progress value={50} className="h-2" />}

            <div className="pt-4">
              <Button type="submit" disabled={isUploading} className="w-full">
                {isUploading ? "Uploading..." : "Upload Video"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default VideoUpload
