//import React from 'react'
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: 'Basic',
    price: '$9.99',
    features: ['1 User', '10 Projects', '5GB Storage', 'Basic Support']
  },
  {
    name: 'Pro',
    price: '$19.99',
    features: ['5 Users', 'Unlimited Projects', '100GB Storage', 'Priority Support']
  },
  {
    name: 'Enterprise',
    price: '$49.99',
    features: ['Unlimited Users', 'Unlimited Projects', '1TB Storage', '24/7 Dedicated Support']
  }
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm font-normal">/month</span></p>
              <ul className="mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mb-2 flex items-center">
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Choose Plan</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
