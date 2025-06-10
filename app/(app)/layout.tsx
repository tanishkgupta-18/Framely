"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

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

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-100">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="navbar shadow-sm bg-base-100 z-50">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="sidebar-drawer"
              className="btn btn-square btn-ghost"
            >
              <MenuIcon />
            </label>
          </div>
          <div className="flex-1">
            <div
              onClick={handleLogoClick}
              className="btn btn-ghost text-xl font-semibold cursor-pointer"
            >
              Cloudinary Showcase
            </div>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.imageUrl}
                    alt={user.username || user.fullName || "User Avatar"}
                  />
                </div>
              </div>
              <span className="text-sm max-w-[120px] truncate hidden sm:inline">
                {user.username || user.emailAddresses[0]?.emailAddress}
              </span>
              <button
                onClick={() => signOut()}
                className="btn btn-ghost btn-circle tooltip"
                data-tip="Sign Out"
              >
                <LogOutIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay" />
        <aside className="bg-base-200 w-64 min-h-full flex flex-col shadow-md">
          <div className="flex items-center justify-center py-5 border-b">
            <ImageIcon className="w-10 h-10 text-primary" />
          </div>
          <ul className="menu p-4 gap-1 flex-grow">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          {user && (
            <div className="p-4 border-t">
              <button
                onClick={() => signOut()}
                className="btn btn-error w-full"
              >
                <LogOutIcon className="mr-2 h-5 w-5" />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
