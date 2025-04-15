import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cloud, BarChart, ArrowUpRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-4 container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Cloud className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">CloudAdopt</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#features">Features</Link>
              <Link href="#benefits">Benefits</Link>
              <Link href="#cta">Get Started</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Simplify Your Cloud Journey
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Empower your small business with our CBIS decision-support tool. Assess readiness, compare providers,
                  and plan your migration with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/get-started">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <BarChart className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Readiness Assessment</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Evaluate your business's preparedness for cloud adoption and receive tailored recommendations.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <ArrowUpRight className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Provider Comparison</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Compare cloud service providers based on cost, features, security, and scalability.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <Cloud className="h-10 w-10 text-purple-500" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Migration Planning</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Get step-by-step guidance for a seamless cloud migration, including data backup and testing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Benefits for Small Businesses
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Reduce IT costs and complexity",
                "Improve scalability and flexibility",
                "Enhance data security and compliance",
                "Increase productivity and collaboration",
                "Access advanced technologies",
                "Focus on core business activities",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <ArrowRight className="h-5 w-5 text-green-500" />
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-blue-500 dark:bg-blue-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Your Cloud Journey?
              </h2>
              <p className="mx-auto max-w-[700px] text-white/90 md:text-xl">
                Get started with our CBIS decision-support tool today and transform your small business with the power
                of cloud technology.
              </p>
              <Link href="/get-started">
                <Button className="bg-white text-blue-500 hover:bg-blue-50">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2">
              <Cloud className="h-6 w-6" />
              <span className="font-bold">CloudAdopt</span>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              ©{new Date().getFullYear()} CloudAdopt. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
