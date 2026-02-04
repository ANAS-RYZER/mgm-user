"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AnimatedPage from "@/components/AnimatedPage";
import { scaleInVariants } from "@/lib/animations";
import { useLogin } from "@/modules/signin/hooks/useLogin";

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          router.push("/");
          toast({ title: "Welcome Back!", description: "Signed in successfully." });
        },
        onError: (err: unknown) => {
          const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Login failed";
          toast({ title: "Login failed", description: msg, variant: "destructive" });
        },
      }
    );
  };

  return (
    <AnimatedPage className="min-h-screen flex" isLoading={isPending}>
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-mgm text-primary-foreground relative">
        <button type="button" onClick={() => router.push("/")} aria-label="Back" className="absolute left-6 top-6 z-20 h-10 w-10 rounded-full bg-background/20 hover:bg-background/30">
          <ArrowLeft className="w-5 h-5 mx-auto" />
        </button>

        <motion.div variants={scaleInVariants} initial="initial" animate="animate" className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <Link href="/">
              <Image src="/mgm-white-gold.svg" alt="MGM" className="h-28 w-auto" width={160} height={160} priority />
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-1.5 tracking-tight">Welcome Back</h1>
          <p className="text-primary-foreground/80 text-sm mb-8">Sign in to access your account and orders</p>

          <div className="rounded-2xl border border-primary-foreground/15 shadow-xl shadow-black/20 px-6 py-8 sm:px-8 bg-[var(--auth-card-bg)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary-foreground/95 text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input h-12 pl-11 pr-4 rounded-xl border-primary-foreground/25 text-primary-foreground font-semibold placeholder:font-normal placeholder:text-primary-foreground/45 focus-visible:ring-2 focus-visible:ring-primary-foreground/30 focus-visible:border-primary-foreground/40 transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-primary-foreground/95 text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50 pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input h-12 pl-11 pr-12 rounded-xl border-primary-foreground/25 text-primary-foreground font-semibold placeholder:font-normal placeholder:text-primary-foreground/45 focus-visible:ring-2 focus-visible:ring-primary-foreground/30 focus-visible:border-primary-foreground/40 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors p-1 rounded-md hover:bg-primary-foreground/10"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-gold hover:bg-gold/90 text-primary font-semibold text-base shadow-lg mt-2 transition-all disabled:opacity-70"
                disabled={!email.trim() || !password.trim()}
              >
                 Sign In
              </Button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-primary-foreground/80">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary-foreground hover:underline underline-offset-2">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative">
        <Image src="/images/signin.jpg" alt="Jewelry" className="absolute inset-0 w-full h-full object-cover" height={100} width={300} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div variants={scaleInVariants} initial="initial" animate="animate" transition={{ delay: 0.2 }} className="text-center text-primary-foreground max-w-lg">
            <h2 className="font-display text-4xl font-bold mb-4">Timeless Elegance</h2>
            <p className="text-lg text-primary-foreground/90">Discover our exquisite collection of handcrafted jewelry.</p>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
}
