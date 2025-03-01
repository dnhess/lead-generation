"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logout } from "@/app/actions";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="w-64 border-r border-gray-100">
      <div className="flex h-full flex-col">
        <div className="p-6 bg-gradient-to-b from-lime-100 via-lime-50 to-white">
          <Link href="/admin" className="relative">
            <span className="text-2xl font-bold">almā</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-gray-600 font-medium",
              pathname === "/admin/leads" && "bg-gray-50 text-gray-900"
            )}
            asChild
          >
            <Link href="/admin/leads">Leads</Link>
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-gray-600 font-medium",
              pathname === "/admin/settings" && "bg-gray-50 text-gray-900"
            )}
            asChild
          >
            <Link href="/admin/settings">Settings</Link>
          </Button>
        </nav>

        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">Admin</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
