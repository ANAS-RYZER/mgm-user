"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import AnimatedPage from "@/components/AnimatedPage";
import { scaleInVariants } from "@/lib/animations";
import { useSearchParams } from "next/navigation";
import { useVerifyOtp } from "@/hooks/Login-flow/useLogin";

function OtpVerificationContent() {
  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  /* -------------------- Autofocus first input -------------------- */
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  /* -------------------- Handle input change -------------------- */
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  /* -------------------- Handle backspace -------------------- */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  /* -------------------- Handle paste OTP -------------------- */
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp(newOtp);

    newOtp.forEach((_, i) => {
      inputsRef.current[i]?.focus();
    });
  };

    const { mutate: verifyOtp, isPending } = useVerifyOtp();

 const handleVerify = () => {
  const enteredOtp = otp.join("");

  if (!sessionId) {
    console.error("Missing sessionId");
    return;
  }

  verifyOtp(
    {
      otp: enteredOtp,
      sessionId, 
    },
    {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error: any) => {
        console.error(error);
        // show toast here
      },
    }
  );
};


  const isOtpIncomplete = otp.some((digit) => digit === "");

  return (
    <AnimatedPage className="min-h-screen flex">
      {/* -------------------- Left Section -------------------- */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-mgm text-primary-foreground relative">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.push("/")}
          aria-label="Go back"
          className="absolute left-6 top-6 z-20 inline-flex items-center justify-center h-10 w-10 rounded-full bg-background/20 shadow-md hover:bg-background/30"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <motion.div
          variants={scaleInVariants}
          initial="initial"
          animate="animate"
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8 w-[78%]">
            <Link href="/">
              <Image
                src="/images/footer-logo.png"
                alt="MGM Mega Gold Mart Logo"
                width={180}
                height={64}
                priority
              />
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">OTP Verification</h1>
            <p className="opacity-80">
              Enter the 6-digit code sent to your registered email
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="flex gap-3 mb-12">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center text-xl font-semibold rounded-md
                           bg-white/10 border border-white/20
                           focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isOtpIncomplete}
            className="w-[78%] py-3 rounded-lg bg-white/20 hover:bg-white/30 transition font-semibold
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify
          </button>

          {/* Resend */}
          <div className="mt-4 flex flex-col items-center w-[78%]">
            <p className="mt-8 text-primary-foreground/80">
              Didn&apos;t receive the code?
            </p>
            <button
              type="button"
              className="text-primary-foreground hover:underline font-medium"
            >
              Resend
            </button>
          </div>
        </motion.div>
      </div>

      {/* -------------------- Right Image Section -------------------- */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/images/signin.jpg"
          alt="Elegant jewelry showcase"
          fill
          className="object-cover"
          priority
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
            <h2 className="text-4xl font-bold mb-4">Timeless Elegance</h2>
            <p className="text-lg opacity-90">
              Discover our exquisite collection of handcrafted jewelry, where
              every piece tells a story of tradition and artistry.
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default function OtpVerification() {
  return (
    <Suspense
      fallback={
        <AnimatedPage className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </AnimatedPage>
      }
    >
      <OtpVerificationContent />
    </Suspense>
  );
}
