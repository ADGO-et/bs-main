"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CldUploadButton } from "next-cloudinary";
import { useCreateHiwotMutation } from "@/redux/api/hiwotApi";
import type { RootState } from "@/redux/store";

export default function HiwotCreatePage() {
  const { toast } = useToast();
  const router = useRouter();
  const authUser = useSelector((s: RootState) => s.auth.user);
  const creatorId = authUser?.id || authUser?._id;

  const [step, setStep] = useState(0);
  const [showTerms, setShowTerms] = useState(false);

  const [createHiwot, { isLoading }] = useCreateHiwotMutation();

  // STEP 1: Personal
  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    countryOfResidence: "",
  });

  // STEP 2: Project
  const [project, setProject] = useState({
    description: "",
    fundingGoal: "",
    campaignDuration: 30,
    videoLink: "",
    howLong: 30,
  });

  // STEP 3: Uploads
  const [uploads, setUploads] = useState({
    identification: "",
    medicalCertificate: "",
  });

  // STEP 4: Banking
  const [bank, setBank] = useState({
    bankName: "",
    bankAccountHolderName: "",
    bankAccountNumber: "",
    swiftCode: "",
  });

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    'Eswatini (fmr. "Swaziland")',
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPersonal((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleProjectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setProject((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBank((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorId) {
      toast({
        title: "Not authenticated",
        description: "Login required.",
        variant: "destructive",
      });
      return;
    }
    try {
      await createHiwot({
        creatorId,
        firstName: personal.firstName.trim(),
        lastName: personal.lastName.trim(),
        email: personal.email.trim(),
        phoneNumber: personal.phoneNumber.trim(),
        countryOfResidence: personal.countryOfResidence,
        description: project.description.trim(),
        fundingGoal: Number(project.fundingGoal),
        campaignDuration: Number(project.campaignDuration),
        videoLink: project.videoLink.trim(),
        howLong: Number(project.howLong),
        bankName: bank.bankName,
        bankAccountHolderName: bank.bankAccountHolderName,
        bankAccountNumber: Number(bank.bankAccountNumber),
        swiftCode: bank.swiftCode,
        identification: uploads.identification,
        medicalCertificate: uploads.medicalCertificate,
        status: "pending",
      }).unwrap();
      toast({
        title: "Submitted",
        description: "Hiwot fund request submitted.",
      });
      router.push("/hiwot/overview");
    } catch (err: any) {
      toast({
        title: "Failed",
        description: err?.data?.message || "Submission failed",
        variant: "destructive",
      });
    }
  };

  const stepValid = () => {
    if (step === 0)
      return (
        personal.firstName &&
        personal.lastName &&
        personal.email &&
        personal.phoneNumber &&
        personal.countryOfResidence
      );
    if (step === 1)
      return (
        project.description &&
        project.fundingGoal &&
        Number(project.fundingGoal) > 0 &&
        project.videoLink &&
        project.campaignDuration &&
        Number(project.campaignDuration) >= 1 &&
        Number(project.campaignDuration) <= 90
      );
    if (step === 2) return uploads.identification && uploads.medicalCertificate;
    if (step === 3)
      return (
        bank.bankName &&
        bank.bankAccountHolderName &&
        bank.bankAccountNumber &&
        Number(bank.bankAccountNumber) > 0
      );
    return false;
  };

  const stepsLabels = ["Personal", "Project", "Documents", "Banking", "Review"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header & Progress */}
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-700">
            Create Hiwot Fund
          </h1>
          <div className="flex items-center gap-2 text-sm">
            {stepsLabels.map((lbl, i) => (
              <div key={lbl} className="flex items-center">
                <div
                  className={`w-7 h-7 rounded-full text-xs flex items-center justify-center ${
                    i === step
                      ? "bg-blue-600 text-white"
                      : i < step
                      ? "bg-blue-200 text-blue-800"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i + 1}
                </div>
                {i < stepsLabels.length - 1 && (
                  <div className="w-8 h-px bg-gray-300 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white rounded-2xl shadow p-8 space-y-10 border border-gray-100"
        >
          {/* Step Content */}
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-semibold mb-6 text-blue-700">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>First Name*</Label>
                  <Input
                    name="firstName"
                    value={personal.firstName}
                    onChange={handlePersonalChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name*</Label>
                  <Input
                    name="lastName"
                    value={personal.lastName}
                    onChange={handlePersonalChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email*</Label>
                  <Input
                    type="email"
                    name="email"
                    value={personal.email}
                    onChange={handlePersonalChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number*</Label>
                  <Input
                    name="phoneNumber"
                    value={personal.phoneNumber}
                    onChange={handlePersonalChange}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Country*</Label>
                  <Select
                    value={personal.countryOfResidence}
                    onValueChange={(v) =>
                      setPersonal((p) => ({ ...p, countryOfResidence: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-semibold mb-6 text-blue-700">
                Project Information
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Description / Story*</Label>
                  <Textarea
                    name="description"
                    rows={5}
                    value={project.description}
                    onChange={handleProjectChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Funding Goal (ETB)*</Label>
                    <Input
                      type="number"
                      name="fundingGoal"
                      value={project.fundingGoal}
                      onChange={handleProjectChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Campaign Duration (days)*</Label>
                    <Input
                      type="number"
                      name="campaignDuration"
                      min={1}
                      max={90}
                      value={project.campaignDuration}
                      onChange={handleProjectChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>How Long (days)*</Label>
                    <Input
                      type="number"
                      name="howLong"
                      min={1}
                      max={90}
                      value={project.howLong}
                      onChange={handleProjectChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Video Pitch Link*</Label>
                  <Input
                    type="url"
                    name="videoLink"
                    placeholder="https://..."
                    value={project.videoLink}
                    onChange={handleProjectChange}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    YouTube / Vimeo / Drive share link (max 3 min).
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-semibold mb-6 text-blue-700">
                Required Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label>Identification (PDF/Image)*</Label>
                  <CldUploadButton
                    uploadPreset="ml_default"
                    onSuccess={(result: any) => {
                      if (result?.info?.secure_url) {
                        setUploads((u) => ({
                          ...u,
                          identification: result.info.secure_url,
                        }));
                        toast({ title: "Uploaded identification" });
                      }
                    }}
                    onError={() =>
                      toast({
                        title: "Upload failed",
                        variant: "destructive",
                      })
                    }
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100"
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-xs text-gray-600">
                        Click or drag to upload
                      </p>
                    </div>
                  </CldUploadButton>
                  {uploads.identification && (
                    <p className="text-xs text-green-600">
                      Identification attached
                    </p>
                  )}
                </div>
                <div className="space-y-3">
                  <Label>Medical Certificate (PDF/Image)*</Label>
                  <CldUploadButton
                    uploadPreset="ml_default"
                    onSuccess={(result: any) => {
                      if (result?.info?.secure_url) {
                        setUploads((u) => ({
                          ...u,
                          medicalCertificate: result.info.secure_url,
                        }));
                        toast({ title: "Uploaded medical certificate" });
                      }
                    }}
                    onError={() =>
                      toast({
                        title: "Upload failed",
                        variant: "destructive",
                      })
                    }
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100"
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-xs text-gray-600">
                        Click or drag to upload
                      </p>
                    </div>
                  </CldUploadButton>
                  {uploads.medicalCertificate && (
                    <p className="text-xs text-green-600">
                      Medical certificate attached
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-semibold mb-6 text-blue-700">
                Banking Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Bank Name*</Label>
                  <Input
                    name="bankName"
                    value={bank.bankName}
                    onChange={handleBankChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Account Holder Name*</Label>
                  <Input
                    name="bankAccountHolderName"
                    value={bank.bankAccountHolderName}
                    onChange={handleBankChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Account Number*</Label>
                  <Input
                    name="bankAccountNumber"
                    value={bank.bankAccountNumber}
                    onChange={handleBankChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>SWIFT / IBAN (optional)</Label>
                  <Input
                    name="swiftCode"
                    value={bank.swiftCode}
                    onChange={handleBankChange}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-semibold mb-6 text-blue-700">
                Review & Submit
              </h2>
              <div className="space-y-4 text-sm">
                <p>
                  <strong>Name:</strong> {personal.firstName}{" "}
                  {personal.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {personal.email}
                </p>
                <p>
                  <strong>Goal:</strong> {project.fundingGoal} ETB
                </p>
                <p>
                  <strong>Duration:</strong> {project.campaignDuration} days
                </p>
                <p>
                  <strong>Video:</strong> {project.videoLink}
                </p>
                <p>
                  <strong>Identification:</strong>{" "}
                  {uploads.identification ? "Attached" : "Missing"}
                </p>
                <p>
                  <strong>Medical Certificate:</strong>{" "}
                  {uploads.medicalCertificate ? "Attached" : "Missing"}
                </p>
                <p>
                  <strong>Bank:</strong> {bank.bankName} •{" "}
                  {bank.bankAccountHolderName}
                </p>
              </div>
              <div className="flex items-start space-x-3 mt-6">
                <Checkbox
                  id="terms"
                  checked={showTerms}
                  onCheckedChange={(v) => setShowTerms(Boolean(v))}
                  required
                />
                <Label htmlFor="terms">
                  I confirm all information is accurate and I agree to the
                  platform terms.
                </Label>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={step === 0 || isLoading}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>

            {step < 4 && (
              <Button
                type="button"
                disabled={!stepValid()}
                onClick={() => setStep((s) => s + 1)}
                className="gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            )}

            {step === 4 && (
              <Button type="submit" disabled={isLoading || !showTerms}>
                {isLoading ? "Submitting..." : "Submit Hiwot Fund"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
