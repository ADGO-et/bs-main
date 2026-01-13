"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface CandidateFiltersProps {
  employmentTypes: FilterOption[];
  departments: FilterOption[];
  fields: FilterOption[];
  selectedEmploymentTypes: string[];
  selectedDepartments: string[];
  selectedFields: string[];
  selectedLocations: string[];
  onEmploymentTypeChange: (id: string, checked: boolean) => void;
  onDepartmentChange: (id: string, checked: boolean) => void;
  onFieldChange: (id: string, checked: boolean) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export default function CandidateFilters({
  fields,
  selectedFields,
  onFieldChange,
  onApplyFilters,
  onClearFilters,
}: CandidateFiltersProps) {
  const [expandedFilters, setExpandedFilters] = useState({
    employment: true,
    departments: true,
    fields: true,
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
      {/* Employment Type Filter */}
      {/* <div className="border rounded-lg overflow-hidden">
        <div
          className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
          onClick={() => toggleFilter("employment")}
        >
          <h3 className="font-medium">Type of Employment</h3>
          {expandedFilters.employment ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        <AnimatePresence>
          {expandedFilters.employment && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 space-y-3"
            >
              {employmentTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`employment-${type.id}`}
                    checked={selectedEmploymentTypes.includes(type.id)}
                    onCheckedChange={(checked) =>
                      onEmploymentTypeChange(type.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`employment-${type.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type.label} ({type.count})
                  </Label>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}

      {/* Departments Filter */}
      {/* <div className="border rounded-lg overflow-hidden">
        <div
          className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
          onClick={() => toggleFilter("departments")}
        >
          <h3 className="font-medium">Departments</h3>
          {expandedFilters.departments ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        <AnimatePresence>
          {expandedFilters.departments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 space-y-3"
            >
              {departments.map((department) => (
                <div
                  key={department.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`department-${department.id}`}
                    checked={selectedDepartments.includes(department.id)}
                    onCheckedChange={(checked) =>
                      onDepartmentChange(department.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`department-${department.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {department.label} ({department.count})
                  </Label>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}

      {/* Fields Filter */}
      <div className="border rounded-lg overflow-hidden">
        <div
          className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
          onClick={() => toggleFilter("fields")}
        >
          <h3 className="font-medium">Fields</h3>
          {expandedFilters.fields ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        <AnimatePresence>
          {expandedFilters.fields && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 space-y-3"
            >
              {fields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`field-${field.id}`}
                    checked={selectedFields.includes(field.id)}
                    onCheckedChange={(checked) =>
                      onFieldChange(field.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`field-${field.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {field.label} ({field.count})
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
