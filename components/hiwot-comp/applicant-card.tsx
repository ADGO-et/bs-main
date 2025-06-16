"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import placeholder from "@/public/hiwot-placeholder.png";

export interface HiwotApplicant {
  id: string;
  firstName: string;
  lastName: string;
  description: string;
  phoneNumber: string;
  email: string;
  postDuration: string;
  dateOfBirth: string;
  videoLink: string;
  medicalDocuments: string[];
  goalFund: string;
  bank: string;
  bankAccount: string;
  location: string;
  address: string;
  nationalId: string;
  photo: StaticImageData;
  fundingProgress?: number;
  supporters?: number;
}

interface ApplicantCardProps {
  applicant: HiwotApplicant;
  index: number;
  layout: "list" | "grid";
}

export default function ApplicantCard({
  applicant,
  index,
  layout,
}: ApplicantCardProps) {
  const router = useRouter();

  const handleSeeMore = () => {
    router.push(`/hiwot/detail/${applicant.id}`);
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const age = calculateAge(applicant.dateOfBirth);

  if (layout === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={placeholder}
              alt={`${applicant.firstName} ${applicant.lastName}`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{`${applicant.firstName} ${applicant.lastName}`}</h3>
            <p className="text-sm text-gray-500 line-clamp-1">
              {applicant.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
              <div className="flex items-center">
                <MapPin size={12} className="mr-1" />
                <span>{applicant.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                <span>{age} years old</span>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-24 bg-gray-200 rounded-full">
                  <div
                    className="h-1.5 bg-purple-500 rounded-full"
                    style={{ width: `${applicant.fundingProgress || 0}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">
                  {applicant.fundingProgress || 0}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Goal: ETB {Number.parseInt(applicant.goalFund).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="text-purple-500 border-purple-500 hover:bg-purple-50 w-full sm:w-auto"
          onClick={handleSeeMore}
        >
          See More
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border rounded-lg p-4 flex flex-col h-full"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="relative h-12 w-12 rounded-full overflow-hidden">
          <Image
            src={placeholder}
            alt={`${applicant.firstName} ${applicant.lastName}`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{`${applicant.firstName} ${applicant.lastName}`}</h3>
          <p className="text-xs text-gray-500">{applicant.location}</p>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-sm text-gray-600 line-clamp-2">
          {applicant.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Calendar size={14} className="text-gray-500" />
        <span className="text-sm text-gray-500">{age} years old</span>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">
            ETB {Number.parseInt(applicant.goalFund).toLocaleString()}
          </span>
          <span className="text-xs text-gray-500">
            {applicant.fundingProgress || 0}% funded
          </span>
        </div>
        <div className="h-1.5 w-full bg-gray-200 rounded-full">
          <div
            className="h-1.5 bg-purple-500 rounded-full"
            style={{ width: `${applicant.fundingProgress || 0}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <Heart size={14} className="text-purple-500" />
          <span className="text-xs text-gray-500">
            {applicant.supporters || 0} supporters
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        className="text-purple-500 border-purple-500 hover:bg-purple-50 mt-auto"
        onClick={handleSeeMore}
      >
        See More
      </Button>
    </motion.div>
  );
}
