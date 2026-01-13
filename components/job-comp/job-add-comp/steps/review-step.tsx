"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { FormData } from "@/components/job-comp/job-add-comp/job-application-form"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Building,
  School,
  Video,
  FileText,
} from "lucide-react"

interface ReviewStepProps {
  data: FormData
}

export function ReviewStep({ data }: ReviewStepProps) {
  const formatDate = (value: Date | string | undefined): string => {
    if (!value) return "";
    if (value instanceof Date) {
      if (isNaN(value.getTime())) return "";
      return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "2-digit" }).format(value);
    }
    // string: accept ISO yyyy-mm-dd else return as-is
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const d = new Date(value + "T00:00:00Z");
      if (isNaN(d.getTime())) return value;
      return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "2-digit" }).format(d);
    }
    return value;
  }
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Review Your Application</h3>
        <p className="text-muted-foreground">Please review all information before submitting your application.</p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">
                {data.firstName} {data.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Profession</p>
              <p className="font-medium">{data.profession}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-medium">{data.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Employment Type</p>
              <p className="font-medium">{data.period === "fulltime" ? "Full Time" : "Part Time"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{data.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{data.phone}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
              <span>{data.location}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
              <span>{data.address}</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Availability</p>
            <p className="font-medium">{data.isAvailable ? "Available" : "Not Available"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Skills Description</p>
            <p className="text-sm">{data.description}</p>
          </div>

          {data.videoLink && (
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-muted-foreground" />
              <a
                href={data.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Video Introduction
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Experience */}
      {data.experience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Work Experience ({data.experience.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-primary pl-4">
                <h4 className="font-semibold">{exp.title}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 flex-wrap">
                  <Building className="w-4 h-4" />
                  <span>{exp.company}</span>
                  <Calendar className="w-4 h-4 ml-2" />
                  <span>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                  </span>
                </div>
                <p className="text-sm">{exp.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Education ({data.education.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-primary pl-4">
                <h4 className="font-semibold">{edu.degree}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 flex-wrap">
                  <School className="w-4 h-4" />
                  <span>{edu.institution}</span>
                  <Calendar className="w-4 h-4 ml-2" />
                  <span>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}

            {data.educationalFiles.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Educational Documents ({data.educationalFiles.length})</span>
                </div>
                <p className="text-sm text-muted-foreground">{data.educationalFiles.length} document(s) uploaded</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Skills ({data.skills.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
