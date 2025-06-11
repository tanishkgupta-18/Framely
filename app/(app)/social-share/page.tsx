"use client"

import React, { useState, useEffect, useRef } from "react"
import { CldImage } from "next-cloudinary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
}

type SocialFormat = keyof typeof socialFormats

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)")
  const [isUploading, setIsUploading] = useState(false)
  const [isTransforming, setIsTransforming] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (uploadedImage) setIsTransforming(true)
  }, [selectedFormat, uploadedImage])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to upload image")

      const data = await response.json()
      setUploadedImage(data.publicId)
    } catch (error) {
      console.error(error)
      alert("Image upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownload = () => {
    if (!imageRef.current) return

    fetch(imageRef.current.src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      })
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">🎯 Social Media Image Creator</h1>

      <Card className="shadow-md border rounded-2xl">
        <CardHeader>
          <CardTitle>Upload an Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="upload">Select an image file</Label>
            <Input id="upload" type="file" onChange={handleFileUpload} className="file:bg-green-600 file:hover:bg-green-700 file:text-white file:font-medium file:border-none file:px-1 file:py-1"
            />
          </div>

          {isUploading && <Progress value={70} className="h-2 w-full" />}

          {uploadedImage && (
            <>
              <div className="space-y-2">
                <Label>Select Format</Label>
                <Select
                  value={selectedFormat}
                  onValueChange={(value) => setSelectedFormat(value as SocialFormat)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose format" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(socialFormats).map((format) => (
                      <SelectItem key={format} value={format}>
                        {format}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-6 relative">
                <h3 className="text-lg font-semibold mb-2">Preview</h3>
                <div className="relative flex justify-center items-center min-h-[300px] border rounded-xl bg-muted">
                  {isTransforming && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-xl">
                      <Skeleton className="h-20 w-20 rounded-full animate-pulse" />
                    </div>
                  )}
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadedImage}
                    sizes="100vw"
                    alt="Preview"
                    crop="fill"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    gravity="auto"
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                    className="rounded-xl shadow-md"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button onClick={handleDownload}>Download {selectedFormat}</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
