//import React from 'react'
import Header from '../components/landingPage/Header'
import Hero from '../components/landingPage/Hero'
import Features from '../components/landingPage/Feature'
import Testimonials from '../components/landingPage/Testimonials'
import Pricing from '../components/landingPage/Pricing'
import FAQ from '../components/landingPage/FAQ'
import Footer from '../components/landingPage/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  )
}
