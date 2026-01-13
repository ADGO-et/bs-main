"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="h-8 w-8 mr-2"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        // Show pages around current page
        let pageNum = i + 1;
        if (totalPages > 5) {
          if (currentPage > 3) {
            pageNum = currentPage - 3 + i;
          }
          if (currentPage > totalPages - 2) {
            pageNum = totalPages - 4 + i;
          }
        }

        return pageNum <= totalPages ? (
          <Button
            key={pageNum}
            variant={currentPage === pageNum ? "default" : "outline"}
            className={`h-8 w-8 mx-1 ${
              currentPage === pageNum
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : ""
            }`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </Button>
        ) : null;
      })}

      {totalPages > 5 && currentPage < totalPages - 2 && (
        <>
          <span className="mx-1">...</span>
          <Button
            variant="outline"
            className="h-8 w-8 mx-1"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="h-8 w-8 ml-2"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
