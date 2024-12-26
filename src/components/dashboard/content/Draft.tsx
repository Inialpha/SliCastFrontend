import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Home, Bell, MessageSquare, Settings, User, Search } from 'lucide-react'
import { Link } from 'react-router-dom';
import { getRequest } from '../../../utils/apis';
import PodcastCard from '../../podcast/PodcastCard';
import toCamelCase from '../../../utils/toCamelCase';
import { useSelector } from 'react-redux';


export default function Draft({ podcasts }) {
  
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 space-y-8">
          
          {podcasts && podcasts.map((podcast, idx) => (
            <PodcastCard podcast={podcast} fromDashboard={true} />
          ))}
          
        </div>
      </main>
    </div>
  )
}
