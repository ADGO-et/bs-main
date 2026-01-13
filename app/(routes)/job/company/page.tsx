"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterCompanyMutation } from "@/redux/api/companyApi";
import { useToast } from "@/hooks/use-toast";

export default function RegisterCompanyPage() {
  const router = useRouter();
  const authUser = useSelector((state: any) => state.auth.user);
  const userId = authUser?._id ?? authUser?.id;
  const { toast } = useToast();

  const [companyForm, setCompanyForm] = useState({
    name: "",
    tinNo: "",
    registrationNumber: "",
    incorporationDate: "",
    businessStructure: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    street: "",
  });

  const [registerCompany, { isLoading }] = useRegisterCompanyMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const payload = {
      name: companyForm.name,
      tinNo: companyForm.tinNo ? Number(companyForm.tinNo) : undefined,
      registrationNumber: companyForm.registrationNumber,
      incorporationDate: companyForm.incorporationDate,
      businessStructure: companyForm.businessStructure,
      address: {
        ...(companyForm.street ? { street: companyForm.street } : {}),
        city: companyForm.city,
        state: companyForm.state,
        country: companyForm.country,
        ...(companyForm.postalCode
          ? { postalCode: companyForm.postalCode }
          : {}),
      },
    };

    try {
      await registerCompany(payload).unwrap();
      toast({
        title: "Company registered",
        description:
          "Your company was created successfully. Redirecting to home page till verified.",
      });
      router.push("/");
    } catch (err: any) {
      let message =
        err?.data?.error?.details?.message?.[0] ||
        err?.data?.error?.details?.error ||
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Registration failed";
      toast({
        title: "Registration failed",
        description: String(message),
        variant: "destructive",
      });
      console.error("Company registration failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Register your company</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 ">
          <div>
            <Label>Company name</Label>
            <Input
              name="name"
              value={companyForm.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>TIN No</Label>
            <Input
              name="tinNo"
              value={companyForm.tinNo}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Registration number</Label>
            <Input
              name="registrationNumber"
              value={companyForm.registrationNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Incorporation date</Label>
            <Input
              name="incorporationDate"
              type="date"
              value={companyForm.incorporationDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Business structure</Label>
            <Input
              name="businessStructure"
              value={companyForm.businessStructure}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Street (optional)</Label>
            <Input
              name="street"
              value={companyForm.street}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              name="city"
              value={companyForm.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>State</Label>
            <Input
              name="state"
              value={companyForm.state}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              name="country"
              value={companyForm.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Postal code (optional)</Label>
            <Input
              name="postalCode"
              value={companyForm.postalCode}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground bg-gray-50 p-4 rounded">
          <p className="mb-1">
            Only registered companies can post hiring requests and hire skills
            on the platform — individual users cannot hire.
          </p>
          <p className="mb-1">
            The company information you provide (name, registration, address,
            etc.) will be used by our system to verify your organisation before
            granting hiring access. Provide accurate company name and
            registration details.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </div>
  );
}
