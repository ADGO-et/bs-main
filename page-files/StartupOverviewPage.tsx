"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetAllVerifiedStartupsQuery } from "@/redux/api/startupApi";
import type { StartupProject } from "@/components/startup-comp/project-card";

// Dynamically imported components
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const ProjectFilters = dynamic(
  () => import("@/components/startup-comp/project-filters"),
  { ssr: false }
);

const ProjectList = dynamic(
  () => import("@/components/startup-comp/project-list"),
  { ssr: false }
);

const SearchBar = dynamic(
  () => import("@/components/startup-comp/search-bar"),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-full bg-gray-100 rounded-md animate-pulse" />
    ),
  }
);

const categories = [
  { id: "technology", label: "Technology" },
  { id: "non-technology", label: "Non-Technology" },
];

const locations = [
  { id: "addis-ababa", label: "Addis Ababa", count: 20 },
  { id: "dire-dawa", label: "Dire Dawa", count: 8 },
  { id: "bahir-dar", label: "Bahir Dar", count: 10 },
  { id: "hawassa", label: "Hawassa", count: 7 },
  { id: "mekelle", label: "Mekelle", count: 5 },
];

export default function StartupOverviewPage() {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<StartupProject[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [layout, setLayout] = useState<"list" | "grid">("list");

  // Redux query with reduced re-fetching
  const { data: allVerifiedStartups } = useGetAllVerifiedStartupsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
    }
  );

  // Filter projects with debounce effect
  useEffect(() => {
    if (!allVerifiedStartups?.data?.startups) return;

    const filterProjects = () => {
      let results = [...allVerifiedStartups.data.startups];

      // Apply search term filter
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        results = results.filter(
          (project) =>
            project.projectName?.toLowerCase().includes(searchTermLower) ||
            project.projectDescription?.toLowerCase().includes(searchTermLower)
        );
      }

      // Apply category filter
      if (selectedCategories.length > 0) {
        results = results.filter((project) => {
          const category = project.category?.toLowerCase() || "";
          return selectedCategories.some((cat) => cat === category);
        });
      }

      // Apply location filter
      if (location && location !== "all") {
        results = results.filter(
          (project) => project.location?.toLowerCase() === location
        );
      }

      setFilteredProjects(results);
    };

    const timer = setTimeout(filterProjects, 300);
    return () => clearTimeout(timer);
  }, [allVerifiedStartups, searchTerm, selectedCategories, location]);

  const handleCategoryChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, id]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== id)
      );
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setLocation("all");
    setSelectedCategories([]);
    if (allVerifiedStartups?.data?.startups) {
      setFilteredProjects([...allVerifiedStartups.data.startups]);
    }
  };

  return (
    <div className="min-h-screen pt-0 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Discover <span className="text-blue-500">Innovative Startups</span>{" "}
            to Support
          </h1>
          <p className="text-gray-600 text-center py-4">
            Find and support promising startup projects across various
            industries
          </p>
        </MotionDiv>

        {/* Search Bar */}
        <MotionDiv
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
          />
        </MotionDiv>

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
                  <ProjectFilters
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                    onClearFilters={clearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters */}
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <ProjectFilters
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              onClearFilters={clearFilters}
            />
          </MotionDiv>

          {/* Projects List */}
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <ProjectList
              projects={filteredProjects}
              layout={layout}
              onLayoutChange={setLayout}
            />
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
