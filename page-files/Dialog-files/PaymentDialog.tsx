"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  CreditCard,
  Banknote,
  Shield,
  Percent,
  Rocket,
  HeartPulse,
} from "lucide-react";
import { useFundStartupMutation } from "@/redux/api/startupApi";
import { useFundHiwotMutation } from "@/redux/api/hiwotApi";

interface PaymentDialogProps {
  children: React.ReactNode;
  startupId?: string;
  hiwotId?: string;
  type?: "startup" | "hiwot";
}

export function PaymentDialog({
  children,
  startupId,
  hiwotId,
  type = "startup",
}: PaymentDialogProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [serviceFee, setServiceFee] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Choose mutation based on type
  const [fundStartup, { isLoading: isProcessingStartup }] =
    useFundStartupMutation();
  const [fundHiwot, { isLoading: isProcessingHiwot }] = useFundHiwotMutation();
  const isProcessing =
    type === "hiwot" ? isProcessingHiwot : isProcessingStartup;

  const calculateFundingAmount = () => {
    const totalAmount = Number.parseFloat(amount) || 0;
    const feePercentage = Number.isNaN(Number(serviceFee))
      ? 0
      : Number(serviceFee);
    console.log("fee", feePercentage);
    const fee = (totalAmount * feePercentage) / 100;
    return totalAmount - fee;
  };

  const calculateServiceFee = () => {
    const totalAmount = Number.parseFloat(amount) || 0;
    const feePercentage = Number.isNaN(Number(serviceFee))
      ? 0
      : Number(serviceFee);
    return (totalAmount * feePercentage) / 100;
  };

  const handlePayment = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return;
    setError(null);
    setSuccess(null);
    try {
      let res: any;
      if (type === "hiwot") {
        res = await fundHiwot({
          id: hiwotId,
          fund: {
            amount: Number.parseFloat(amount),
            description: description.trim(),
            commission_rate: Number.parseFloat(serviceFee),
          },
        }).unwrap();
      } else {
        res = await fundStartup({
          id: startupId,
          fund: {
            amount: Number.parseFloat(amount),
            description: description.trim(),
            commission_rate: Number.parseFloat(serviceFee),
          },
        }).unwrap();
      }
      const paymentUrl = res?.data?.paymentUrl;
      const dataPart:
        | { tx_ref?: string; txRef?: string; paymentUrl?: string }
        | undefined = res?.data;
      const txRef = dataPart?.tx_ref || dataPart?.txRef;
      if (txRef) {
        try {
          localStorage.setItem(`${type}_payment_tx_ref`, txRef);
        } catch (err) {
          console.warn("Unable to store tx_ref in localStorage", err);
        }
      }
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        setSuccess(res?.message || "Funding initiated.");
      }
    } catch (e: unknown) {
      const err = e as {
        data?: { message?: string };
        message?: string;
        error?: string;
      };
      const apiMsg = err.data?.message || err.message || err.error;
      setError(apiMsg || "Failed to initiate payment. Please try again.");
    }
  };

  // Dynamic title/description/icon
  const dialogTitle =
    type === "hiwot" ? (
      <span className="flex items-center gap-2">
        <HeartPulse className="h-6 w-6 text-primary" />
        <span className="text-2xl font-semibold">Hiwot Fund Payment</span>
      </span>
    ) : (
      <span className="flex items-center gap-2">
        <Rocket className="h-6 w-6 text-primary" />
        <span className="text-2xl font-semibold">Startup Funding Payment</span>
      </span>
    );
  const dialogDesc =
    type === "hiwot"
      ? "Secure payment for your Hiwot fund support"
      : "Secure payment for your startup investment";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg z-[9999] bg-blue-100">
        <DialogHeader className="text-center space-y-2">
          {dialogTitle}
          <p className="text-sm text-muted-foreground text-center">
            {dialogDesc}
          </p>
        </DialogHeader>

        <Card className="border-0 shadow-none bg-card/50">
          <CardContent className="p-6 space-y-6">
            <div className="flex gap-4">
              {/* Amount Field */}
              <div className="flex-1 space-y-2">
                <Label
                  htmlFor="amount"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Banknote className="h-4 w-4 text-primary" />
                  Total Amount (ETB) *
                </Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 text-lg font-medium"
                    min="0"
                    step="0.01"
                  />
                  <Banknote className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Service Fee Dropdown */}
              <div className="flex-1 space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4 text-primary" />
                  Service Fee
                </Label>
                <Select value={serviceFee} onValueChange={setServiceFee}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-[10000]">
                    {Array.from({ length: 46 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i === 0 ? "None" : `${i}%`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Fee: {calculateServiceFee().toFixed(2)} ETB
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                {type === "hiwot"
                  ? "Support Description (Optional)"
                  : "Investment Description (Optional)"}
              </Label>
              <Textarea
                id="description"
                placeholder={
                  type === "hiwot"
                    ? "Describe your support for this Hiwot fund..."
                    : "Describe your startup funding purpose..."
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>

            {/* Payment Summary */}
            {amount && (
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Payment:</span>
                  <span>{Number.parseFloat(amount).toFixed(2)} ETB</span>
                </div>
                <div className="flex justify-between text-sm text-red-600">
                  <span>Bole Starter Fee ({serviceFee}%):</span>
                  <span>-{calculateServiceFee().toFixed(2)} ETB</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-green-600">
                  <span>
                    {type === "hiwot"
                      ? "Hiwot Fund Amount:"
                      : "Startup Funding Amount:"}
                  </span>
                  <span>{calculateFundingAmount().toFixed(2)} ETB</span>
                </div>
              </div>
            )}

            {/* Feedback Messages */}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                {error}
              </div>
            )}
            {success && (
              <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded p-2">
                {success}
              </div>
            )}

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={
                !amount || Number.parseFloat(amount) <= 0 || isProcessing
              }
              className="w-full h-12 text-base font-semibold"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                  Processing Payment...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Pay {Number.parseFloat(amount || "0").toFixed(2)} ETB
                </div>
              )}
            </Button>

            {/* Security Notice */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>
                Your investment is secured with 256-bit SSL encryption
              </span>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
