import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import '../App.css'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  Home, 
  BarChart2, 
  Users, 
  Settings, 
  HelpCircle,
  DollarSign,
  TrendingUp,
  ShoppingCart
} from 'lucide-react'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
console.log(sidebarOpen);

  return (
    <div className=" h-screen bg-gray-100 w-full">
      <div>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <Button variant="ghost" onClick={toggleSidebar} className="mr-4 md:hidden">
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <img
                  className="h-8 w-8 rounded-full"
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                />
              </Button>
            </div>
          </div>
        </header>
      </div>
      <div className="flex h-screen w-full relative space-x-4">
        <aside className={`bg-gray-800 absolute text-white w-64 space-y-6 py-7 px-2  inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}  md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <nav>
          <Button variant="ghost" className="flex items-center space-x-2 w-full justify-start" asChild>
            <a href="#" className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2 w-full justify-start" asChild>
            <a href="#" className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
              <BarChart2 className="h-5 w-5" />
              <span>Analytics</span>
            </a>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2 w-full justify-start" asChild>
            <a href="#" className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
              <Users className="h-5 w-5" />
              <span>Team</span>
            </a>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2 w-full justify-start" asChild>
            <a href="#" className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2 w-full justify-start" asChild>
            <a href="#" className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
              <HelpCircle className="h-5 w-5" />
              <span>Help</span>
            </a>
          </Button>
        </nav>
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 w-full">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Overview</h3>
            
            <div className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white shadow-md m-4" >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">+19% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">+201 since last hour</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <h3 className="mt-8 text-gray-700 text-2xl font-medium">Recent Activity</h3>
            
            <div className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`/placeholder.svg?height=40&width=40&text=User${item}`}
                          alt={`User ${item}`}
                        />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">User {item}</p>
                          <p className="text-sm text-gray-500">user{item}@example.com</p>
                        </div>
                        <div className="ml-auto font-medium">+$59.00</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
    </div>
    </div>
  )
}    
