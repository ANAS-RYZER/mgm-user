"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import AnimatedPage from "@/components/AnimatedPage";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { scaleInVariants } from "@/lib/animations";
import { auth } from "@/lib/httpClient";
import { useResendOtp } from "@/modules/otp/hooks/resendOtp";
import { useVerifyOtp } from "@/modules/otp/hooks/verifyOtp";
import { setSessionItem } from "@/lib/sessionStorage";

const RESEND_COOLDOWN = 60;

function OtpVerificationContent() {
  const router = useRouter();
  const { toast } = useToast();
  const email = auth.getEmail();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);

  const { mutate: resendOtp, isPending: isResending } = useResendOtp();
  const { mutate: verifyOtp, isPending } = useVerifyOtp();

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleResendOtp = () => {
    resendOtp(undefined, {
      onSuccess: () => {
        setTimeLeft(RESEND_COOLDOWN);
        setCanResend(false);
        setOtp(Array(6).fill(""));
        inputsRef.current[0]?.focus();
        toast({
          title: "Code sent",
          description: "A new verification code has been sent to your email.",
        });
      },
      onError: (err: unknown) => {
        const msg =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? "Failed to resend code.";
        toast({
          title: "Resend failed",
          description: msg,
          variant: "destructive",
        });
      },
    });
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    const digits = pastedData.split("");
    const newOtp = [
      ...digits,
      ...Array(6 - digits.length).fill(""),
    ] as string[];
    setOtp(newOtp);
    const focusIndex = Math.min(digits.length, 6) - 1;
    setTimeout(() => inputsRef.current[focusIndex]?.focus(), 0);
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    verifyOtp(
      { otp: enteredOtp },
      {
        onSuccess: (res) => {
          toast({
            title: "Verified",
            description: "You have been signed in successfully.",
          });
          setSessionItem("sessionId", res?.sessionId || ""); // Store new sessionId if provided

          router.push("/");
        },
        onError: (err: unknown) => {
          const msg =
            (err as { response?: { data?: { message?: string } } })?.response
              ?.data?.message ?? "Invalid or expired code.";
          toast({
            title: "Verification failed",
            description: msg,
            variant: "destructive",
          });
        },
      },
    );
  };

  const isOtpIncomplete = otp.some((d) => d === "");

  return (
    <AnimatedPage
      className="min-h-screen flex"
      isLoading={isPending || isResending}
    >
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-mgm text-primary-foreground relative">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => router.push("/")}
          aria-label="Go back"
          className="absolute left-6 top-6 z-20 h-10 w-10 rounded-full bg-background/20 text-primary-foreground hover:bg-background/30 hover:text-primary-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <motion.div
          variants={scaleInVariants}
          initial="initial"
          animate="animate"
          className="w-full max-w-md"
        >
          <div className="flex justify-center mb-8 w-[78%]">
            <Link href="/">
              <Image
                src="/mgm-white-gold.svg"
                alt="MGM Mega Gold Mart Logo"
                width={120}
                height={64}
                priority
              />
            </Link>
          </div>

          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">OTP Verification</h1>
            <p className="opacity-80">
              Enter the 6-digit code sent to your registered email {email}
            </p>
          </div>

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

          <Button
            type="button"
            onClick={handleVerify}
            disabled={isOtpIncomplete}
            className="w-[78%] py-3 rounded-lg bg-gold hover:bg-gold/90 font-semibold text-primary"
          >
            Verify
          </Button>

          <div className="mt-8 flex flex-col items-center w-[78%] gap-2">
            <p className="text-primary-foreground/80">
              Didn&apos;t receive the code?
            </p>
            {!canResend ? (
              <p className="text-primary-foreground/80">
                Resend OTP in <span className="font-semibold">{timeLeft}s</span>
              </p>
            ) : (
              <Button
                type="button"
                variant="link"
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-primary-foreground hover:underline font-medium h-auto p-0"
              >
                {isResending ? "Sending…" : "Resend OTP"}
              </Button>
            )}
          </div>
        </motion.div>
      </div>

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
        <AnimatedPage className="min-h-screen flex items-center justify-center"></AnimatedPage>
      }
    >
      <OtpVerificationContent />
    </Suspense>
  );
}
