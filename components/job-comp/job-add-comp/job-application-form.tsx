"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PersonalInfoStep } from "./steps/personal-info-step"
import { ExperienceStep } from "./steps/experience-step"
import { EducationStep } from "./steps/education-step"
import { SkillsStep } from "./steps/skills-step"
import { ReviewStep } from "./steps/review-step"
import { User, Briefcase, GraduationCap, Award, CheckCircle } from "lucide-react"
import { useCreateTalentMutation } from "@/redux/api/jobApi"
import type { creatingTalentPayload } from "@/types/jobApi"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import type { SerializedError } from "@reduxjs/toolkit"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

export interface FormData {
  firstName: string
  lastName: string
  profession: string
  address: string
  location: string
  email: string
  phone: string
  description: string
  profilePic?: string
  videoLink?: string
  experience: Array<{
    title: string
    company: string
    startDate?: Date
    endDate?: Date
    description: string
  currentlyWorking?: boolean
    }>
  education: Array<{
    institution: string
  startDate?: Date
  endDate?: Date
    degree: string
  }>
  skills: string[]
  period: "fulltime" | "parttime"
  category: string
  educationalFiles: string[]
  isAvailable: boolean
}

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Experience", icon: Briefcase },
  { id: 3, title: "Education", icon: GraduationCap },
  { id: 4, title: "Skills", icon: Award },
  { id: 5, title: "Review", icon: CheckCircle },
]

export function JobApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    profession: "",
    address: "",
  location: "",
    email: "",
    phone: "",
    description: "",
    profilePic: "",
    videoLink: "",
  experience: [],
  education: [],
    skills: [],
    period: "fulltime",
    category: "",
    educationalFiles: [],
  isAvailable: true,
  })
  const router = useRouter()
  const [createTalent, { isLoading }] = useCreateTalentMutation()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const buildPayload = (): creatingTalentPayload => {
    const experience = formData.experience.map((e) => {
      const obj: Record<string, unknown> = {
        title: e.title,
        company: e.company,
        description: e.description,
      }
      if (e.startDate) obj.startDate = e.startDate.toISOString().split("T")[0]
      // Only include endDate if provided and not currently working
      if (e.endDate && !e.currentlyWorking) obj.endDate = e.endDate.toISOString().split("T")[0]
      return obj
    }) as creatingTalentPayload["experience"]

    const education = formData.education.map((e) => {
      const obj: Record<string, unknown> = {
        degree: e.degree,
        institution: e.institution,
      }
      if (e.startDate) obj.startDate = e.startDate.toISOString().split("T")[0]
      if (e.endDate) obj.endDate = e.endDate.toISOString().split("T")[0]
      return obj
    }) as creatingTalentPayload["education"]

    return {
      firstName: formData.firstName,
      lastName: formData.lastName,
      profession: formData.profession,
      addressLine: formData.address,
      location: formData.location,
      category: formData.category,
      description: formData.description,
      email: formData.email,
      phone: formData.phone,
      skills: formData.skills,
      experience,
      education,
      educationalFiles: formData.educationalFiles,
      profilePic: formData.profilePic || "",
      period: formData.period === "fulltime" ? "fullTime" : "partTime",
      videoLink: formData.videoLink || "",
      isAvailable: formData.isAvailable,
    }
  }

  const extractErrorMessage = (error: unknown): string => {
    if (!error) return "Unknown error";
    // FetchBaseQueryError narrow
    const maybeFb = error as FetchBaseQueryError & { data?: unknown; error?: unknown };
    if (Object.prototype.hasOwnProperty.call(maybeFb, "status")) {
      const data = maybeFb.data;
      if (data) {
        if (typeof data === "string") return data;
        if (typeof data === "object") {
          const obj = data as Record<string, unknown>;
          if (typeof obj.message === "string") return obj.message;
          if (typeof obj.error === "string") return obj.error;
          if (Array.isArray(obj.errors)) return obj.errors.join(", ");
        }
      }
      if (maybeFb.error && typeof maybeFb.error === "string") return maybeFb.error;
    }
    const serError = error as SerializedError;
    if (serError && typeof serError.message === "string") return serError.message;
    if (typeof error === "string") return error;
    try {
      return JSON.stringify(error);
    } catch {
      return "Failed to submit application. Please try again.";
    }
  }

  const handleSubmit = async () => {
    setErrorMessage(null)
    setSuccessMessage(null)
    const payload = buildPayload()
    try {
      const res = await createTalent(payload).unwrap()
      console.log("Talent application payload:", payload)
      console.log("Server response:", res)
      setSuccessMessage("Application submitted successfully. Redirecting...")
      // Navigate after 4 seconds
      setTimeout(() => {
        router.push("/job/overview")
      }, 4000)
    } catch (err) {
      setErrorMessage(extractErrorMessage(err))
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep data={formData} updateData={updateFormData} />
      case 2:
        return <ExperienceStep data={formData} updateData={updateFormData} />
      case 3:
        return <EducationStep data={formData} updateData={updateFormData} />
      case 4:
        return <SkillsStep data={formData} updateData={updateFormData} />
      case 5:
        return <ReviewStep data={formData} />
      default:
        return null
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Job Application</h1>
        <p className="text-muted-foreground text-center mb-6">Complete all steps to submit your application</p>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step.id <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5" })}
            {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <Alert className="mb-4 border-green-500/50 bg-green-100">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Previous
            </Button>

            {currentStep === steps.length ? (
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-600/80" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Application"}
              </Button>
            ) : (
              <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-600/80" disabled={isLoading}>
                {isLoading ? "Please wait" : "Next"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
