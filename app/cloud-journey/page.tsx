"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Cloud, Server, Database, Shield, Zap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function CloudJourney() {
  const searchParams = useSearchParams()
  const [userData, setUserData] = useState({
    companySize: searchParams.get("companySize") || "",
    industry: searchParams.get("industry") || "",
    infrastructure: searchParams.get("infrastructure") || "",
    experience: searchParams.get("experience") || "",
    goal: searchParams.get("goal") || "",
  })

  const [readinessScore, setReadinessScore] = useState(0)

  useEffect(() => {
    // Calculate readiness score based on user data
    let score = 0

    // Add points based on current infrastructure
    if (userData.infrastructure === "cloud") {
      score += 40
    } else if (userData.infrastructure === "hybrid") {
      score += 25
    } else {
      score += 10
    }

    // Add points based on cloud experience
    if (userData.experience === "extensive") {
      score += 40
    } else if (userData.experience === "moderate") {
      score += 30
    } else if (userData.experience === "limited") {
      score += 20
    } else {
      score += 10
    }

    // Add points based on company size (smaller companies can move faster)
    if (userData.companySize === "1-10") {
      score += 20
    } else if (userData.companySize === "11-50") {
      score += 15
    } else if (userData.companySize === "51-200") {
      score += 10
    } else {
      score += 5
    }

    setReadinessScore(score)
  }, [userData])

  // Get recommended providers based on user data
  const getRecommendedProviders = () => {
    const providers = []

    // Basic recommendations based on company size and goals
    if (userData.companySize === "1-10" || userData.companySize === "11-50") {
      providers.push({
        name: "AWS Lightsail",
        description: "Simple, low-cost cloud platform for small businesses",
        features: ["Easy setup", "Predictable pricing", "Managed databases", "Load balancers"],
      })
    }

    if (userData.goal === "cost-reduction") {
      providers.push({
        name: "Google Cloud Platform",
        description: "Cost-effective cloud solutions with automatic discounts",
        features: ["Pay-as-you-go pricing", "Sustained use discounts", "Free tier", "Cost management tools"],
      })
    }

    if (userData.goal === "scalability") {
      providers.push({
        name: "Microsoft Azure",
        description: "Highly scalable cloud platform with extensive integration",
        features: ["Auto-scaling", "Global infrastructure", "Hybrid capabilities", "Containerization"],
      })
    }

    if (userData.goal === "security" || userData.industry === "healthcare" || userData.industry === "finance") {
      providers.push({
        name: "IBM Cloud",
        description: "Enterprise-grade security and compliance",
        features: [
          "Advanced security controls",
          "Compliance certifications",
          "Encrypted storage",
          "Identity management",
        ],
      })
    }

    // Always include a general recommendation
    providers.push({
      name: "Amazon Web Services (AWS)",
      description: "Comprehensive cloud platform with the widest range of services",
      features: ["200+ services", "Global reach", "Extensive documentation", "Large community"],
    })

    return providers
  }

  // Get migration steps based on user data
  const getMigrationSteps = () => {
    const steps = [
      {
        title: "Assessment & Planning",
        description: "Evaluate your current infrastructure and develop a migration strategy",
        tasks: [
          "Inventory existing applications and infrastructure",
          "Identify dependencies between systems",
          "Determine migration priorities",
          "Create a detailed migration plan",
        ],
      },
      {
        title: "Preparation",
        description: "Set up your cloud environment and prepare for migration",
        tasks: [
          "Set up cloud accounts and access controls",
          "Configure networking and security",
          "Create backup and rollback plans",
          "Train staff on cloud technologies",
        ],
      },
      {
        title: "Migration",
        description: "Move your applications and data to the cloud",
        tasks: [
          "Migrate data to cloud storage",
          "Deploy applications to cloud infrastructure",
          "Update DNS and routing configurations",
          "Implement monitoring and logging",
        ],
      },
      {
        title: "Optimization",
        description: "Refine your cloud implementation for better performance and cost efficiency",
        tasks: [
          "Monitor performance and costs",
          "Implement auto-scaling and load balancing",
          "Optimize resource allocation",
          "Implement disaster recovery solutions",
        ],
      },
    ]

    // Add specific steps based on infrastructure
    if (userData.infrastructure === "on-premises") {
      steps[1].tasks.push("Set up hybrid connectivity solutions")
      steps[2].tasks.push("Implement data transfer mechanisms")
    }

    // Add specific steps based on experience
    if (userData.experience === "none" || userData.experience === "limited") {
      steps[0].tasks.push("Engage with cloud consultants or managed service providers")
      steps[1].tasks.push("Conduct comprehensive cloud training for IT staff")
    }

    return steps
  }

  // Get industry-specific recommendations
  const getIndustryRecommendations = () => {
    switch (userData.industry) {
      case "healthcare":
        return {
          title: "Healthcare Cloud Recommendations",
          description: "Secure and compliant cloud solutions for healthcare organizations",
          recommendations: [
            "Prioritize HIPAA-compliant cloud services",
            "Implement end-to-end encryption for patient data",
            "Use dedicated instances for sensitive workloads",
            "Implement comprehensive audit logging",
            "Consider hybrid cloud for legacy medical systems",
          ],
        }
      case "finance":
        return {
          title: "Financial Services Cloud Recommendations",
          description: "Secure and reliable cloud solutions for financial institutions",
          recommendations: [
            "Implement multi-region deployments for high availability",
            "Use dedicated connectivity options for secure transactions",
            "Leverage cloud-native security services",
            "Implement comprehensive compliance monitoring",
            "Consider specialized financial services cloud offerings",
          ],
        }
      case "retail":
        return {
          title: "Retail Cloud Recommendations",
          description: "Scalable and flexible cloud solutions for retail businesses",
          recommendations: [
            "Implement auto-scaling for seasonal demand fluctuations",
            "Use content delivery networks for global reach",
            "Leverage cloud-based analytics for customer insights",
            "Implement omnichannel capabilities",
            "Consider specialized e-commerce cloud services",
          ],
        }
      case "manufacturing":
        return {
          title: "Manufacturing Cloud Recommendations",
          description: "Reliable and efficient cloud solutions for manufacturing operations",
          recommendations: [
            "Implement IoT platforms for equipment monitoring",
            "Use edge computing for real-time processing",
            "Leverage cloud-based supply chain management",
            "Implement digital twin capabilities",
            "Consider specialized industrial cloud services",
          ],
        }
      case "technology":
        return {
          title: "Technology Cloud Recommendations",
          description: "Advanced cloud solutions for technology companies",
          recommendations: [
            "Implement containerization and orchestration",
            "Use serverless architectures for scalability",
            "Leverage DevOps and CI/CD pipelines",
            "Implement comprehensive monitoring and observability",
            "Consider multi-cloud strategies for flexibility",
          ],
        }
      default:
        return {
          title: "General Cloud Recommendations",
          description: "Best practices for cloud adoption across industries",
          recommendations: [
            "Start with non-critical workloads",
            "Implement proper security controls from day one",
            "Train staff on cloud technologies",
            "Monitor costs and implement governance",
            "Regularly review and optimize your cloud environment",
          ],
        }
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-8 max-w-6xl mx-auto">
        <div className="flex items-center space-x-2">
          <Cloud className="h-6 w-6" />
          <Link href="/" className="font-bold text-xl">
            CloudAdopt
          </Link>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Your Cloud Journey</h1>
          <p className="text-muted-foreground">
            Based on your assessment, we've created a personalized cloud adoption plan for your business.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cloud Readiness Score</CardTitle>
            <CardDescription>Your overall readiness for cloud adoption based on your assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Readiness Score</span>
                <span className="font-bold">{readinessScore}%</span>
              </div>
              <Progress value={readinessScore} className="h-2" />

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Readiness Assessment</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {readinessScore >= 80
                    ? "Your organization is well-prepared for cloud adoption. You can proceed with a comprehensive migration strategy."
                    : readinessScore >= 60
                      ? "Your organization has good potential for cloud adoption. Focus on addressing the identified gaps before proceeding."
                      : readinessScore >= 40
                        ? "Your organization needs moderate preparation before full cloud adoption. Consider a phased approach."
                        : "Your organization requires significant preparation before cloud adoption. Start with small, non-critical workloads."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h5 className="font-semibold flex items-center gap-2">
                      <Zap className="h-4 w-4" /> Strengths
                    </h5>
                    <ul className="mt-2 space-y-1 text-sm">
                      {userData.infrastructure === "cloud" && <li>• Already using cloud infrastructure</li>}
                      {userData.infrastructure === "hybrid" && <li>• Experience with hybrid cloud environments</li>}
                      {(userData.experience === "extensive" || userData.experience === "moderate") && (
                        <li>• Good level of cloud expertise</li>
                      )}
                      {userData.companySize === "1-10" && <li>• Small team size enables agile adoption</li>}
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h5 className="font-semibold flex items-center gap-2">
                      <Shield className="h-4 w-4" /> Areas to Address
                    </h5>
                    <ul className="mt-2 space-y-1 text-sm">
                      {userData.infrastructure === "on-premises" && (
                        <li>• Fully on-premises infrastructure requires migration planning</li>
                      )}
                      {(userData.experience === "none" || userData.experience === "limited") && (
                        <li>• Limited cloud expertise may require training or external support</li>
                      )}
                      {(userData.companySize === "201-500" || userData.companySize === "500+") && (
                        <li>• Larger organization size may complicate migration</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="providers">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="providers">Recommended Providers</TabsTrigger>
            <TabsTrigger value="migration">Migration Plan</TabsTrigger>
            <TabsTrigger value="industry">Industry Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="space-y-4 mt-4">
            <h2 className="text-2xl font-bold">Recommended Cloud Providers</h2>
            <p className="text-muted-foreground">
              Based on your business needs and goals, we recommend the following cloud providers:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {getRecommendedProviders().map((provider, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{provider.name}</CardTitle>
                    <CardDescription>{provider.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {provider.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-500">•</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  {/* <CardFooter>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardFooter> */}
                </Card>
              ))}
            </div>

            {/* <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <h4 className="font-semibold flex items-center gap-2">
                <Database className="h-4 w-4" /> Provider Comparison Tool
              </h4>
              <p className="mt-2 text-sm">
                Use our detailed provider comparison tool to evaluate features, pricing, and performance metrics across
                all major cloud providers.
              </p>
              <Button className="mt-4" variant="outline">
                Open Comparison Tool
              </Button>
            </div> */}
          </TabsContent>

          <TabsContent value="migration" className="space-y-4 mt-4">
            <h2 className="text-2xl font-bold">Your Migration Roadmap</h2>
            <p className="text-muted-foreground">Follow these steps to ensure a successful migration to the cloud:</p>

            <div className="mt-6 space-y-6">
              {getMigrationSteps().map((step, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold">
                      {index + 1}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>

                      <div className="mt-4 space-y-2">
                        <h4 className="font-semibold">Key Tasks:</h4>
                        <ul className="space-y-1">
                          {step.tasks.map((task, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-500">•</span> {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-4 rounded-lg mt-6">
              <h4 className="font-semibold flex items-center gap-2">
                <Server className="h-4 w-4" /> Migration Planning Tool
              </h4>
              <p className="mt-2 text-sm">
                Use our interactive migration planning tool to create a detailed timeline, assign responsibilities, and
                track progress.
              </p>
              <Button className="mt-4" variant="outline">
                Open Migration Planner
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="industry" className="space-y-4 mt-4">
            <h2 className="text-2xl font-bold">{getIndustryRecommendations().title}</h2>
            <p className="text-muted-foreground">{getIndustryRecommendations().description}</p>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Industry-Specific Recommendations</CardTitle>
                <CardDescription>
                  Tailored advice for{" "}
                  {userData.industry === "other" ? "your industry" : `the ${userData.industry} industry`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {getIndustryRecommendations().recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-500">•</span> {recommendation}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="bg-purple-50 p-4 rounded-lg mt-6">
              <h4 className="font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" /> Industry Expertise
              </h4>
              <p className="mt-2 text-sm">
                Connect with our industry specialists to get personalized advice for your specific use cases and
                challenges.
              </p>
              <Button className="mt-4" variant="outline">
                Schedule Consultation
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/dashboard">Continue to Your Dashboard</Link>
          </Button>
        </div> */}
      </div>
    </div>
  )
}
