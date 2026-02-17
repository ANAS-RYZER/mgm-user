"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import PriceTicker from "./PriceTicker";
import { useRouter } from "next/navigation";
import useGetMe from "@/hooks/useGetMe";
import { getSessionItem, setSessionItem } from "@/lib/sessionStorage";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: me, isFetching } = useGetMe(isLoggedIn);

  useEffect(() => {
    const token = getSessionItem("accessToken");
    setIsLoggedIn(!!token);

    setIsLoggedIn(!!token);

    // Sync across tabs (optional but good)
    const handleStorageChange = () => {
      const token = getSessionItem("accessToken");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (isLoggedIn && !isFetching && me) {
      setSessionItem("no", me?.refId);
    }
    // Token exists but fetching is done and no user data, so likely invalid token
  }, [isLoggedIn, isFetching, me]);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/catalogue" },
    { name: "Our Story", href: "/story" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-mgm text-primary-foreground backdrop-blur-md">
      {/* Live Price Ticker */}
      {/* <PriceTicker /> */}

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 p-2">
            <div className="relative h-16 w-16">
              <Image
                src="/images/mgm.svg"
                alt="MGM Mega Gold Mart"
                className="absolute object-contain"
                fill
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors  tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen((p) => !p)}
              className="p-2 text-primary-foreground/90 hover:text-primary-foreground"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {isLoggedIn ? (
              <button
                onClick={() => router.push("/dashboard")}
                aria-label="User profile"
                className=" p-2 text-primary-foreground/90 hover:text-primary-foreground  bg-white/10 hover:border-1 border-gray-300/10 rounded"
              >
                <User className="w-5 h-5" />
              </button>
            ) : (
              <Button
                aria-label="Sign in"
                onClick={() => router.push("/signin")}
                className="py-2 px-4 text-primary-foreground/90 hover:text-primary-foreground hover:border border-black/20 bg-white/10"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="lg:hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-3 text-foreground/80 hover:text-primary border-b border-border/50 last:border-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 mt-2"
              >
                <Button variant="outline" className="w-full">
                  My Dashboard
                </Button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-cream border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="relative max-w-2xl mx-auto">
                <Input
                  autoFocus
                  placeholder="Search jewelry, collections, categories..."
                  className="pl-12 h-12"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
