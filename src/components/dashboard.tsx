import { useState } from "react"
import { Bell, ChevronDown, Layout, Settings, Users, Mic, BarChart, FileText, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Placeholder components for dashboard features
const DashboardHome = () => <div className="p-4">Dashboard Home Content</div>
const SettingsComponent = () => <div className="p-4">Settings Content</div>
const AnalyticsComponent = () => <div className="p-4">Analytics Content</div>
const UsersComponent = () => <div className="p-4">Users Management Content</div>
const ContentComponent = () => <div className="p-4">Content Management</div>

export default function Dashboard({ userRole = "user" }: { userRole?: "user" | "admin" }) {
  const [activeItem, setActiveItem] = useState("dashboard")

  const sidebarItems = [
    { name: "Dashboard", icon: Layout, component: DashboardHome },
    { name: "Analytics", icon: BarChart, component: AnalyticsComponent },
    { name: "Content", icon: FileText, component: ContentComponent },
    { name: "Settings", icon: Settings, component: SettingsComponent },
    ...(userRole === "admin" ? [{ name: "Users", icon: Users, component: UsersComponent }] : []),
  ]

  const MainComponent = sidebarItems.find((item) => item.name.toLowerCase() === activeItem)?.component || DashboardHome

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Podcast Dashboard</h1>
        </div>
        <nav className="mt-6">
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

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">{activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}</h2>
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="ml-4 flex items-center">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="sm" className="ml-2">
                  <span className="mr-2">John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

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
