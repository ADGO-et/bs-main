"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import SearchBar from "@/components/hiwot-comp/search-bar";
import ApplicantFilters from "@/components/hiwot-comp/applicant-filters";
import ApplicantList from "@/components/hiwot-comp/applicant-list";
import type { HiwotApplicant } from "@/components/hiwot-comp/applicant-card";
import placeholder from "@/public/hiwot-placeholder.png";
import { useGetHiwotListQuery } from "@/redux/api/hiwotApi";

const ageRanges = [
  { id: "0-18", label: "Children (0-18)", count: 15 },
  { id: "over 18", label: "Young Adults (  > 18)", count: 12 },
];

const locations = [
  { id: "addis-ababa", label: "Addis Ababa", count: 10 },
  { id: "dire-dawa", label: "Dire Dawa", count: 10 },
  { id: "bahir-dar", label: "Bahir Dar", count: 10 },
  { id: "hawassa", label: "Hawassa", count: 10 },
  { id: "mekelle", label: "Mekelle", count: 10 },
];

export default function HiwotOverviewPage() {
  // State
  const { data, isLoading } = useGetHiwotListQuery();
  const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);
  const applicants = data?.data ?? [];
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("all");
  const [layout, setLayout] = useState<"list" | "grid">("list");

  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleAgeRangeChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedAgeRanges([...selectedAgeRanges, id]);
    } else {
      setSelectedAgeRanges(selectedAgeRanges.filter((range) => range !== id));
    }
  };

  const handleLocationChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, id]);
    } else {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== id));
    }
  };

  // Apply filters
  const applyFilters = () => {
    let results = [...applicants];

    // Apply search term filter
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

    // Apply location filter
    if (location && location !== "all") {
      results = results.filter((applicant) => {
        const locationId = applicant.location
          .toLowerCase()
          .replace(/\s+/g, "-");
        return locationId === location;
      });
    }

    // Apply age range filter
    if (selectedAgeRanges.length > 0) {
      results = results.filter((applicant) => {
        const birthDate = new Date(applicant.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        return selectedAgeRanges.some((range) => {
          switch (range) {
            case "0-18":
              return age >= 0 && age <= 18;
            case "over-18":
              return age > 18;
            default:
              return false;
          }
        });
      });
    }

    // Apply location filter from checkboxes
    if (selectedLocations.length > 0) {
      results = results.filter((applicant) => {
        const locationId = applicant.location
          .toLowerCase()
          .replace(/\s+/g, "-");
        return selectedLocations.includes(locationId);
      });
    }

    setFilteredApplicants(results);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setLocation("all");
    setSelectedAgeRanges([]);
    setFilteredApplicants(applicants);
  };

  // Apply filters when any filter state changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, location]);

  return (
    <div className="min-h-screen pt-0 pb-16 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute -left-40 top-0 opacity-10">
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
          <SearchBar
            searchTerm={searchTerm}
            location={location}
            locations={locations}
            onSearchChange={setSearchTerm}
            onLocationChange={setLocation}
            onSearch={applyFilters}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <SlidersHorizontal size={16} />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>Filter Options</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <ApplicantFilters
                    ageRanges={ageRanges}
                    locations={locations}
                    selectedAgeRanges={selectedAgeRanges}
                    selectedLocations={selectedLocations}
                    onAgeRangeChange={handleAgeRangeChange}
                    onLocationChange={handleLocationChange}
                    onApplyFilters={applyFilters}
                    onClearFilters={clearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters - Hidden on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <ApplicantFilters
              ageRanges={ageRanges}
              locations={locations}
              selectedAgeRanges={selectedAgeRanges}
              selectedLocations={selectedLocations}
              onAgeRangeChange={handleAgeRangeChange}
              onLocationChange={handleLocationChange}
              onApplyFilters={applyFilters}
              onClearFilters={clearFilters}
            />
          </motion.div>

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
        </div>
      </div>
    </div>
  );
}
