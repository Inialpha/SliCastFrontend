import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Home, Bell, MessageSquare, Settings, User, Search } from 'lucide-react'
import { Link } from 'react-router-dom';
import { getRequest } from '../utils/apis';
import PodcastCard from '../components/podcast/PodcastCard';
import _ from 'lodash';


export default function Feed() {
  const [podcasts, setPodcasts] = useState(null);
 
  const toCamelCaseKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCaseKeys);
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = _.camelCase(key);
      result[camelKey] = toCamelCaseKeys(obj[key]);
      return result;
    }, {});
  }
  return obj;
};

  useEffect(() => {
    const fetchPodcast = async () => {
      const url = `${import.meta.env.VITE_API_URL}/podcasts/`
      try {
        const res = await getRequest(url);
        if (res.ok) {
          const fetchedPodcast = await res.json()
          const camelCasePodcasts = fetchedPodcast.map((podcast) => toCamelCaseKeys(podcast));
          setPodcasts(camelCasePodcasts)
          console.log("fetchedPodcast: ", fetchedPodcast)
          console.log("camel: ", camelCasePodcasts)
          console.log(podcasts)
        } else {
          console.log("unable to load podcast")
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchPodcast()
  },[]);

  useEffect(() => {
  // This will run every time `podcasts` updates
  console.log("Updated podcasts:", podcasts);
}, [podcasts]);
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                Logo
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Messages</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 space-y-8">
          
          {podcasts && podcasts.map((podcast, idx) => (
            <PodcastCard podcast={podcast} />
          ))};
          
        </div>
      </main>
    </div>
  )
}
