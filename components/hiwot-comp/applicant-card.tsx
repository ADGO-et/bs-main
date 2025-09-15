"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import placeholder from "@/public/hiwot-placeholder.png";
import type { HiwotFund } from "@/types/hiwotApi";

interface ApplicantCardProps {
  applicant: HiwotFund;
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
    router.push(`/hiwot/detail/${applicant._id}`);
  };

  // Funding progress (if available)
  const progress =
    applicant.fundingGoal &&
    applicant.fundingGoal > 0 &&
    applicant["raisedAmount"]
      ? Math.round(
          ((applicant["raisedAmount"] as number) / applicant.fundingGoal) * 100
        )
      : 0;

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
              src={applicant.photo || placeholder}
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
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-24 bg-gray-200 rounded-full">
                  <div
                    className="h-1.5 bg-blue-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{progress}%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Goal: ETB {Number(applicant.fundingGoal).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="text-blue-500 border-blue-500 hover:bg-blue-50 w-full sm:w-auto"
          onClick={handleSeeMore}
        >
          See More
        </Button>
      </motion.div>
    );
  }

  // Grid layout
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
            src={applicant.photo || placeholder}
            alt={`${applicant.firstName} ${applicant.lastName}`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{`${applicant.firstName} ${applicant.lastName}`}</h3>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-sm text-gray-600 line-clamp-2">
          {applicant.description}
        </p>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">
            ETB {Number(applicant.fundingGoal).toLocaleString()}
          </span>
          <span className="text-xs text-gray-500">{progress}% funded</span>
        </div>
        <div className="h-1.5 w-full bg-gray-200 rounded-full">
          <div
            className="h-1.5 bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <Button
        variant="outline"
        className="text-blue-500 border-blue-500 hover:bg-blue-50 mt-auto"
        onClick={handleSeeMore}
      >
        See More
      </Button>
    </motion.div>
  );
}
