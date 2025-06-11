'use client';

import React, { useState, useRef } from 'react';

export default function GenerativeBackgroundPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('Minimalist background with a soft pastel gradient even lighting');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

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
      setCurrentPrompt(prompt); // Set the current prompt when image is uploaded
    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateBackground = async () => {
    if (!uploadedImage || !prompt.trim()) {
      setError('Please upload an image and enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    // Small delay to show loading state
    setTimeout(() => {
      setCurrentPrompt(prompt);
      setIsGenerating(false);
    }, 1000);
  };

  const handleDownload = async () => {
    if (!uploadedImage || !currentPrompt) return;

    try {
      const cloudinaryUrl = getCloudinaryUrl();
      if (!cloudinaryUrl) throw new Error('No image URL available');

      const response = await fetch(cloudinaryUrl);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${uploadedImage}_generated_background.png`;
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
    setCurrentPrompt('');
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getCloudinaryUrl = () => {
    if (!uploadedImage || !currentPrompt) return null;
    
    // Clean and encode the prompt properly
    const cleanPrompt = currentPrompt.trim().replace(/[^\w\s-.,]/g, '');
    const encodedPrompt = encodeURIComponent(cleanPrompt);
    const effect = `e_gen_background_replace:prompt_${encodedPrompt}`;
    
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${effect}/${uploadedImage}.png`;
  };

  const canGenerate = uploadedImage && prompt.trim() && prompt !== currentPrompt;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Generative Background Editor</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload and Controls */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Upload & Configure</h2>

            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Select Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="file-input file-input-bordered file-input-primary w-full"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Background Prompt</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-24"
                placeholder="Describe your desired AI background..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={!uploadedImage || isUploading}
              />
              <div className="label">
                <span className="label-text-alt">{prompt.length}/500 characters</span>
              </div>
            </div>

            {isUploading && (
              <div className="mb-4">
                <progress className="progress progress-primary w-full"></progress>
                <p className="text-sm text-gray-600 mt-2">Uploading image...</p>
              </div>
            )}

            <div className="flex gap-2">
              <button 
                className="btn btn-primary flex-1"
                onClick={handleGenerateBackground}
                disabled={!canGenerate || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Generating...
                  </>
                ) : (
                  'Generate Background'
                )}
              </button>
              
              {uploadedImage && (
                <button 
                  className="btn btn-outline"
                  onClick={resetUpload}
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Preview</h2>
            
            {uploadedImage && currentPrompt ? (
              <div>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <img
                    src={getCloudinaryUrl()!}
                    alt="Generated AI background"
                    className="border rounded shadow-lg w-full h-auto"
                    onError={() => setError('Failed to generate background. Please try a different prompt.')}
                  />
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Current prompt:</strong> {currentPrompt}
                </div>

                <button 
                  className="btn btn-success w-full"
                  onClick={handleDownload}
                >
                  Download Image
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p>Upload an image and enter a prompt to see the preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}