'use client';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation";

export function BlogSection() {
  const router = useRouter();
  return (
    <Card className="mx-auto text-center py-20">
      <CardHeader className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-3xl font-bold">Discover Our Blog</CardTitle>
        <CardDescription className="text-lg">
          Dive into a world of insights, tutorials, and stories. Our blog section is packed with valuable content
          waiting to be explored.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Fresh Content</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Expert Insights</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <ArrowRight className="w-4 h-4 text-primary" />
            <span>Easy Navigation</span>
          </div>
        </div>
        <Button size="lg" className="group bg-blue-600" onClick={() => router.push("/blog")}>
          Explore Blog Section
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  )
}
