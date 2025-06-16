"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import Link from "next/link";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// import { useCreateStartupMutation } from "@/redux/api/startupApi";
import { useRouter } from "next/navigation";

export default function StartupCreatePage() {
  const { toast } = useToast();
  const router = useRouter();
  // const [createStartup, { isLoading }] = useCreateStartupMutation();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [pitchDeckFile, setPitchDeckFile] = useState<File | null>(null);
  const [currentStateFile, setCurrentStateFile] = useState<File | null>(null);

  // Handler for file input changes
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const [formData, setFormData] = useState({
    startupName: "",
    description: "",
    license: "",
    website: "",
    logo: null as File | null,
    goalFund: "",
    typeOfSupport: "funding",
    bankName: "",
    bankAccount: "",
    industry: "",
    address: {
      street: "",
      city: "",
      state: "",
    },
    donarType: "single",
    foundedAt: "",
    numberOfEmployees: "",
    videoLink: "",
    pitchDeckLink: null as File | null,
    currentState: null as File | null,
    agreeTerms: false,
  });

  // const [logoName, _] = useState("");
  // const [_, _] = useState("");
  // const [currentStateName, _] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "description") {
      setCharacterCount(value.length);
    }

    // Handle nested address fields
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.startupName ||
      !formData.description ||
      !formData.license ||
      !formData.goalFund ||
      !formData.donarType
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Prepare form data for API
      const formDataToSend = new FormData();
      formDataToSend.append("startupName", formData.startupName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("license", formData.license);
      formDataToSend.append("website", formData.website);
      // if (formData.logo) formDataToSend.append("logo", formData.logo);
      formDataToSend.append("donarType", formData.donorType);
      formDataToSend.append("goalFund", formData.goalFund);
      formDataToSend.append("typeOfSupport", formData.typeOfSupport);
      formDataToSend.append("bankName", formData.bankName);
      formDataToSend.append("bankAccount", formData.bankAccount);
      formDataToSend.append("industry", formData.industry);
      formDataToSend.append("address[street]", formData.address.street);
      formDataToSend.append("address[city]", formData.address.city);
      formDataToSend.append("address[state]", formData.address.state);
      formDataToSend.append("foundedAt", formData.foundedAt);
      formDataToSend.append("numberOfEmployees", formData.numberOfEmployees);
      formDataToSend.append("videoLink", formData.videoLink);
      if (logoFile) formDataToSend.append("logo", logoFile);
      if (pitchDeckFile) formDataToSend.append("pitchDeckLink", pitchDeckFile);
      if (currentStateFile)
        formDataToSend.append("currentState", currentStateFile);

      // Call the API
      // await createStartup(formDataToSend).unwrap();

      toast({
        title: "Startup submitted!",
        description: "Your startup has been submitted successfully.",
      });

      // Redirect to dashboard or another page
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error submitting your startup. Please try again.",
        variant: "destructive",
      });
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* <div className="absolute -left-40 top-0 opacity-10">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="200"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div> */}

      {/* <div className="absolute -right-40 bottom-0 opacity-10">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="200"
            stroke="#3B82F6"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="#3B82F6"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="#3B82F6"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div> */}

      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Create Your Startup</h1>
          <p className="text-gray-600">
            Submit your startup information to get funding and support.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold mb-6">Startup Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="startupName" className="text-sm font-medium">
                Startup Name*
              </Label>
              <Input
                id="startupName"
                name="startupName"
                value={formData.startupName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description (Maximum 500 characters)*
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                maxLength={500}
                rows={4}
                required
              />
              <div className="text-xs text-right text-gray-500">
                {characterCount}/500
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="typeOfSupport" className="text-sm font-medium">
                  Donor Type*
                </Label>
                <Select
                  value={formData.donarType}
                  onValueChange={(value) =>
                    handleSelectChange("donorTypes", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select support type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="funding">Only one donor</SelectItem>
                    <SelectItem value="mentorship">Multiple donor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-medium">
                  Website
                </Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://yourstartup.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo" className="text-sm font-medium">
                Upload Logo
              </Label>
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="logo"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 2MB)
                      </p>
                    </div>
                    <input
                      id="logo"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setLogoFile)}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goalFund" className="text-sm font-medium">
                  Goal Fund (in ETB)*
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    ETB
                  </span>
                  <Input
                    id="goalFund"
                    name="goalFund"
                    type="number"
                    value={formData.goalFund}
                    onChange={handleInputChange}
                    className="pl-12"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="typeOfSupport" className="text-sm font-medium">
                  Type of Support Needed*
                </Label>
                <Select
                  value={formData.typeOfSupport}
                  onValueChange={(value) =>
                    handleSelectChange("typeOfSupport", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select support type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="funding">Funding</SelectItem>
                    <SelectItem value="mentorship">Mentorship</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-sm font-medium">
                  Bank Name*
                </Label>
                <Select
                  value={formData.bankName}
                  onValueChange={(value) =>
                    handleSelectChange("bankName", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Commercial Bank of Ethiopia">
                      Commercial Bank of Ethiopia
                    </SelectItem>
                    <SelectItem value="Dashen Bank">Dashen Bank</SelectItem>
                    <SelectItem value="Awash Bank">Awash Bank</SelectItem>
                    <SelectItem value="Bank of Abyssinia">
                      Bank of Abyssinia
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccount" className="text-sm font-medium">
                  Bank Account Number*
                </Label>
                <Input
                  id="bankAccount"
                  name="bankAccount"
                  value={formData.bankAccount}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm font-medium">
                  Industry*
                </Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) =>
                    handleSelectChange("industry", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Non Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="foundedAt" className="text-sm font-medium">
                  Founded Date
                </Label>
                <Input
                  id="foundedAt"
                  name="foundedAt"
                  type="date"
                  value={formData.foundedAt}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="numberOfEmployees"
                className="text-sm font-medium"
              >
                Number of Employees
              </Label>
              <Input
                id="numberOfEmployees"
                name="numberOfEmployees"
                type="number"
                min="0"
                value={formData.numberOfEmployees}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.street" className="text-sm font-medium">
                  Street Address
                </Label>
                <Input
                  id="address.street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.city" className="text-sm font-medium">
                  City
                </Label>
                <Input
                  id="address.city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.state" className="text-sm font-medium">
                  State/Region
                </Label>
                <Input
                  id="address.state"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoLink" className="text-sm font-medium">
                Video Link (Pitch Video)
              </Label>
              <Input
                id="videoLink"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pitchDeckLink" className="text-sm font-medium">
                Upload Pitch Deck
              </Label>
              <input
                type="file"
                name="pitchDeck"
                onChange={(e) => handleFileChange(e, setPitchDeckFile)}
                accept=".pdf"
              />
              {pitchDeckFile && <p>Selected: {pitchDeckFile.name}</p>}
              {/* <Label htmlFor="pitchDeckLink" className="text-sm font-medium">
                Upload Pitch Deck
              </Label>
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="pitchDeckLink"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF files only (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      id="pitchDeckLink"
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, "pitchDeckLink")}
                    />
                  </label>
                </div>
                {pitchDeckName && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected file: {pitchDeckName}
                  </div>
                )}
              </div> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentState" className="text-sm font-medium">
                Upload Current State Document
              </Label>
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="currentState"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF files only (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      id="currentState"
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, setCurrentStateFile)}
                    />
                  </label>
                </div>
                {/* {currentStateName && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected file: {currentStateName}
                  </div>
                )} */}
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("agreeTerms", checked as boolean)
                }
                required
              />
              <Label
                htmlFor="agreeTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                By clicking this you are confirming that you have read,
                understand, and agree with the{" "}
                <Link href="/terms" className="text-purple-500 hover:underline">
                  Terms and Conditions
                </Link>
              </Label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white"
                // disabled={isLoading}
              >
                {/* {isLoading ? "Submitting..." : "Submit Startup"} */}
                Submit Startup
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
