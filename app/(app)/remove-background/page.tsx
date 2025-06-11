'use client';

import React, { useState, useRef } from 'react';
import { CldImage } from 'next-cloudinary';

export default function RemoveBackgroundPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showRemoved, setShowRemoved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (e.g., 10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const data = await response.json();
      setUploadedImage(data.publicId);
      setShowRemoved(true);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!uploadedImage) return;

    try {
      // Create Cloudinary URL with background removal
      const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/e_background_removal/${uploadedImage}.png`;
      
      const response = await fetch(cloudinaryUrl);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${uploadedImage}_background_removed.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download image. Please try again.');
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setShowRemoved(false);
    setError(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Remove Image Background</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Upload Image</h2>
          
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered file-input-primary w-full"
            onChange={handleFileUpload}
            disabled={isUploading}
          />

          {isUploading && (
            <div className="mt-4">
              <progress className="progress progress-primary w-full"></progress>
              <p className="text-sm text-gray-600 mt-2">Processing image...</p>
            </div>
          )}

          {uploadedImage && showRemoved && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Background Removed</h2>
                <button 
                  className="btn btn-outline btn-sm" 
                  onClick={resetUpload}
                >
                  Upload Another
                </button>
              </div>
              
              <div className="flex justify-center bg-gray-100 p-4 rounded-lg">
                <CldImage
                  width="500"
                  height="500"
                  src={uploadedImage}
                  alt="Background removed image"
                  removeBackground
                  crop="pad"
                  className="border rounded shadow-lg"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button 
                  className="btn btn-success" 
                  onClick={handleDownload}
                  disabled={!uploadedImage}
                >
                  Download PNG
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}