"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const steps = [
  { title: "Business Information", description: "Tell us about your company" },
  { title: "Current IT Infrastructure", description: "Assess your existing setup" },
  { title: "Cloud Goals", description: "Define your objectives" },
  { title: "Summary", description: "Review your responses" },
]

export default function GetStarted() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    companySize: "",
    industry: "",
    currentInfrastructure: "",
    cloudExperience: "",
    primaryGoal: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      // Submit form data to API
      const response = await fetch("/api/user-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit assessment")
      }

      const data = await response.json()

      // Store user ID in localStorage for retrieval on the Cloud Journey page
      localStorage.setItem("userId", data.id)

      // Redirect to Cloud Journey page with query params
      router.push(
        `/cloud-journey?companySize=${formData.companySize}&industry=${formData.industry}&infrastructure=${formData.currentInfrastructure}&experience=${formData.cloudExperience}&goal=${formData.primaryGoal}`,
      )
    } catch (error) {
      console.error("Error submitting assessment:", error)
      toast({
        title: "Error",
        description: "Failed to submit your assessment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="companySize">Company Size</Label>
                <Select
                  name="companySize"
                  value={formData.companySize}
                  onValueChange={(value) => handleSelectChange("companySize", value)}
                >
                  <SelectTrigger id="companySize">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="500+">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  name="industry"
                  value={formData.industry}
                  onValueChange={(value) => handleSelectChange("industry", value)}
                >
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )
      case 1:
        return (
          <>
            <div className="flex flex-col space-y-4">
              <Label>Current IT Infrastructure</Label>
              <RadioGroup
                name="currentInfrastructure"
                value={formData.currentInfrastructure}
                onValueChange={(value) => handleSelectChange("currentInfrastructure", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="on-premises" id="on-premises" />
                  <Label htmlFor="on-premises">Fully on-premises</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hybrid" id="hybrid" />
                  <Label htmlFor="hybrid">Hybrid (mix of on-premises and cloud)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cloud" id="cloud" />
                  <Label htmlFor="cloud">Fully cloud-based</Label>
                </div>
              </RadioGroup>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cloudExperience">Cloud Experience</Label>
                <Select
                  name="cloudExperience"
                  value={formData.cloudExperience}
                  onValueChange={(value) => handleSelectChange("cloudExperience", value)}
                >
                  <SelectTrigger id="cloudExperience">
                    <SelectValue placeholder="Select your cloud experience" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="none">No experience</SelectItem>
                    <SelectItem value="limited">Limited experience</SelectItem>
                    <SelectItem value="moderate">Moderate experience</SelectItem>
                    <SelectItem value="extensive">Extensive experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="primaryGoal">Primary Goal for Cloud Adoption</Label>
                <Select
                  name="primaryGoal"
                  value={formData.primaryGoal}
                  onValueChange={(value) => handleSelectChange("primaryGoal", value)}
                >
                  <SelectTrigger id="primaryGoal">
                    <SelectValue placeholder="Select your primary goal" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="cost-reduction">Cost reduction</SelectItem>
                    <SelectItem value="scalability">Improved scalability</SelectItem>
                    <SelectItem value="security">Enhanced security</SelectItem>
                    <SelectItem value="innovation">Faster innovation</SelectItem>
                    <SelectItem value="remote-work">Support remote work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )
      case 3:
        return (
          <>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Summary of Your Responses</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Company Name:</p>
                  <p>{formData.companyName}</p>
                </div>
                <div>
                  <p className="font-semibold">Company Size:</p>
                  <p>{formData.companySize}</p>
                </div>
                <div>
                  <p className="font-semibold">Industry:</p>
                  <p>{formData.industry}</p>
                </div>
                <div>
                  <p className="font-semibold">Current Infrastructure:</p>
                  <p>{formData.currentInfrastructure}</p>
                </div>
                <div>
                  <p className="font-semibold">Cloud Experience:</p>
                  <p>{formData.cloudExperience}</p>
                </div>
                <div>
                  <p className="font-semibold">Primary Goal:</p>
                  <p>{formData.primaryGoal}</p>
                </div>
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Get Started with CloudAdopt</CardTitle>
          <CardDescription>
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrevious} disabled={currentStep === 0}>
            Previous
          </Button>
          <div className="flex space-x-2">
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Start Your Cloud Journey"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
