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

interface ApplicantFiltersProps {
  fundingRanges: FilterOption[];
  medicalConditions: FilterOption[];
  ageRanges: FilterOption[];
  selectedAgeRanges: string[];
  selectedLocations: string[];
  onAgeRangeChange: (id: string, checked: boolean) => void;
  onLocationChange: (id: string, checked: boolean) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export default function ApplicantFilters({
  fundingRanges,
  medicalConditions,
  ageRanges,
  selectedAgeRanges,
  selectedLocations,
  onAgeRangeChange,
  onLocationChange,
  onApplyFilters,
  onClearFilters,
}: ApplicantFiltersProps) {
  const [expandedFilters, setExpandedFilters] = useState({
    funding: true,
    medical: true,
    age: true,
    locations: true,
  });

  const toggleFilter = (filter: keyof typeof expandedFilters) => {
    setExpandedFilters({
      ...expandedFilters,
      [filter]: !expandedFilters[filter],
    });
  };

  return (
    <div className="space-y-6">
      {/* Age Ranges Filter */}
      <div className="border rounded-lg overflow-hidden">
        <div
          className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
          onClick={() => toggleFilter("age")}
        >
          <h3 className="font-medium">Age Range</h3>
          {expandedFilters.age ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        <AnimatePresence>
          {expandedFilters.age && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 space-y-3"
            >
              {ageRanges.map((range) => (
                <div key={range.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`age-${range.id}`}
                    checked={selectedAgeRanges.includes(range.id)}
                    onCheckedChange={(checked) =>
                      onAgeRangeChange(range.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`age-${range.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {range.label} ({range.count})
                  </Label>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <Button
          onClick={onApplyFilters}
          className="bg-purple-500 hover:bg-purple-600 text-white"
        >
          Apply Filters
        </Button>
        <Button variant="outline" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
