"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOut,
  Menu,
  LayoutDashboard,
  Share2,
  Upload,
  Image,
  ImageDown,
  X,
  ChevronLeft,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { 
    href: "/home", 
    icon: LayoutDashboard, 
    label: "Dashboard",
    description: "Overview and analytics"
  },
  { 
    href: "/social-share", 
    icon: Share2, 
    label: "Social Share",
    description: "Share content across platforms"
  },
  { 
    href: "/video-upload", 
    icon: Upload, 
    label: "Video Upload",
    description: "Upload and manage videos"
  },
  { 
    href: "/remove-background", 
    icon: Image, 
    label: "Remove Background",
    description: "AI-powered background removal"
  },
  { 
    href: "/generative-background", 
    icon: ImageDown, 
    label: "AI Background",
    description: "Generate custom backgrounds"
  },
];

interface SidebarContentProps {
  pathname: string;
  onNavigate?: () => void;
  isCollapsed?: boolean;
}

function SidebarContent({ pathname, onNavigate, isCollapsed = false }: SidebarContentProps) {
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-200">
      {/* Logo Section */}
     <div className="flex h-16 items-center border-b px-6">
  <div className="flex items-center gap-3">
    <img 
      src="/logo.svg" 
      alt="Framely Logo" 
      className="h-10 w-10 object-contain" 
    />
    {!isCollapsed && (
      <div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Framely
        </h1>
        <p className="text-xs text-gray-500">Creative Studio</p>
      </div>
    )}
  </div>
</div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-gray-100",
                  isActive 
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm border border-blue-200" 
                    : "text-gray-700 hover:text-gray-900"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-blue-600" : "text-gray-500"
                )} />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {item.description}
                    </div>
                  </div>
                )}
                {isActive && !isCollapsed && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                    Active
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      {user && !isCollapsed && (
        <div className="border-t p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.imageUrl} alt={user.username || "User"} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                {(user.username || user.emailAddresses[0]?.emailAddress || "U").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.username || user.fullName || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
          <Button
            onClick={() => signOut()}
            variant="outline"
            size="sm"
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => router.push("/");

  const currentPage = sidebarItems.find(item => item.href === pathname);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col">
        <SidebarContent pathname={pathname ?? ""} />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-80">
          <SidebarContent 
            pathname={pathname ?? ""} 
            onNavigate={() => setSidebarOpen(false)} 
          />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-white px-6">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogoClick}
              className="lg:hidden"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Home
            </Button>
            {currentPage && (
              <>
                <Separator orientation="vertical" className="h-6 lg:hidden" />
                <div className="flex items-center gap-2">
                  <currentPage.icon className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-900">{currentPage.label}</span>
                </div>
              </>
            )}
          </div>

          <div className="flex-1" />

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.imageUrl} alt={user.username || "User"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      {(user.username || user.emailAddresses[0]?.emailAddress || "U").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.username || user.fullName || "User"}
                    </p>
                    <p className="text-xs leading-none text-gray-500">
                      {user.emailAddresses[0]?.emailAddress}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="container mx-auto p-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}