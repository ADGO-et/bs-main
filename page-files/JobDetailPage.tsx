"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Candidate } from "@/types/jobApi";
import placeholderimg from "@/public/person-placeholder.png";
import { useRouter } from "next/navigation";

// Update the Candidate interface to include bank and bankAccount
// interface Candidate {
//   id: string
//   firstName: string
//   lastName: string
//   department: string
//   field: string
//   phoneNumber: string
//   email: string
//   location: string
//   address: string
//   bank: string
//   bankAccount: string
//   educationCertificates: string[]
//   CV: string
//   identification: string
//   photo: string
//   typeOfEmployment: string
//   videoLink: string
// }

// Update the mock data to include bank and bankAccount
const mockCandidates: Candidate[] = Array.from({ length: 50 }, (_, i) => ({
  id: `candidate-${i + 1}`,
  firstName: ["Sarah", "Meron", "Hiwot", "Tigist", "Bethel"][i % 5],
  lastName: ["Tadesse", "Abebe", "Kebede", "Haile", "Tesfaye"][i % 5],
  department: [
    "Engineering",
    "Design",
    "Marketing",
    "Finance",
    "Human Resources",
  ][i % 5],
  field: [
    "Software Development",
    "UX/UI Design",
    "Digital Marketing",
    "Accounting",
    "Recruitment",
    "Data Science",
    "Project Management",
  ][i % 7],
  phoneNumber: `+251 9${i % 10}${i % 10} ${i % 10}${i % 10}${i % 10} ${i % 10}${
    i % 10
  }${i % 10}${i % 10}`,
  email: `${["sarah", "meron", "hiwot", "tigist", "bethel"][i % 5]}.${
    ["tadesse", "abebe", "kebede", "haile", "tesfaye"][i % 5]
  }@example.com`,
  location: ["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][
    i % 5
  ],
  address: `${i + 1} Main Street, ${
    ["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][i % 5]
  }`,
  bank: [
    "Commercial Bank of Ethiopia",
    "Dashen Bank",
    "Awash Bank",
    "Bank of Abyssinia",
    "Zemen Bank",
  ][i % 5],
  bankAccount: `100${i}${i}${i}${i}${i}${i}`,
  educationCertificates: [
    `https://storage.example.com/certificates/certificate-${i + 1}-1.pdf`,
    `https://storage.example.com/certificates/certificate-${i + 1}-2.pdf`,
    `https://storage.example.com/certificates/certificate-${i + 1}-3.pdf`,
  ],
  CV: `https://storage.example.com/cv/cv-${i + 1}.pdf`,
  identification: `https://storage.example.com/id/id-${i + 1}.pdf`,
  photo: placeholderimg,
  typeOfEmployment: [
    "fulltime",
    "parttime",
    "remote",
    "internship",
    "contract",
  ][i % 5],
  videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
}));

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    // Simulate API call to fetch candidate details
    const fetchCandidate = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from an API
        // Check for both ID formats (with or without 'candidate-' prefix)
        const foundCandidate = mockCandidates.find(
          (c) => c.id === params.id || `candidate-${c.id}` === params.id
        );

        if (foundCandidate) {
          setCandidate(foundCandidate);
        }
      } catch (error) {
        console.error("Error fetching candidate:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Candidate Not Found</h2>
          <p className="text-gray-600 mb-6">
            The candidate you are looking for does not exist.
          </p>
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 "
            onClick={handleBack}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Candidates
          </Button>
        </div>
      </div>
    );
  }

  const getEmploymentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "fulltime":
        return "text-green-500 bg-green-50";
      case "parttime":
        return "text-blue-500 bg-blue-50";
      case "remote":
        return "text-purple-500 bg-purple-50";
      case "internship":
        return "text-purple-500 bg-purple-50";
      case "contract":
        return "text-gray-500 bg-gray-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };
  return (
    <div className="min-h-screen  pb-16 relative overflow-hidden">
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
            Back to Candidates
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 pt-0">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                  <Image
                    src={placeholderimg}
                    alt={`${candidate.firstName} ${candidate.lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold">{`${candidate.firstName} ${candidate.lastName}`}</h1>
                <p className="text-gray-600">{candidate.field}</p>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center text-xs px-3 py-1 rounded-full ${getEmploymentTypeColor(
                      candidate.typeOfEmployment
                    )}`}
                  >
                    <Briefcase size={12} className="mr-1" />
                    {candidate.typeOfEmployment}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{candidate.location}</p>
                    <p className="text-sm text-gray-500">{candidate.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{candidate.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{candidate.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Department</p>
                    <p className="text-gray-600">{candidate.department}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  Contact Candidate
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Detailed Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 pt-0">
              <Tabs defaultValue="profile">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                {/* Replace the TabsContent for profile with a simpler version that only shows available information */}
                <TabsContent value="profile" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">
                      About {candidate.firstName}
                    </h2>
                    <p className="text-gray-600">
                      {candidate.firstName} {candidate.lastName} is a
                      professional in the field of {candidate.field} with the{" "}
                      {candidate.department} department. {candidate.firstName}{" "}
                      is available for
                      {candidate.typeOfEmployment === "fulltime"
                        ? " full-time "
                        : candidate.typeOfEmployment === "parttime"
                        ? " part-time "
                        : candidate.typeOfEmployment === "remote"
                        ? " remote "
                        : candidate.typeOfEmployment === "internship"
                        ? " internship "
                        : " contract "}
                      opportunities in {candidate.location}.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-4">
                      Documents & Certificates
                    </h2>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-purple-500 mr-3" />
                          <span>Curriculum Vitae (CV)</span>
                        </div>
                        <a
                          href={candidate.CV}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          View
                        </a>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-purple-500 mr-3" />
                          <span>Identification Document</span>
                        </div>
                        <a
                          href={candidate.identification}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          View
                        </a>
                      </div>

                      {candidate.educationCertificates.map((cert, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-purple-500 mr-3" />
                            <span>Certificate {index + 1}</span>
                          </div>
                          <a
                            href={cert}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            View
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="video">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">
                      Introduction Video
                    </h2>
                    <div className="relative pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        src={candidate.videoLink.replace("watch?v=", "embed/")}
                        className="absolute top-0 left-0 w-full h-full"
                        title="Candidate Introduction"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink size={16} />
                        <span>Open in YouTube</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Replace the TabsContent for documents to handle links properly */}
                <TabsContent value="documents">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">CV</h2>
                    <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-purple-500 mr-3" />
                        <span>Curriculum Vitae (CV)</span>
                      </div>
                      <a
                        href={candidate.CV}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        View CV
                      </a>
                    </div>

                    <h2 className="text-xl font-bold mb-4">
                      Identification Document
                    </h2>
                    <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-purple-500 mr-3" />
                        <span>Identification Document</span>
                      </div>
                      <a
                        href={candidate.identification}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        View ID
                      </a>
                    </div>

                    <h2 className="text-xl font-bold mb-4">
                      Education Certificates
                    </h2>
                    <div className="space-y-4">
                      {candidate.educationCertificates.map((cert, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-purple-500 mr-3" />
                            <span>Certificate {index + 1}</span>
                          </div>
                          <a
                            href={cert}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            View
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
