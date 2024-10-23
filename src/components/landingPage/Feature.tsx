//import React from 'react'
import { Zap, Shield, Smile } from 'lucide-react'

const features = [
  {
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    title: 'Lightning Fast',
    description: 'Our product is optimized for speed, ensuring you get results quickly.'
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: 'Secure',
    description: 'Your data is protected with state-of-the-art security measures.'
  },
  {
    icon: <Smile className="h-8 w-8 text-blue-500" />,
    title: 'User Friendly',
    description: 'Intuitive design makes our product easy to use for everyone.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
