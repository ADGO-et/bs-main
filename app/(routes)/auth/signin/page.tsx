/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import logo from "@/public/logo/logo.png";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const capitalizeFirstLetterEmail = (email: string): string => {
    const s = String(email ?? "").trim();
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await loginUser({
        email: capitalizeFirstLetterEmail(email),
        password,
      }).unwrap();

      if (result.status === "success" && result.data.accessToken) {
        dispatch(setCredentials({ accessToken: result.data.accessToken }));
        router.push("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 mb-8 hover:text-black transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-gray-500">Sign in to your account to continue</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me for 30 days
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block w-1/2 bg-blue-50 relative">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md">
            <Image
              src={logo}
              alt="Sigma Funding Solutions"
              width={160}
              height={160}
              className="mx-auto mb-8"
            />
            <h2 className="text-2xl font-bold text-center mb-4">
              BoleStarter Funding Solutions
            </h2>
            <p className="text-center text-gray-600">
              Find the top funding solutions available for individuals, family
              or business. Join our platform to discover opportunities and
              connect with investors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
