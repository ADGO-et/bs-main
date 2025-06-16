"use client";

import type React from "react";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const result = await forgotPassword({ email }).unwrap();

      if (result.status === "success") {
        setSuccess("Password reset link has been sent to your email address.");
      } else {
        setError("Failed to send reset link. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.data?.message || "Failed to send reset link. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 mb-8 hover:text-black transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-gray-500 mt-2">
            Enter your email address and we will send you a link to reset your
            password
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>

          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link
              href="/auth/signin"
              className="text-purple-600 hover:underline font-medium"
            >
              Back to sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
