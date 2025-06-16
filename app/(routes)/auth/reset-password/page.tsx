"use client";

import type React from "react";
import { Suspense } from "react"; // Added import

import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter, useSearchParams } from "next/navigation";

// New component to contain the logic using useSearchParams
function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Reset token is missing");
      return;
    }

    try {
      const result = await resetPassword({
        token,
        newpassword: password,
      }).unwrap();

      if (result.status === "success") {
        setSuccess(
          "Password has been reset successfully. Redirecting to login..."
        );
        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      } else {
        setError("Failed to reset password. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.data?.message || "Failed to reset password. Please try again."
      );
    }
  };

  return (
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
          <Lock className="h-6 w-6 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-gray-500 mt-2">
          Create a new password for your account
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

      {!token && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            Invalid or missing reset token. Please request a new password reset
            link.
          </AlertDescription>
        </Alert>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={!token || isLoading}
          />
          <p className="text-xs text-gray-500">
            Must be at least 8 characters long
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={!token || isLoading}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={!token || isLoading}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>

        <div className="text-center text-sm">
          <Link href="/auth/signin" className="text-purple-600 hover:underline">
            Back to sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
