//import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to YourProduct</h1>
          <p className="text-xl mb-6 text-gray-600">Discover the amazing features that will revolutionize your workflow.</p>
          <Button asChild variant="outline">
            <Link to="/signup"> Get Started
            </Link>
          </Button>
        </div>
        <div className="md:w-1/2">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Hero Image"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
