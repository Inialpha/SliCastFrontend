//import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          YourLogo
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="#features" className="text-gray-600 hover:text-blue-600">Features</Link>
          <Link to="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</Link>
          <Link to="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
          <Link to="#faq" className="text-gray-600 hover:text-blue-600">FAQ</Link>
        </nav>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
