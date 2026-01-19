"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AnimatedPage from "@/components/AnimatedPage";
import { scaleInVariants } from "@/lib/animations";
import { useLogin, useSignup } from "@/hooks/Login-flow/useLogin";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getButtonText = () => {
    if (isLoading) return "Please wait...";
    return isSignUp ? "Create Account" : "Sign In";
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const { mutate: login } = useLogin();
  const { mutate: signup } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      signup(
        { email: formData.email, password: formData.password },
        {
          onSuccess: ({ sessionId }: { sessionId: string }) => {
            toast({
              title: "Account created successfully!",
              description: "You have signed up successfully.",
            });
           router.push(`/otp?sessionId=${sessionId}`);
          },
          onError: (error: any) => {
            toast({
              title: "Signup failed",
              description:
                error.response?.data?.message ||
                "An error occurred during signup.",
              variant: "destructive",
            });
          },
        }
      );
    } else {
      login(
        {
          email: formData.email,
          password: formData.password,
        },
        {
          onSuccess: () => {
            toast({
              title: "Welcome Back!",
              description: "You have been signed in successfully.",
            });
            router.push("/");
          },
          onError: (error: any) => {
            toast({
              title: "Login failed",
              description:
                error?.response?.data?.message || "Something went wrong",
              variant: "destructive",
            });
          },
        }
      );
    }
  };

  return (
    <AnimatedPage className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-mgm text-primary-foreground relative">
        <button
          type="button"
          onClick={() => router.push("/")}
          aria-label="Go back"
          className="absolute left-6 top-6 z-20 inline-flex items-center justify-center h-10 w-10 rounded-full bg-background/20 text-primary-foreground shadow-md hover:bg-background/30"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <motion.div
          variants={scaleInVariants}
          initial="initial"
          animate="animate"
          className="w-full max-w-md"
        >
          <div className="flex justify-center mb-8">
            <Link href="/">
              <Image
                src="/images/footer-logo.png"
                alt="MGM MEGA GOLD MART Logo"
                className="h-16 w-auto"
                width={180}
                height={64}
                priority
              />
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="opacity-80">
              {isSignUp
                ? "Join MGM Jewels and discover exclusive collections"
                : "Sign in to access your account and orders"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full mt-4">
              {getButtonText()}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary-foreground/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-mgm text-primary-foreground/80">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                type="button"
                className="bg-background/10 border-primary-foreground/30 text-primary-foreground hover:bg-background/20 hover:border-primary-foreground/50"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                type="button"
                className="bg-background/10 border-primary-foreground/30 text-primary-foreground hover:bg-background/20 hover:border-primary-foreground/50"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>
          <p className="mt-8 text-center text-primary-foreground/80">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary-foreground hover:underline font-medium"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </div>

      {/* Right Side Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/images/signin.jpg"
          alt="Elegant jewelry showcase"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            variants={scaleInVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-center text-primary-foreground max-w-lg"
          >
            <h2 className="font-display text-4xl font-bold mb-4">
              Timeless Elegance
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Discover our exquisite collection of handcrafted jewelry, where
              every piece tells a story of tradition and artistry.
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
}
