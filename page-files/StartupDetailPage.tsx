"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
  Users,
  Banknote,
  Target,
  FileText,
  HeartHandshake,
  MessageSquare,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { StartupProject } from "@/components/startup-comp/project-card";
import placeholderimg from "@/public/placeholder.png";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
// Mock data for projects
const mockProjects: StartupProject[] = Array.from({ length: 50 }, (_, i) => ({
  id: `project-${i + 1}`,
  projectName: [
    "EcoTech Solutions",
    "FinHub",
    "MedConnect",
    "AgriSmart",
    "EduTech Innovations",
    "CleanEnergy",
    "SmartMobility",
    "FoodTech",
    "RetailTech",
    "AIServices",
  ][i % 10],
  projectDescription: [
    "Sustainable technology solutions for environmental challenges",
    "Innovative financial technology platform for small businesses",
    "Connecting patients with healthcare providers through technology",
    "Smart agricultural solutions for improved crop yields",
    "Educational technology for accessible learning",
    "Renewable energy solutions for homes and businesses",
    "Smart transportation solutions for urban areas",
    "Innovative food technology for sustainable nutrition",
    "Technology solutions for modern retail experiences",
    "AI-powered services for business optimization",
  ][i % 10],
  projectOwner: [
    "Abebe Kebede",
    "Tigist Haile",
    "Dawit Tadesse",
    "Hiwot Tesfaye",
    "Yonas Bekele",
  ][i % 5],
  email: `contact@${
    ["ecotech", "finhub", "medconnect", "agrismart", "edutech"][i % 5]
  }.com`,
  phoneNumber: `+251 9${i % 10}${i % 10} ${i % 10}${i % 10}${i % 10} ${i % 10}${
    i % 10
  }${i % 10}${i % 10}`,
  postDuration: 30 + (i % 5) * 30,
  goalFund: 100000 + (i % 10) * 50000,
  bank: [
    "Commercial Bank of Ethiopia",
    "Dashen Bank",
    "Awash Bank",
    "Bank of Abyssinia",
    "Zemen Bank",
  ][i % 5],
  bankAccount: `100${i}${i}${i}${i}${i}${i}`,
  location: ["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][
    i % 5
  ],
  address: `${i + 1} Main Street, ${
    ["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][i % 5]
  }`,
  companyLogo: placeholderimg,
  nationalId: `https://storage.example.com/id/id-${i + 1}.pdf`,
  videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  typeOfSupport: [
    "Funding",
    "Mentorship",
    "Technical",
    "Partnership",
    "Investment",
  ][i % 5],
  fundingProgress: Math.floor(Math.random() * 100),
  supporters: Math.floor(Math.random() * 100),
  category: [
    "Technology",
    "Finance",
    "Healthcare",
    "Agriculture",
    "Education",
    "Energy",
    "Transportation",
    "Food",
    "Retail",
    "AI",
  ][i % 10],
}));

export default function StartupDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [project, setProject] = useState<StartupProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const router = useRouter();

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const userComment = {
      id: Date.now().toString(),
      author: "Anonymous",
      avatar: "",
      content: newComment,
      date: "Just now",
      isBacker: true,
    };

    setComments([...comments, userComment]);
    setNewComment("");
  };
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from an API
        const foundProject = mockProjects.find((p) => p.id === params.id);

        if (foundProject) {
          setProject(foundProject);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  // Get support type badge color
  const getSupportTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "funding":
        return "bg-green-100 text-green-800";
      case "mentorship":
        return "bg-blue-100 text-blue-800";
      case "technical":
        return "bg-purple-100 text-purple-800";
      case "partnership":
        return "bg-purple-100 text-purple-800";
      case "investment":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-0 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  const handleBack = () => {
    router.push("/startup/projects");
  };
  if (!project) {
    return (
      <div className="min-h-screen pt-0 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">
            The project you are looking for does not exist.
          </p>
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white"
            onClick={handleBack}
          >
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-0 pb-16 relative overflow-hidden">
      {/* Background patterns */}
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
      </div>

      <div className="absolute -right-40 bottom-0 opacity-10">
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

      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 "
            onClick={handleBack}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 ">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Banknote className="text-purple-500" size={20} />
                Funding Progress
              </h2>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    ETB {project.goalFund.toLocaleString()} goal
                  </span>
                  <span className="text-sm font-medium">
                    {project.fundingProgress}% Funded
                  </span>
                </div>
                <Progress value={project.fundingProgress} className="h-3" />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <Button className="bg-purple-600 hover:bg-purple-700 h-fit w-fit">
                  Support Project
                </Button>
              </div>
              <p className="text-gray-600 text-sm">
                This project is seeking {project.typeOfSupport.toLowerCase()}{" "}
                support to help scale operations. Your support can help make a
                significant impact in the {project.category?.toLowerCase()}{" "}
                sector.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Project Owner</p>
                    <p className="text-gray-600">{project.projectOwner}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{project.location}</p>
                    <p className="text-sm text-gray-500">{project.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{project.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{project.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Post Duration</p>
                    <p className="text-gray-600">{project.postDuration} days</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  Contact Project Owner
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Project Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 pt-0">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative h-32 w-32 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={placeholderimg}
                    alt={project.projectName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">
                      {project.projectName}
                    </h1>
                    <Badge
                      className={getSupportTypeColor(project.typeOfSupport)}
                    >
                      {project.typeOfSupport}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {project.projectDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm">
                      {project.category}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {project.location}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Video */}
            <div className="bg-white rounded-xl shadow-sm p-6 pt-2">
              <div className="relative pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <iframe
                  src={project.videoLink.replace("watch?v=", "embed/")}
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                />
              </div>
              <Button variant="outline" className="w-full">
                Watch on YouTube
              </Button>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                Project Details
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Full Description</h3>
                  <p className="text-gray-600">
                    {project.projectDescription} Our team is dedicated to
                    creating innovative solutions that address real-world
                    problems in the {project.category?.toLowerCase()} sector.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Goals & Objectives</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {[
                      "Develop and launch core product within 6 months",
                      "Acquire 1,000+ users in first year",
                      "Establish key partnerships",
                      "Create sustainable revenue streams",
                      "Make positive community impact",
                    ].map((goal, i) => (
                      <li key={i}>{goal}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="ml-4">
              <Button className="bg-purple-600 hover:bg-purple-700 ">
                Support This Project
              </Button>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="text-purple-500" size={20} />
                Community Discussion
              </h2>

              {true ? (
                <div className="mb-6">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts about this project..."
                    className="mb-3"
                  />
                  <Button
                    onClick={handleAddComment}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Post Comment
                  </Button>
                </div>
              ) : (
                <div className="bg-purple-50 p-4 rounded-lg mb-6 flex items-center gap-3">
                  <Lock className="text-purple-500" size={18} />
                  <p className="text-purple-700">
                    Only backers can post comments. Support this project to join
                    the discussion.
                  </p>
                </div>
              )}

              {/* Show comments if any exist */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <div className="flex-shrink-0">
                        {comment.avatar ? (
                          <img
                            src={comment.avatar}
                            alt={comment.author}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {comment.author.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{comment.author}</p>
                          {comment.isBacker && (
                            <Badge variant="outline" className="text-xs">
                              Backer
                            </Badge>
                          )}
                          <span className="text-sm text-gray-500">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
