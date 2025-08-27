'use client';

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Users, MessageCircle, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HiwotComingSoonPage() {
    const router = useRouter()
    return (
        <div className="min-h-screen bg-background flex flex-col md:w-[50vw] mx-auto">
            <Button className="w-fit mt-6 bg-blue-600" onClick={() => router.push("/hiwot")}>Back</Button>
        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Icon */}
            <div className="flex justify-center mb-8">
                <div className="relative">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" fill="currentColor" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                </div>
                </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
                <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
                We&apos;re Here to <span className="text-primary">Help</span>
                </h1>
                <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A compassionate support service is coming soon to help you navigate life&apos;s challenges with care and
                understanding.
                </p>
            </div>

            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
                <Card className="p-6 text-center border-border/50 hover:border-primary/20 transition-colors">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Personal Support</h3>
                <p className="text-sm text-muted-foreground">One-on-one guidance tailored to your unique situation</p>
                </Card>

                <Card className="p-6 text-center border-border/50 hover:border-primary/20 transition-colors">
                <Users className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Community Care</h3>
                <p className="text-sm text-muted-foreground">Connect with others who understand your journey</p>
                </Card>

                <Card className="p-6 text-center border-border/50 hover:border-primary/20 transition-colors">
                <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Compassionate Approach</h3>
                <p className="text-sm text-muted-foreground">Professional help delivered with empathy and warmth</p>
                </Card>
            </div>

            {/* CTA Section */}
            {/* <div className="space-y-6 mt-12">
                <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">Be the first to know when we launch</h2>
                <p className="text-muted-foreground">Join our community and get early access to our support services</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                <Button className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                    Stay Updated
                </Button>
                </div>
            </div> */}

            {/* Status Indicator */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-8">
                <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-xl">Currently in development</span>
            </div>
            </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8">
            <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-6 mb-4">
                <a
                href="mailto:hello@support.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                <Mail className="w-4 h-4" />
                <span className="text-sm">Get in touch</span>
                </a>
            </div>
            <p className="text-xs text-muted-foreground">
                © 2024 Support Service. Built with care for those who need it most.
            </p>
            </div>
        </footer>
        </div>
    )
}
