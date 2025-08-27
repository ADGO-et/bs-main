"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Eye, FileText, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadedFile {
  url: string
  name: string
  type: string
}

interface FileUploadProps {
  onUpload: (url: string) => void
  accept?: string
  placeholder?: string
  multiple?: boolean
  uploadedFiles?: UploadedFile[]
  onRemove?: (url: string) => void
  showPreview?: boolean
}

export function FileUpload({
  onUpload,
  accept = "*",
  placeholder = "Upload file",
  multiple = false,
  uploadedFiles = [],
  onRemove,
  showPreview = true,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default")

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      },
    )

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    const data = await response.json()
    return data.secure_url
  }

  const handleFiles = async (files: FileList) => {
    if (!files.length) return

    setUploading(true)
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const url = await uploadToCloudinary(file)
        onUpload(url)
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const isImage = (type: string) => type.startsWith("image/")

  const getFileIcon = (type: string) => {
    if (isImage(type)) return <ImageIcon className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  const openFile = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-colors cursor-pointer ${
          dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <CardContent className="flex flex-col items-center justify-center py-8 text-center bg-blue-50">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            className="hidden"
          />

          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium mb-1">{placeholder}</p>
              <p className="text-xs text-muted-foreground">Drag and drop or click to browse</p>
            </div>
          )}
        </CardContent>
      </Card>

      {showPreview && uploadedFiles.length > 0 && (
        <div className="space-y-3">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="border rounded-lg p-3">
              {isImage(file.type) ? (
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={file.url || "/placeholder.svg"}
                      alt={file.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">Image</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => openFile(file.url)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {onRemove && (
                      <Button type="button" variant="outline" size="sm" onClick={() => onRemove(file.url)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">Document</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => openFile(file.url)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {onRemove && (
                      <Button type="button" variant="outline" size="sm" onClick={() => onRemove(file.url)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
