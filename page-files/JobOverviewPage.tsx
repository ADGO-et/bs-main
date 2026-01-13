"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// Removed Select imports; using checkboxes now
import { Input } from "@/components/ui/input"
import { Grid, List, MapPin, Clock, Search, Filter, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useGetAllTalentsQuery } from "@/redux/api/jobApi"
import type { SingleTalentResponse } from "@/types/jobApi"
import Pagination from "@/components/blog-comp/pagination"
import { Checkbox } from "@/components/ui/checkbox"


const categories = [
  "Technology",
  "Medical",
  "Business and Finance",
  "Marketing and Communications",
  "Engineering",
  "Education and Training",
  "Creative and Media",
  "Hospitality and Tourism",
  "Trades and Skilled Labor",
  "Retail and Customer Service",
  "Legal and Compliance",
  "Science and Research",
  "Logistics and Transportation",
  "Public Sector and Nonprofit",
  "Agriculture and Environmental",
]

export default function JobOverviewPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all")
  // temp UI state for Apply / Clear pattern
  const [tempCategory, setTempCategory] = useState<string>("all")
  const [tempPeriod, setTempPeriod] = useState<string>("all")
  const [page, setPage] = useState<number>(1)
  const limit = 6
  const [showPeriod, setShowPeriod] = useState<boolean>(true)
  const [showCategory, setShowCategory] = useState<boolean>(true)
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false)

  // Build query params, omit when 'all'
  const { data, isLoading, isError, refetch, isFetching } = useGetAllTalentsQuery({
    page,
    limit,
    category: selectedCategory !== "all" ? selectedCategory : undefined,
    period: selectedPeriod !== "all" ? selectedPeriod : undefined,
  })

  const talents: SingleTalentResponse[] = useMemo(() => (data?.data?.talents as SingleTalentResponse[]) || [], [data])
  const totalPages = data?.data?.pagination?.totalPages || 1
  const totalAvailable = data?.data?.pagination?.total || talents.length

  // Client side search (API doesn't expose search param in current definition)
  const filteredTalents = useMemo<SingleTalentResponse[]>(() => {
    if (!searchTerm) return talents
    return talents.filter((talent) => {
      const firstName = (talent.firstName || "").toLowerCase()
      const lastName = (talent.lastName || "").toLowerCase()
      const profession = (talent.profession || "").toLowerCase()
      const skills: string[] = talent.skills || []
      const q = searchTerm.toLowerCase()
      return (
        firstName.includes(q) ||
        lastName.includes(q) ||
        profession.includes(q) ||
        skills.some((s) => s.toLowerCase().includes(q))
      )
    })
  }, [searchTerm, talents])

  const applyFilters = () => {
    setSelectedCategory(tempCategory)
    setSelectedPeriod(tempPeriod)
    setPage(1)
  }

  const clearFilters = () => {
    setTempCategory("all")
    setTempPeriod("all")
    setSelectedCategory("all")
    setSelectedPeriod("all")
    setPage(1)
  }

  const toggleCategory = (cat: string) => {
    setTempCategory((prev) => (prev === cat ? "all" : cat))
  }
  const togglePeriod = (period: string) => {
    setTempPeriod((prev) => (prev === period ? "all" : period))
  }

  const TalentCard = ({ talent }: { talent: SingleTalentResponse }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={talent.profilePic || "/placeholder.svg"} alt={`${talent.firstName} ${talent.lastName}`} />
            <AvatarFallback className="bg-accent text-accent-foreground">
              {talent.firstName[0]}
              {talent.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground text-balance">
              {talent.firstName} {talent.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{talent.profession}</p>
            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {talent.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {talent.period === "fullTime" ? "Full Time" : "Part Time"}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 text-pretty">{talent.description}</p>
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {talent.category}
          </Badge>
          <div className="flex flex-wrap gap-1">
            {talent.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {talent.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{talent.skills.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full bg-blue-600" size="sm">
          <Link href={`/job/detail/${talent._id}`}>See More</Link>
        </Button>
      </CardFooter>
    </Card>
  )

  const TalentListItem = ({ talent }: { talent: SingleTalentResponse }) => (
    <Card className="group hover:shadow-md transition-all duration-200 border-border bg-card">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={talent.profilePic || "/placeholder.svg"} alt={`${talent.firstName} ${talent.lastName}`} />
            <AvatarFallback className="bg-accent text-accent-foreground">
              {talent.firstName[0]}
              {talent.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-card-foreground text-balance">
                  {talent.firstName} {talent.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">{talent.profession}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {talent.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {talent.period === "fullTime" ? "Full Time" : "Part Time"}
                  </div>
                </div>
              </div>
              <Button asChild size="sm" className="bg-blue-600">
                <Link href={`/job/detail/${talent._id}`}>See More</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-1 text-pretty">{talent.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {talent.category}
              </Badge>
              <div className="flex flex-wrap gap-1">
                {talent.skills.slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {talent.skills.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{talent.skills.length - 4}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Re-usable filter panel (desktop + mobile drawer)
  const FilterPanel = () => (
    <Card className="bg-sidebar border-sidebar-border bg-blue-50 h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <h2 className="font-semibold text-sidebar-foreground">Filters</h2>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border border-border/40 rounded-md bg-blue-100">
          <button
            type="button"
            onClick={() => setShowPeriod((s) => !s)}
            className="w-full flex items-center justify-between px-3 py-2 hover:bg-accent/30 transition text-left"
          >
            <span className="text-sm font-medium text-sidebar-foreground">Work Period</span>
            {showPeriod ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showPeriod && (
            <div className="p-3 pt-0 space-y-2">
              {[
                { label: "Full Time", value: "fullTime" },
                { label: "Part Time", value: "partTime" },
              ].map((p) => (
                <div key={p.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`period-${p.value}`}
                    checked={tempPeriod === p.value}
                    onCheckedChange={() => togglePeriod(p.value)}
                  />
                  <label htmlFor={`period-${p.value}`} className="text-sm text-sidebar-foreground cursor-pointer">
                    {p.label}
                  </label>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <Checkbox id="period-all" checked={tempPeriod === "all"} onCheckedChange={() => togglePeriod("all")} />
                <label htmlFor="period-all" className="text-sm text-sidebar-foreground cursor-pointer">
                  All Periods
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="border border-border/40 rounded-md bg-blue-100">
          <button
            type="button"
            onClick={() => setShowCategory((s) => !s)}
            className="w-full flex items-center justify-between px-3 py-2 hover:bg-accent/30 transition text-left"
          >
            <span className="text-sm font-medium text-sidebar-foreground">Category</span>
            {showCategory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showCategory && (
            <div className="p-3 pt-0 space-y-2 h-64 overflow-y-auto pr-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="cat-all" checked={tempCategory === "all"} onCheckedChange={() => toggleCategory("all")} />
                <label htmlFor="cat-all" className="text-sm cursor-pointer">
                  All Categories
                </label>
              </div>
              {categories.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${cat}`}
                    checked={tempCategory === cat}
                    onCheckedChange={() => toggleCategory(cat)}
                  />
                  <label htmlFor={`cat-${cat}`} className="text-sm cursor-pointer">
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1 bg-blue-600" onClick={applyFilters} disabled={isFetching}>
            Apply
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={clearFilters} disabled={isFetching}>
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search talents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
                className="hidden sm:inline-flex"
              >
                {isFetching ? "..." : "Refresh"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobileFilters(true)}
                className="sm:hidden"
              >
                <Filter className="h-4 w-4" />
                <span className="sr-only">Open Filters</span>
              </Button>
            </div>
            <div className="flex items-center gap-2 sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
                className="sm:hidden"
              >
                {isFetching ? "..." : "Refresh"}
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`${viewMode === "grid" ? "bg-blue-600" : "bg-gray-500"}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`${viewMode === "list" ? "bg-blue-600" : "bg-gray-500"}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 shrink-0">
              <FilterPanel />
            </aside>
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* View Controls / Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div className="text-sm text-muted-foreground order-2 sm:order-1">
                {isLoading
                  ? "Loading talents..."
                  : isError
                  ? "Failed to load talents"
                  : `Showing ${filteredTalents.length} of ${totalAvailable} talents`}
              </div>
            </div>
            {/* Talents Display */}
            {isLoading ? (
              <Card className="p-8 text-center"><p className="text-muted-foreground">Loading...</p></Card>
            ) : isError ? (
              <Card className="p-8 text-center"><p className="text-muted-foreground">Error loading talents. Try refreshing.</p></Card>
            ) : filteredTalents.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No talents found matching your criteria.</p>
              </Card>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTalents.map((talent) => (
                  <TalentCard key={talent._id} talent={talent} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTalents.map((talent) => (
                  <TalentListItem key={talent._id} talent={talent} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !isLoading && !isError && (
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(p) => {
                    if (p >= 1 && p <= totalPages) setPage(p)
                  }}
                />
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilters(false)} />
          <div className="relative ml-auto h-full w-80 max-w-full bg-background shadow-xl flex flex-col">
            <div className="px-4 pt-4 pb-2 border-b">
              <h3 className="font-semibold text-sm">Filters</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FilterPanel />
            </div>
            <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <Button className="w-full" variant="outline" onClick={() => setShowMobileFilters(false)}>
                Close Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
