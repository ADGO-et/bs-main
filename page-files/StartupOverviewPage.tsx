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
import SearchBar from "@/components/startup-comp/search-bar";
import ProjectFilters from "@/components/startup-comp/project-filters";
import ProjectList from "@/components/startup-comp/project-list";
import type { StartupProject } from "@/components/startup-comp/project-card";
import placeholderimg from "@/public/placeholder.png";

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
  category: ["Technology", "Non-Technology"][i % 10],
}));

const categories = [
  { id: "technology", label: "Technology", count: 15 },
  { id: "non-technology", label: "Non-Technology", count: 5 },
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
  const [projects, _] = useState<StartupProject[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] =
    useState<StartupProject[]>(mockProjects);
  const [layout, setLayout] = useState<"list" | "grid">("list");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleCategoryChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, id]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== id)
      );
    }
  };

  // Apply filters
  const applyFilters = () => {
    let results = [...projects];

    // Apply search term filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(
        (project) =>
          project.projectName.toLowerCase().includes(searchTermLower) ||
          project.projectDescription.toLowerCase().includes(searchTermLower)
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter((project) => {
        const category = project.category?.toLowerCase() || "";
        return selectedCategories.some((cat) => cat === category);
      });
    }

    setFilteredProjects(results);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setLocation("all");
    setSelectedCategories([]);
    setFilteredProjects(projects);
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
            Discover{" "}
            <span className="text-purple-500">Innovative Startups</span> to
            Support
          </h1>
          <p className="text-gray-600 text-center py-4">
            Find and support promising startup projects across various
            industries
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
                  <ProjectFilters
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
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
            <ProjectFilters
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              onApplyFilters={applyFilters}
              onClearFilters={clearFilters}
            />
          </motion.div>

          {/* Projects List */}
          <motion.div
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
