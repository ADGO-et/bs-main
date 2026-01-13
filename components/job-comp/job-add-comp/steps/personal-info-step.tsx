"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/job-comp/job-add-comp/file-upload"
import type { FormData } from "@/components/job-comp/job-add-comp/job-application-form"
import { User, Mail, Phone, MapPin, Briefcase, Video, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PersonalInfoStepProps {
  data: FormData
  updateData: (data: Partial<FormData>) => void
}

const categories = [
  "Technology",
  "Medical",
  "Business and Finance",
  "Marketing and Communications",
  "Engineering",
  "Education and Training",
  "Creative and Media",
  "Hospitality and Tourism",
  "Trades and Skilled Labor",
  "Retail and Customer Service",
  "Legal and Compliance",
  "Science and Research",
  "Logistics and Transportation",
  "Public Sector and Nonprofit",
  "Agriculture and Environmental",
]

const ethiopianCities = [
  "Addis Ababa",
  "Dire Dawa",
  "Mekelle",
  "Gondar",
  "Adama",
  "Hawassa",
  "Bahir Dar",
  "Jimma",
  "Jijiga",
  "Shashemene",
  "Dessie",
  "Harar",
  "Arba Minch",
  "Hosaena",
  "Nekemte",
  "Weldiya",
  "Asella",
  "Dilla",
]

export function PersonalInfoStep({ data, updateData }: PersonalInfoStepProps) {
  const handleInputChange = (field: keyof FormData, value: string) => {
    updateData({ [field]: value })
  }

  const removeProfilePic = () => {
    updateData({ profilePic: "" })
  }

  const profilePicFiles = data.profilePic
    ? [
        {
          url: data.profilePic,
          name: "Profile Picture",
          type: "image/jpeg",
        },
      ]
    : []

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            First Name *
          </Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Last Name *
          </Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profession" className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Profession *
        </Label>
        <Input
          id="profession"
          value={data.profession}
          onChange={(e) => handleInputChange("profession", e.target.value)}
          placeholder="e.g., Software Engineer, Marketing Manager"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Category *
        </Label>
        <Select value={data.category} onValueChange={(value) => handleInputChange("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your field" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="period" className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Employment Type *
        </Label>
        <Select
          value={data.period}
          onValueChange={(value: "fulltime" | "parttime") => handleInputChange("period", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select employment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fulltime">Full Time</SelectItem>
            <SelectItem value="parttime">Part Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location (City) *
          </Label>
          <Select value={data.location} onValueChange={(value) => handleInputChange("location", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {ethiopianCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Address (Full) *
          </Label>
            <Input
              id="address"
              value={data.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Street, kebele, house number"
              required
            />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="isAvailable" className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Availability *
        </Label>
        <Select
          value={data.isAvailable ? "true" : "false"}
          onValueChange={(value) => updateData({ isAvailable: value === "true" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Available</SelectItem>
            <SelectItem value="false">Not Available</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Skills Description *
        </Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Describe your key skills and expertise..."
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Profile Picture (Optional)
        </Label>
        <FileUpload
          onUpload={(url) => handleInputChange("profilePic", url)}
          accept="image/*"
          placeholder="Upload your profile picture"
          uploadedFiles={profilePicFiles}
          onRemove={removeProfilePic}
          showPreview={true}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="videoLink" className="flex items-center gap-2">
          <Video className="w-4 h-4" />
          Video Introduction Link (Optional)
        </Label>
        <Input
          id="videoLink"
          type="url"
          value={data.videoLink}
          onChange={(e) => handleInputChange("videoLink", e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>
    </div>
  )
}
