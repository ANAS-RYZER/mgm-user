import Link from "next/link";
import { Search, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import PriceTicker from "./PriceTicker";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/catalogue" },  
    { name: "Our Story", href: "/story" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-mgm text-primary-foreground backdrop-blur-md">
      {/* Live Price Ticker Banner */}
      <PriceTicker />

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <motion.div>
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/footer-logo.png"
                alt="MGM MEGA GOLD MART Logo"
                className="h-52 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-300 font-body tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors"
              aria-label="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/dashboard" className="p-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors" aria-label="Dashboard">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            {...({
              initial: { x: "100%" },
              animate: { x: 0, transition: { type: "spring" as const, damping: 30, stiffness: 300 } },
              exit: { x: "100%" },
            } as any)}
            className="lg:hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-3 text-foreground/80 hover:text-primary transition-colors font-body border-b border-border/50 last:border-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/dashboard"
                className="block py-3 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="outline" className="w-full">
                  My Dashboard
                </Button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Slide-out Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="bg-cream border-b border-border"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="relative max-w-2xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search for jewelry, collections, or categories..."
                  className="w-full pl-12 pr-4 h-12 bg-background border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
