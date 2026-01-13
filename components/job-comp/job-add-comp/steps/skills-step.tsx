"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FormData } from "@/components/job-comp/job-add-comp/job-application-form"
import { Plus, X, Award } from "lucide-react"

interface SkillsStepProps {
  data: FormData
  updateData: (data: Partial<FormData>) => void
}

export function SkillsStep({ data, updateData }: SkillsStepProps) {
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      updateData({ skills: [...data.skills, newSkill.trim()] })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = data.skills.filter((skill) => skill !== skillToRemove)
    updateData({ skills: updatedSkills })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Skills & Expertise
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter a skill (e.g., JavaScript, Project Management)"
              />
            </div>
            <Button onClick={addSkill} disabled={!newSkill.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {data.skills.length > 0 ? (
            <div className="space-y-3">
              <Label>Your Skills:</Label>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <Badge key={index} className="text-sm py-1 px-3 bg-blue-400">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No skills added yet.</p>
              <p className="text-sm">Add your skills to showcase your expertise.</p>
            </div>
          )}

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Skill Suggestions:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "JavaScript",
                "Python",
                "React",
                "Node.js",
                "SQL",
                "Project Management",
                "Communication",
                "Leadership",
                "Problem Solving",
                "Team Collaboration",
              ]
                .filter((suggestion) => !data.skills.includes(suggestion))
                .map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateData({ skills: [...data.skills, suggestion] })
                    }}
                    className="text-xs"
                  >
                    + {suggestion}
                  </Button>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
