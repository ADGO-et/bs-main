"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/hiwot-comp/search-bar";
import ApplicantList from "@/components/hiwot-comp/applicant-list";
import { useGetHiwotListQuery } from "@/redux/api/hiwotApi";

const locations = [
  { id: "addis-ababa", label: "Addis Ababa" },
  { id: "dire-dawa", label: "Dire Dawa" },
  { id: "bahir-dar", label: "Bahir Dar" },
  { id: "hawassa", label: "Hawassa" },
  { id: "mekelle", label: "Mekelle" },
];

export default function HiwotOverviewPage() {
  const { data, isLoading } = useGetHiwotListQuery();
  const applicants = Array.isArray(data?.data?.hiwots) ? data.data.hiwots : [];

  const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("all");
  const [layout, setLayout] = useState<"list" | "grid">("list");

  // Apply filters whenever applicants, searchTerm, or location changes
  useEffect(() => {
    let results = applicants.filter((a) => a.status === "approved");

    // Search filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(
        (applicant) =>
          `${applicant.firstName} ${applicant.lastName}`
            .toLowerCase()
            .includes(searchTermLower) ||
          applicant.description.toLowerCase().includes(searchTermLower)
      );
    }

    // Location filter
    if (location && location !== "all") {
      results = results.filter((applicant) => {
        // If your backend has a location field, use it. Otherwise, skip this filter.
        if (!applicant.location) return false;
        const locationId = applicant.location
          .toLowerCase()
          .replace(/\s+/g, "-");
        return locationId === location;
      });
    }

    setFilteredApplicants(results);
  }, [applicants, searchTerm, location]);

  return (
    <div className="min-h-screen pt-0 pb-16 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute -left-40 top-0 opacity-10">
        {/* ...SVG code... */}
      </div>
      <div className="absolute -right-40 bottom-0 opacity-10">
        {/* ...SVG code... */}
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Hiwot Fund: <span className="text-blue-500"> Support</span> for
            those in need
          </h1>
          <p className="text-gray-600 text-center py-4">
            Support individuals who need financial assistance
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          {/* <SearchBar
            searchTerm={searchTerm}
            location={location}
            locations={locations}
            onSearchChange={setSearchTerm}
            // onLocationChange={setLocation}
            onSearch={() => {}} // Not needed, filters are live
          /> */}
          {/* <SearchBar
            searchTerm={searchTerm}
            location={location}
            locations={locations}
            onSearchChange={setSearchTerm}
            onLocationChange={(val) => {
              if (val !== location) setLocation(val);
            }}
            onSearch={() => {}}
          /> */}
        </motion.div>
        {/* 
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8"> */}
        {/* Applicants List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-3"
        >
          <ApplicantList
            applicants={filteredApplicants}
            layout={layout}
            onLayoutChange={setLayout}
          />
        </motion.div>
        {/* </div> */}
      </div>
    </div>
  );
}
