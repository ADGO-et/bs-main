"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Phone, Mail, Calendar, FileText, Video, Clock, CheckCircle, ExternalLink, Loader2, AlertTriangle } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useGetSingleTalentQuery } from '@/redux/api/jobApi'
import type { SingleTalent } from '@/types/jobApi'

  
export default function JobDetailPage() {
  const router = useRouter()
  const params = useParams<{ id?: string }>()
  const talentId = (params?.id as string) || ""
  const { data: talentData, isLoading, isError, refetch } = useGetSingleTalentQuery(talentId, { skip: !talentId })
  const profileData = talentData?.data as SingleTalent | undefined

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years > 0 && remainingMonths > 0) {
      return `${years} year${years > 1 ? "s" : ""} ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`
    } else if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}`
    } else {
      return `${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`
    }
  }

  const formatPeriod = (period?: string) => {
    if (!period) return "";
    // Normalize possible lowercase variants
    const normalized = period.toLowerCase();
    if (normalized === "fulltime") return "Full Time";
    if (normalized === "parttime") return "Part Time";
    // Insert space before capital letters for camelCase variants
    return period.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  // Convert common video URLs (YouTube, youtu.be, direct mp4) to embeddable iframe src
  const getEmbedUrl = (url: string) => {
    if (!url) return ""
    try {
      const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/)
      if (ytMatch?.[1]) {
        return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`
      }
      // Vimeo basic support
      const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
      if (vimeoMatch?.[1]) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`
      }
      return url
    } catch {
      return url
    }
  }
  const videoEmbedUrl = getEmbedUrl(profileData?.videoLink || "")

  if (!talentId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center space-y-4">
          <AlertTriangle className="w-8 h-8 mx-auto text-amber-500" />
          <p className="text-muted-foreground">No talent id provided.</p>
          <Button onClick={() => router.push('/job/overview')}>Back to Overview</Button>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p>Loading talent details...</p>
        </div>
      </div>
    )
  }

  if (isError || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center space-y-4 max-w-md">
          <AlertTriangle className="w-10 h-10 mx-auto text-red-500" />
          <p className="text-muted-foreground">Failed to load talent details.</p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => router.push('/job/overview')}>Back</Button>
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header Section */}
  <Button className="bg-blue-600 text-white" onClick={() => router.push("/job/overview")}>Back</Button>
        <Card className="border-blue-600 border-t-4">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-24 h-24 border-4 border-blue-600">
                <AvatarImage
                  src={profileData.profilePic || "/placeholder.svg"}
                  alt={`${profileData.firstName} ${profileData.lastName}`}
                />
                <AvatarFallback className="bg-blue-600 text-white text-xl font-semibold">
                  {profileData.firstName}
                  {profileData.lastName}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <p className="text-xl text-blue-600 font-semibold">{profileData.profession}</p>
                  <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-800">
                    {profileData.category}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>
                      {profileData.location}, {profileData.addressLine}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="capitalize">{formatPeriod(profileData.period)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      {profileData.isAvailable ? "Available for Work" : "Not Available"}
                    </span>
                  </div>
                  <Badge variant={profileData.status === "pending" ? "secondary" : "default"} className="capitalize">
                    {profileData.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{profileData.description}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills?.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Professional Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.experience?.map((exp, index) => (
                <div key={exp._id} className="space-y-2">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{exp.title}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{calculateDuration(exp.startDate, exp.endDate)}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{exp.description}</p>
                  {index < profileData.experience.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.education?.map((edu, index) => (
                <div key={edu._id} className="space-y-2">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{edu.degree}</h3>
                      <p className="text-blue-600 font-medium">{edu.institution}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{calculateDuration(edu.startDate, edu.endDate)}</p>
                    </div>
                  </div>
                  {index < profileData.education.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Additional Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.videoLink && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start h-auto p-4 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent w-full"
                    >
                      <Video className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Video Introduction</div>
                        <div className="text-xs text-gray-500">Watch my introduction video</div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl p-4">
                    <DialogHeader>
                      <DialogTitle>Video Introduction</DialogTitle>
                    </DialogHeader>
                    <div className="w-full aspect-video rounded-md overflow-hidden bg-black">
                      {videoEmbedUrl.match(/\.mp4($|\?)/i) ? (
                        <video
                          src={videoEmbedUrl}
                          className="w-full h-full object-contain"
                          controls
                          preload="metadata"
                        />
                      ) : (
                        <iframe
                          src={videoEmbedUrl}
                          title="Candidate video introduction"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              {profileData.educationalFiles && profileData.educationalFiles.length > 0 && (
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                  asChild
                >
                  <a href={profileData.educationalFiles[0]} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Educational Documents</div>
                      <div className="text-xs text-gray-500">View certificates and transcripts</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 py-4">
          Profile created on{" "}
          {new Date(profileData.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  )
}
