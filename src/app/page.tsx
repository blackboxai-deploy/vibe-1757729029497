"use client";

import CreativeForm from "@/components/CreativeForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -right-8 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-indigo-500 rounded-full opacity-20 blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Creative Form
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the future of form design with smooth animations and modern interactions
          </p>
        </div>
        
        <CreativeForm />
      </div>
    </main>
  );
}