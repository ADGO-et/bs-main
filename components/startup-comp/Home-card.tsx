import { Button } from "@/components/ui/button"
import Image from "next/image"
import imgg from "@/public/herosection.svg"
import Link from "next/link"

export default function HomeCard() {
  return (
    <div className="md:container text-center w-screen">
      <p className="text-2xl font-semibold pt-5 bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
        Where Entrepreneurs Rise
      </p>

      <div className="relative m-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-600/35 to-purple-600/20 backdrop-blur-xl rounded-2xl"></div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/50 p-[1px]">
          <div className="h-full w-full rounded-2xl bg-gradient-to-br from-blue-500/70 via-blue-600/25 to-purple-600/10"></div>
        </div>

        {/* Content */}
        <div className="relative p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md text-start">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 mb-4">
              <p className="text-sm font-medium text-white">Startup & Project Hub</p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
              Raise Capital for your project
            </h2>

            <p className="text-lg text-blue-100/90 mb-8 leading-relaxed">Connect, fund, and grow together.</p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-white/15 text-white hover:bg-white/25 hover:text-white backdrop-blur-sm border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 px-6 py-3 rounded-xl font-medium"
              >
                <Link href="/startup/add">Create Your Project</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 px-6 py-3 rounded-xl font-medium"
              >
                <Link href="/startup">How it Works</Link>
              </Button>
            </div>
          </div>

          <div className="flex-shrink-0 relative">
            <div className="relative p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Image
                src={imgg || "/placeholder.svg"}
                alt="Startup Illustration"
                className="max-w-[150px] md:max-w-[280px] hover:scale-110 transition-all duration-500 ease-out filter drop-shadow-2xl"
              />

              <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400/60 rounded-full blur-sm animate-pulse"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-purple-400/40 rounded-full blur-sm animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
    </div>
  )
}
