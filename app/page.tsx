"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { 
  Sparkles, 
  Share2, 
  ImageIcon, 
  Wand2, 
  ArrowRight, 
  CheckCircle,
  Play,
  Zap,
  Palette,
  Upload
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
        
        <div className="container mx-auto px-4 py-24 text-center relative">
          <div className="animate-fade-in">
            <Badge variant="outline" className="mb-6 text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-700 hover:shadow-md transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Creative Suite
            </Badge>
            
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Transform Your
              <br />
              <span className="relative text-purple-300">
                Creative Vision
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              From stunning social media content to professional image editing, 
              Framely's AI-powered tools make creativity effortless and extraordinary.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/social-share">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Start Creating Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/remove-background">
                <Button variant="outline" size="lg" className="border-2 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group">
                  <Play className="mr-2 h-4 w-4" />
                  Try Background Remover
                </Button>
              </Link>
            </div>
            
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-700">
              Powerful Features
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional-grade tools powered by cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Share2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Social Media Optimizer</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Instantly resize and optimize your content for Instagram, Twitter, LinkedIn, and more with pixel-perfect precision.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Multiple platform support
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Smart cropping & resizing
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ImageIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">AI Background Remover</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Remove backgrounds with surgical precision using advanced AI. Perfect for portraits, products, and creative projects.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    One-click background removal
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    High-quality edge detection
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Wand2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Generative Backgrounds</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Create stunning, custom backgrounds from text prompts. Transform any scene with AI-generated environments.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Text-to-background generation
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Unlimited creative possibilities
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              Professional results in seconds, not hours
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">1. Upload</h3>
              <p className="text-gray-600">
                Drag and drop your image or select from your device
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">2. Process</h3>
              <p className="text-gray-600">
                Our AI works its magic in under 5 seconds
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">3. Download</h3>
              <p className="text-gray-600">
                Get your enhanced image ready for sharing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Transform Your Images?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of creators who trust Framely for their image editing needs
          </p>
          <Link href="/social-share">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            © {new Date().getFullYear()} Framely. Crafted with passion by Tanishk G.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}