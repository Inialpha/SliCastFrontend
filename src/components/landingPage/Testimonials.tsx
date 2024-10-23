//import React from 'react'

const testimonials = [
  {
    name: 'John Doe',
    role: 'CEO, TechCorp',
    content: 'This product has transformed our business. Highly recommended!',
    avatar: '/placeholder.svg?height=100&width=100'
  },
  {
    name: 'Jane Smith',
    role: 'Designer, CreativeCo',
    content: 'The user interface is intuitive and the features are powerful. Love it!',
    avatar: '/placeholder.svg?height=100&width=100'
  },
  {
    name: 'Mike Johnson',
    role: 'Freelancer',
    content: 'As a freelancer, this tool has been a game-changer for my productivity.',
    avatar: '/placeholder.svg?height=100&width=100'
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">&quot;{testimonial.content}&quot;</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
