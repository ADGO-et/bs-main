"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { FormData } from "@/components/job-comp/job-add-comp/job-application-form"
import { Plus, Trash2, Briefcase, Building, Calendar } from "lucide-react"

interface ExperienceStepProps {
  data: FormData
  updateData: (data: Partial<FormData>) => void
}

export function ExperienceStep({ data, updateData }: ExperienceStepProps) {
  const addExperience = () => {
    const newExperience = {
      title: "",
      company: "",
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      description: "",
      currentlyWorking: false,
    }
    updateData({ experience: [...data.experience, newExperience] })
  }

  const removeExperience = (index: number) => {
    const updatedExperience = data.experience.filter((_, i) => i !== index)
    updateData({ experience: updatedExperience })
  }

  const updateExperience = (index: number, field: string, value: string | boolean | Date | undefined) => {
    const updatedExperience = data.experience.map((exp, i) => {
      if (i === index) {
        const updated = { ...exp, [field]: value }
        if (field === "currentlyWorking" && value === true) {
    updated.endDate = undefined
        }
        return updated
      }
      return exp
    })
    updateData({ experience: updatedExperience })
  }

  const toInputValue = (d?: Date) => (d ? d.toISOString().split("T")[0] : "")
  const parseDate = (value: string): Date | undefined => (value ? new Date(value + "T00:00:00") : undefined)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Work Experience
        </h3>
        <Button onClick={addExperience} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {data.experience.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No work experience added yet. Click <span className="text-blue-500">Add Experience</span> to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <Card key={index}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Experience #{index + 1}</span>
                  <Button
                    onClick={() => removeExperience(index)}
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
                      <Briefcase className="w-4 h-4" />
                      Job Title *
                    </Label>
                    <Input
                      value={exp.title}
                      onChange={(e) => updateExperience(index, "title", e.target.value)}
                      placeholder="e.g., Senior Software Engineer"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Company *
                    </Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      placeholder="e.g., Tech Corp Inc."
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
                      value={toInputValue(exp.startDate)}
                      onChange={(e) => updateExperience(index, "startDate", parseDate(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      End Date
                    </Label>
                    <div>
                      <Input
                        type="date"
                        value={toInputValue(exp.endDate)}
                        onChange={(e) => updateExperience(index, "endDate", parseDate(e.target.value))}
                        disabled={exp.currentlyWorking}
                        className={exp.currentlyWorking ? "opacity-50" : ""}
                      />
                      <p className="text-[10px] text-muted-foreground mt-1">If you are currently there leave end date empty.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`currently-working-${index}`}
                    checked={exp.currentlyWorking || false}
                    onCheckedChange={(checked) => updateExperience(index, "currentlyWorking", checked as boolean)}
                  />
                  <Label htmlFor={`currently-working-${index}`} className="text-sm font-normal">
                    I currently work here
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label>Job Description *</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
