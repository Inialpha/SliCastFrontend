import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Bell,
  ChevronDown,
  Layout,
  Settings,
  Users,
  Mic,
  BarChart,
  FileText,
  Search,
  Menu,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SettingsComponent from '../components/dashboard/setting/settings';
import { useSelector } from 'react-redux';

// Placeholder components for dashboard features
const DashboardHome = () => <div className="p-4">Dashboard Home Content</div>


const AnalyticsComponent = () => <div className="p-4">Analytics Content</div>

const UsersComponent = () => <div className="p-4">Users Management Content</div>

const ContentComponent = () => <div className="p-4">Content Management</div>

export default function Dashboard({ userRole = "user" }: { userRole?: "user" | "admin" }) {
  const [activeItem, setActiveItem] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = useSelector((state) => state.user);                                        console.log(user)
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const sidebarItems = [
    { name: "Dashboard", icon: Layout, component: DashboardHome },
    { name: "Analytics", icon: BarChart, component: AnalyticsComponent },
    { name: "Content", icon: FileText, component: ContentComponent },
    { name: "Settings", icon: Settings, component: SettingsComponent },
    ...(userRole === "admin" ? [{ name: "Users", icon: Users, component: UsersComponent }] : []),
  ]

  const MainComponent = sidebarItems.find((item) => item.name.toLowerCase() === activeItem)?.component || DashboardHome

  return (
    <div className=" h-screen bg-gray-100 w-full">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <Button variant="ghost" onClick={toggleSidebar} className="mr-4 md:hidden">

            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className="relative md:ml-60 ">
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 rounded-full"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex ml-4 items-center">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="ml- flex items-center">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              </div>
            </div>
          </div>
        </header>
      <div className="flex h-screen w-full relative space-x-">
      {/* Sidebar */}
      {/*<aside className="absolute w-64 bg-white shadow-md">*/}
       <aside className={`bg-white absolute w-64 space-y-6 py-7 px-2  inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}  md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <nav className="">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center px-6 py-3 text-gray-700 w-full ${
                activeItem === item.name.toLowerCase() ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveItem(item.name.toLowerCase())}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/*<div className="flex-1 flex flex-col overflow-hidden">*/}
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <MainComponent />

            {/* Podcasts list */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Podcasts</h3>
              <div className="bg-white shadow rounded-lg divide-y">
                {[1, 2, 3].map((podcast) => (
                  <div key={podcast} className="p-4 flex items-center">
                    <Mic className="h-8 w-8 text-gray-500 mr-4" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Podcast Title {podcast}</h4>
                      <p className="text-sm text-gray-500">Last updated: 2 days ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
