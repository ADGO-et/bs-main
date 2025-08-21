"use client";

import { useState } from "react";
import { useGetAllVerifiedStartupsQuery } from "@/redux/api/startupApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Star,
} from "lucide-react";

const RECOMMENDATIONS_PER_PAGE = 6;

export default function FeaturedStartups() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  // Fetch verified startups from API
  const { data, isLoading, isError } = useGetAllVerifiedStartupsQuery();
  const projects = data?.data?.startups || [];
  console.log("PR", projects);

  // Example filtering for sections

  // const additionalProjects = projects.slice(1, 5);
  const recommendations = projects.slice(5);
  const totalPages = Math.ceil(
    recommendations.length / RECOMMENDATIONS_PER_PAGE
  );
  const pagedRecommendations = recommendations.slice(
    (page - 1) * RECOMMENDATIONS_PER_PAGE,
    page * RECOMMENDATIONS_PER_PAGE
  );

  const nonTechProjects = projects
    .filter((project) => project.category?.toLowerCase() === "non-technology")
    .slice(0, 4);

  const techProjects = projects.filter(
    (project) => project.category?.toLowerCase() === "technology"
  );
  const featured = techProjects[0];
  // (first two projects)
  const editorsChoice = projects.slice(0, 2);

  const ProjectCard = ({ project, variant = "default", size = "medium" }) => {
    const isLarge = size === "large";
    const isSmall = size === "small";

    return (
      <div className="group relative">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
          <div
            className={`relative cursor-pointer overflow-hidden ${
              isLarge ? "h-80" : isSmall ? "h-32" : "h-48"
            }`}
            onClick={() => router.push(`/startup/detail/${project._id}`)}
          >
            <Image
              src={project.companyLogo || "/placeholder.svg"}
              alt={project.companyName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500" />

            {variant === "featured" && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>
            )}

            {variant === "trending" && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {Math.floor(Math.random() * 100) + 1}%
                </Badge>
              </div>
            )}
          </div>

          {/* Dynamic content container */}
          <div
            className={`${
              isLarge ? "p-8" : isSmall ? "p-4" : "p-6"
            } transition-all duration-500`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-700 text-xs font-medium"
              >
                {variant === "featured"
                  ? "Featured"
                  : variant === "trending"
                  ? "Trending"
                  : "Recommended"}
              </Badge>
              <span className="text-gray-500 text-xs font-medium truncate">
                {project.projectOwner || project.companyName}
              </span>
            </div>

            <h3
              className={`font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2 ${
                isLarge ? "text-2xl" : isSmall ? "text-sm" : "text-lg"
              }`}
              onClick={() => router.push(`/startup/detail/${project._id}`)}
            >
              {project.projectName}, {project.companyName}
            </h3>

            <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{project.daysLeft ?? project.howLong} days left</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="font-semibold text-green-600">
                {project.fundingProgress ?? 0}% funded
              </span>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs font-medium">
                {project.category}
              </Badge>
            </div>

            {!isSmall && (
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-96 group-hover:mt-4">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out delay-100">
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {project.projectDescription || project.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Support Project
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/startup/detail/${project._id}`);
                      }}
                    >
                      See Details
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Trending project additional info */}
            {variant === "trending" && (
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-20 group-hover:mt-3">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Raised</span>
                    <span className="font-bold text-green-600">
                      ${(Math.random() * 500).toFixed(1)}k
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading/Error/Empty states */}
        {isLoading && (
          <div className="p-4 text-center text-sm text-gray-500">
            Loading...
          </div>
        )}
        {isError && (
          <div className="p-4 text-center text-sm text-red-500">
            Failed to load projects.
          </div>
        )}
        {!isLoading && !isError && projects.length === 0 && (
          <div className="p-4 text-center text-sm text-gray-500">
            No projects found.
          </div>
        )}

        {/* Technological Projects */}
        <section className="mb-16 ">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Technological Projects
              </h2>
              <p className="text-gray-600">
                Discover innovative tech startups changing the world
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start min-h-[400px]">
            <div className="w-full md:w-2/3 lg:w-[40%] h-auto lg:h-[calc(100vh-8rem)] flex-shrink-0">
              {featured && (
                <ProjectCard
                  key={featured._id}
                  project={featured}
                  variant="featured"
                  size="large"
                />
              )}
            </div>

            <div className="w-full md:w-full lg:w-[60%] grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6 h-auto">
              {techProjects.slice(1).map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  variant="recommended"
                  size="medium"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Recommended For You
              </h2>
              <p className="text-gray-600">
                Projects tailored to your interests
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 items-start">
            {pagedRecommendations.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                variant="recommended"
                size="medium"
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => page > 1 && setPage(page - 1)}
                disabled={page === 1}
                className="w-10 h-10 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    totalPages <= 5 ||
                    p === 1 ||
                    p === totalPages ||
                    (p >= page - 1 && p <= page + 1)
                )
                .map((p, index, array) => (
                  <div key={p} className="flex items-center">
                    {index > 0 && array[index - 1] !== p - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <Button
                      variant={page === p ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                      className="w-10 h-10 p-0"
                    >
                      {p}
                    </Button>
                  </div>
                ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => page < totalPages && setPage(page + 1)}
                disabled={page === totalPages}
                className="w-10 h-10 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </section>

        {/* Non-Technological Projects */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Non-Technological Projects
              </h2>
              <p className="text-gray-600">
                Creative and social impact initiatives
              </p>
            </div>
            <Button
              variant="outline"
              className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {nonTechProjects.map((project) => (
              <ProjectCard
                key={`non-tech-${project._id}`}
                project={project}
                variant="trending"
                size="small"
              />
            ))}
          </div>
        </section>

        {/* Featured Projects Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Editor&apos;s Choice
              </h2>
              <p className="text-gray-600">Hand-picked exceptional projects</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {editorsChoice.map((project) => (
              <ProjectCard
                key={`featured-${project._id}`}
                project={project}
                variant="featured"
                size="large"
              />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Discover More?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Explore thousands of innovative projects and find your next
              investment opportunity
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => router.push("/startup/projects")}
            >
              Explore All Projects
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
