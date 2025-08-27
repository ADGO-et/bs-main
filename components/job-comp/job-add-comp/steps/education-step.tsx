"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/job-comp/job-add-comp/file-upload"
import type { FormData } from "@/components/job-comp/job-add-comp/job-application-form"
import { Plus, Trash2, GraduationCap, School, Calendar, FileText } from "lucide-react"

interface EducationStepProps {
  data: FormData
  updateData: (data: Partial<FormData>) => void
}

export function EducationStep({ data, updateData }: EducationStepProps) {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      degree: "",
    }
    updateData({ education: [...data.education, newEducation] })
  }

  const removeEducation = (index: number) => {
    const updatedEducation = data.education.filter((_, i) => i !== index)
    updateData({ education: updatedEducation })
  }

  const updateEducation = (index: number, field: string, value: string | Date | undefined) => {
    const updatedEducation = data.education.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu))
    updateData({ education: updatedEducation })
  }

  const handleFileUpload = (url: string) => {
    updateData({ educationalFiles: [...data.educationalFiles, url] })
  }

  const removeFile = (url: string) => {
    const updatedFiles = data.educationalFiles.filter((fileUrl) => fileUrl !== url)
    updateData({ educationalFiles: updatedFiles })
  }

  const educationalFilesForPreview = data.educationalFiles.map((url, index) => ({
    url,
    name: `Educational Document ${index + 1}`,
    type: url.includes(".pdf") ? "application/pdf" : "application/octet-stream",
  }))

  const toInputValue = (d?: Date) => (d ? d.toISOString().split("T")[0] : "")
  const parseDate = (value: string): Date | undefined => (value ? new Date(value + "T00:00:00") : undefined)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Education
        </h3>
        <Button onClick={addEducation} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {data.education.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No education added yet. Click <span className="text-blue-500">Add Education</span> to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <Card key={index}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Education #{index + 1}</span>
                  <Button
                    onClick={() => removeEducation(index)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <School className="w-4 h-4" />
                      Institution *
                    </Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                      placeholder="e.g., Harvard University"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Degree/Certificate *
                    </Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      placeholder="e.g., Bachelor of Science in Computer Science"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Start Date *
                    </Label>
                    <Input
                      type="date"
                      value={toInputValue(edu.startDate)}
                      onChange={(e) => updateEducation(index, "startDate", parseDate(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      End Date *
                    </Label>
                    <div>
                      <Input
                        type="date"
                        value={toInputValue(edu.endDate)}
                        onChange={(e) => updateEducation(index, "endDate", parseDate(e.target.value))}
                      />
                      <p className="text-[10px] text-muted-foreground mt-1">If still studying leave end date empty.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="w-5 h-5" />
            Educational Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload
            onUpload={handleFileUpload}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            placeholder="Upload certificates, transcripts, or other educational documents"
            multiple
            uploadedFiles={educationalFilesForPreview}
            onRemove={removeFile}
            showPreview={true}
          />
        </CardContent>
      </Card>
    </div>
  )
}
