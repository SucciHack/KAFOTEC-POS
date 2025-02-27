"use client"
import Link from "next/link"
import { ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { deleteSession1 } from "@/actions/action"
import toast from "react-hot-toast"
import Image from "next/image"

const features = [
  {
    title: "Analytics & Reporting",
    description: "Get detailed insights with customizable dashboards and reports",
    category: "Data",
  },
  {
    title: "Team Management",
    description: "Organize and manage your team members efficiently",
    category: "Collaboration",
  },
  {
    title: "Task Automation",
    description: "Automate repetitive tasks and workflows",
    category: "Productivity",
  },
  {
    title: "Custom Integrations",
    description: "Connect with your favorite tools and services",
    category: "Integration",
  },
  {
    title: "Security Controls",
    description: "Advanced security features and access controls",
    category: "Security",
  },
  {
    title: "API Access",
    description: "Full API access with comprehensive documentation",
    category: "Development",
  },
]

export function MainNav() {
  function deleteSession2(){
    deleteSession1()
    toast.success("You have logged out successfully")
  }
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/Untitled-design1.png" alt="" className="text-xl font-bold" width={150} height={30}/>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 h-auto p-0">
                  <span className="text-sm font-medium">Features</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[600px] p-6" align="start">
                <div className="grid grid-cols-2 gap-6">
                  {features.map((feature) => (
                    <DropdownMenuItem key={feature.title} className="flex flex-col space-y-1.5 p-2">
                      <div className="text-sm font-medium">{feature.title}</div>
                      <div className="text-xs text-muted-foreground">{feature.description}</div>
                      <div className="text-xs text-primary">{feature.category}</div>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>

            <Link href="/how-it-works" className="text-sm font-medium hover:text-primary">
              How it Works
            </Link>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-6">
                  <Link href="/" className="text-sm font-medium">
                    Home
                  </Link>
                  <div>
                    <h4 className="text-sm font-medium mb-4">Features</h4>
                    <div className="grid gap-4">
                      {features.map((feature) => (
                        <div key={feature.title} className="grid gap-1">
                          <div className="text-sm font-medium">{feature.title}</div>
                          <div className="text-xs text-muted-foreground">{feature.description}</div>
                          <div className="text-xs text-primary">{feature.category}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link href="/pricing" className="text-sm font-medium">
                    Pricing
                  </Link>
                  <Link href="/how-it-works" className="text-sm font-medium">
                    How it Works
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/finance-page" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="avatar-profile.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium">Dashboard</span>
            </Link>
            <Link href="/logIn" className="hidden md:inline text-sm font-bold">
              LogIn
            </Link>
              <button onClick={()=> deleteSession2()} className="hidden md:inline text-sm font-bold">LogOut</button>
          </div>
        </div>
      </div>
    </header>
  )
}

