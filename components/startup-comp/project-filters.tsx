"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
// import { Slider } from "@/components/ui/slider"

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface ProjectFiltersProps {
  fundingRanges: FilterOption[];
  supportTypes: FilterOption[];
  categories: FilterOption[];
  locations: FilterOption[];
  selectedFundingRanges: string[];
  selectedSupportTypes: string[];
  selectedCategories: string[];
  selectedLocations: string[];
  fundingProgress: [number, number];
  onFundingRangeChange: (id: string, checked: boolean) => void;
  onSupportTypeChange: (id: string, checked: boolean) => void;
  onCategoryChange: (id: string, checked: boolean) => void;
  onLocationChange: (id: string, checked: boolean) => void;
  onFundingProgressChange: (value: [number, number]) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export default function ProjectFilters({
  // fundingRanges,
  // supportTypes,
  categories,
  // locations,
  // selectedFundingRanges,
  // selectedSupportTypes,
  selectedCategories,
  // selectedLocations,
  // fundingProgress,
  // onFundingRangeChange,
  // onSupportTypeChange,
  onCategoryChange,
  // onLocationChange,
  // onFundingProgressChange,
  onApplyFilters,
  onClearFilters,
}: ProjectFiltersProps) {
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
  });

  const toggleFilter = (filter: keyof typeof expandedFilters) => {
    setExpandedFilters({
      ...expandedFilters,
      [filter]: !expandedFilters[filter],
    });
  };

  return (
    <div className="space-y-6">
      {/* Categories Filter */}
      <div className="border rounded-lg overflow-hidden">
        <div
          className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
          onClick={() => toggleFilter("categories")}
        >
          <h3 className="font-medium">Categories</h3>
          {expandedFilters.categories ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        <AnimatePresence>
          {expandedFilters.categories && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 space-y-3"
            >
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      onCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label} ({category.count})
                  </Label>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Action Buttons */}
      <div className="flex gap-3">
        <Button
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
          onClick={onApplyFilters}
        >
          Apply Filters
        </Button>
        <Button className="flex-1" variant="outline" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
