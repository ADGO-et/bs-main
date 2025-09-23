"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useMemo } from "react";
import { useVerifyPaymentQuery } from "@/redux/api/startupApi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CheckmarkProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

interface SuccessProps {
  username?: string;
  majorText?: string;
  innerText?: string;
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: i * 0.2,
        type: "spring",
        duration: 1.5,
        bounce: 0.2,
        ease: "easeInOut",
      },
      opacity: { delay: i * 0.2, duration: 0.2 },
    },
  }),
};

export function Checkmark({
  size = 100,
  strokeWidth = 2,
  color = "currentColor",
  className = "",
}: CheckmarkProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
      className={className}
    >
      <title>Animated Checkmark</title>
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        stroke={color}
        variants={draw}
        custom={0}
        style={{
          strokeWidth,
          strokeLinecap: "round",
          fill: "transparent",
        }}
      />
      <motion.path
        d="M30 50L45 65L70 35"
        stroke={color}
        variants={draw}
        custom={1}
        style={{
          strokeWidth,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "transparent",
        }}
      />
    </motion.svg>
  );
}

export default function PaymentStat({ majorText, innerText }: SuccessProps) {
  const [txRef, setTxRef] = useState<string>("");
  const router = useRouter();

  // Load the last stored tx_ref from localStorage (set in PaymentDialog)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("startup_payment_tx_ref");
      if (stored) {
        setTxRef(stored);
      } else {
        // Set a demo transaction reference for testing
        const demoTxRef = "tx_demo_success_123456";
        setTxRef(demoTxRef);
        localStorage.setItem("startup_payment_tx_ref", demoTxRef);
      }
    } catch {
      // Fallback for demo
      setTxRef("tx_demo_success_123456");
    }
  }, []);

  // Invoke verification only when txRef is available
  interface VerifyApiSuccess {
    message?: string;
    status?: string;
    data?: PaymentData;
  }
  interface VerifyApiError {
    data?: { message?: string };
    error?: string;
    status?: number;
  }
  const {
    data: verifyResult,
    isLoading: verifying,
    isError: verifyError,
    error,
  } = useVerifyPaymentQuery(txRef, { skip: !txRef }) as {
    data?: VerifyApiSuccess;
    isLoading: boolean;
    isError: boolean;
    error?: VerifyApiError;
  };

  // Extract fields safely
  type PaymentData = {
    id?: string;
    tx_ref?: string;
    status?: string;
    amount?: string;
    currency?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    created_at?: string;
    updated_at?: string;
    payment_method?: string;
    description?: string;
    error?: string;
  };
  const paymentData: PaymentData | undefined = verifyResult?.data;
  const overallStatus: string | undefined =
    verifyResult?.status || paymentData?.status;

  const terminalSuccess = ["success", "successful"].includes(
    (paymentData?.status || "").toLowerCase()
  );
  const terminalFailed = ["failed", "declined"].includes(
    (paymentData?.status || "").toLowerCase()
  );

  // Derivedd heading & message
  const heading = useMemo(() => {
    if (majorText) return majorText;
    if (!txRef) return "No Transaction Reference";
    if (verifying) return "Verifying Payment...";
    if (verifyError) return "Verification Error";
    if (terminalSuccess) return "Payment Successful";
    if (terminalFailed) return "Payment Failed";
    return `Payment Status: ${
      paymentData?.status || overallStatus || "Unknown"
    }`;
  }, [
    majorText,
    txRef,
    verifying,
    verifyError,
    terminalSuccess,
    terminalFailed,
    paymentData?.status,
    overallStatus,
  ]);

  const subText = useMemo(() => {
    if (innerText) return innerText;
    if (!txRef) return "We could not find a stored transaction reference.";
    if (verifying) return "Please wait while we confirm your transaction.";
    if (verifyError) {
      const apiMsg = error?.data?.message || error?.error || "Unknown error";
      return `Unable to verify payment. ${apiMsg}`;
    }
    if (terminalSuccess) return "Your payment has been confirmed.";
    if (terminalFailed)
      return paymentData?.error
        ? `Reason: ${paymentData.error}`
        : "The payment did not complete.";
    return "Current status returned from gateway.";
  }, [
    innerText,
    txRef,
    verifying,
    verifyError,
    terminalSuccess,
    terminalFailed,
    paymentData?.error,
    error,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4 ">
      <Card className="w-full max-w-lg mx-auto shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardContent className="p-8 space-y-6 text-center">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
              scale: {
                type: "spring",
                damping: 12,
                stiffness: 150,
              },
            }}
          >
            <div className="relative">
              <motion.div
                className={`absolute inset-0 blur-2xl rounded-full ${
                  terminalSuccess
                    ? "bg-emerald-500/20 dark:bg-emerald-400/30"
                    : terminalFailed
                    ? "bg-red-500/20 dark:bg-red-400/30"
                    : "bg-blue-500/20 dark:bg-blue-400/30"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{
                  delay: 0.3,
                  duration: 1,
                  ease: "easeOut",
                }}
              />

              {terminalFailed ? (
                <motion.div
                  className="relative z-10 w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <svg
                    className="w-10 h-10 text-red-600 dark:text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.div>
              ) : (
                <Checkmark
                  size={80}
                  strokeWidth={3}
                  color={
                    terminalSuccess ? "rgb(16 185 129)" : "rgb(59 130 246)"
                  }
                  className="relative z-10"
                />
              )}
            </div>
          </motion.div>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h1
              className={`text-2xl font-bold ${
                terminalSuccess
                  ? "text-emerald-700 dark:text-emerald-300"
                  : terminalFailed
                  ? "text-red-700 dark:text-red-300"
                  : "text-slate-800 dark:text-slate-200"
              }`}
            >
              {heading}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {subText}
            </p>
          </motion.div>

          {txRef && (
            <motion.div
              className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Transaction ID: {txRef}
              </span>
            </motion.div>
          )}

          {verifying && (
            <motion.div
              className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            >
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">
                Contacting payment gateway...
              </span>
            </motion.div>
          )}

          {verifyError && !verifying && (
            <motion.div
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            >
              <p className="text-sm text-red-700 dark:text-red-300">
                Could not verify right now. You may refresh this page.
              </p>
            </motion.div>
          )}

          {paymentData && (
            <motion.div
              className="w-full mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Payment Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="font-medium text-slate-600 dark:text-slate-400">
                      Amount
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {paymentData.amount} {paymentData.currency}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="font-medium text-slate-600 dark:text-slate-400">
                      Status
                    </span>
                    <span
                      className={`font-semibold px-2 py-1 rounded-full text-xs ${
                        terminalSuccess
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : terminalFailed
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {paymentData.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="font-medium text-slate-600 dark:text-slate-400">
                      Customer
                    </span>
                    <span className="text-slate-900 dark:text-slate-100">
                      {[paymentData.first_name, paymentData.last_name]
                        .filter(Boolean)
                        .join(" ") || "—"}
                    </span>
                  </div>
                  {paymentData.email && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="font-medium text-slate-600 dark:text-slate-400">
                        Email
                      </span>
                      <span className="text-slate-900 dark:text-slate-100 text-right break-all">
                        {paymentData.email}
                      </span>
                    </div>
                  )}
                  {paymentData.error && (
                    <div className="flex justify-between items-start py-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="font-medium text-slate-600 dark:text-slate-400">
                        Error
                      </span>
                      <span className="text-red-600 dark:text-red-400 text-right">
                        {paymentData.error}
                      </span>
                    </div>
                  )}
                  {paymentData.created_at && (
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-slate-600 dark:text-slate-400">
                        Payment Date
                      </span>
                      <span className="text-slate-900 dark:text-slate-100 text-right">
                        {new Date(paymentData.created_at).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {terminalFailed && (
            <motion.div
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.4 }}
            >
              <p className="text-sm text-red-700 dark:text-red-300">
                Payment failed. You can close this page and try again.
              </p>
            </motion.div>
          )}
          <motion.div
            className="pt-2 flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <Button
              onClick={() => router.push("/transaction")}
              className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View Transaction History
            </Button>
            <Button
              onClick={() => router.push("/")}
              className="flex-1 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Back to Home
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
