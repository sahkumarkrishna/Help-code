import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function KeyFeatures() {
  return (
    <div className="w-full py-16 px-4 bg-gradient-to-r from-[#0D1B2A] to-[#001F3F] text-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-[#FFD700] mb-4">
          Key Features
        </h2>

        {/* Descriptive Text */}
        <p className="text-center text-gray-300 mb-6">
          Explore how HelpCode enhances your development workflow. From real-time AI support to
          efficient debugging and optimization, every feature is built to help you code smarter and faster.
        </p>

        <Carousel className="w-full">
          <CarouselContent>
            {[
              {
                title: "AI-Powered Code Assistance",
                description: "Receive instant code solutions, suggestions, and improvements with AI.",
                icon: "🤖",
              },
              {
                title: "Real-Time Code Reviews",
                description: "Get in-depth code reviews instantly to improve your coding quality.",
                icon: "📝",
              },
              {
                title: "Optimized Coding Practices",
                description: "Learn optimal ways to write code with expert insights and tips.",
                icon: "⚙️",
              },
              {
                title: "Completely Free",
                description: "Full access at zero cost — no hidden fees, no subscriptions. Just pure coding power, instantly available.",
                icon: "💸",
              },
              {
                title: "Advanced Debugging Tools",
                description: "Use advanced tools to track and fix errors effectively and efficiently.",
                icon: "🐞",
              },
            ].map((feature, index) => (
              <CarouselItem key={index}>
                <div className="p-4">
                  <Card className="bg-[#001F3F] text-white shadow-lg rounded-lg">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <span className="text-5xl">{feature.icon}</span>
                      <h2 className="text-2xl purple-300 text-[#001F3F]font-semibold mt-4">
                        {feature.title}
                      </h2>
                      <p className="text-lg mt-2 text-gray-300 text-center">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-[#001F3F] text-white rounded-full p-2 hover:bg-[#5b30a6] transition-all" />
          <CarouselNext className="bg-[#001F3F] text-white rounded-full p-2 hover:bg-[#5b30a6] transition-all" />
        </Carousel>
      </div>
    </div>
  )
}
