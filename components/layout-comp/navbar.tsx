"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { logout } from "@/redux/authSlice";
import { useLogoutMutation } from "@/redux/api/authApi";
import logo from "@/public/logo/logo.svg";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if the API call fails, we still want to clear local state
      dispatch(logout());
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md pt-2 " : "bg-transparent pt-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between ">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Sigma Logo"
            width={80}
            height={80}
            className="transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto ">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Funding title"
              className="pl-10 py-3 rounded-md w-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Amharic</DropdownMenuItem>
              <DropdownMenuItem>French</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{user?.username || user?.email?.split("@")[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/change-password">Change Password</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="destructive"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>

              <Button
                asChild
                className="bg-purple-50 text-black hover:bg-purple-100"
              >
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}

          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      <nav className="hidden md:flex items-center space-x-8 py-4 justify-center border-b-2 border-gray-200 ">
        <Link
          href="/startup"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Start Up
        </Link>
        <Link
          href="/hiwot"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Hiwot Fund
        </Link>
        <Link
          href="/job"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Job Applicant
        </Link>
        {/* <Link
            href="/feedback"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Feedback
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About us
          </Link> */}
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/startup"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Up
            </Link>
            <Link
              href="/hiwot"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Hiwot Fund
            </Link>
            <Link
              href="/job"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Job Applicant
            </Link>
            {/* <Link
              href="/feedback"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Feedback
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About us
            </Link> */}
            <div className="pt-2 border-t space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-2 py-1">
                    <User className="h-4 w-4" />
                    <span className="font-medium">
                      {user?.username || user?.email?.split("@")[0]}
                    </span>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/profile">Profile</Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/auth/change-password">Change Password</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full flex items-center gap-2"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-purple-50 text-black hover:bg-purple-100"
                  >
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  Contact Us
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
