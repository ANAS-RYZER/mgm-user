"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import PriceTicker from "./PriceTicker";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    // Sync across tabs (optional but good)
    const handleStorageChange = () => {
      const token = sessionStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/catalogue" },
    { name: "Our Story", href: "/story" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-mgm text-primary-foreground backdrop-blur-md">
      {/* Live Price Ticker */}
      <PriceTicker />

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
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/footer-logo.png"
              alt="MGM Mega Gold Mart"
              width={200}
              height={80}
              priority
              className="h-auto w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-body tracking-wide"
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
        <Link
          href="/dashboard"
          aria-label="User profile"
          className="p-2 text-primary-foreground/90 hover:text-primary-foreground"
        >
          <User className="w-5 h-5" />
        </Link>
      ) : (
        <Link
          href="/signin"
          aria-label="Sign in"
          className="p-2 text-primary-foreground/90 hover:text-primary-foreground"
        >
          Login
        </Link>
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
