import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { companyName, companySize, industry, currentInfrastructure, cloudExperience, primaryGoal } = body

    // Validate required fields
    if (!companyName || !companySize || !industry || !currentInfrastructure || !cloudExperience || !primaryGoal) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new user assessment in database
    const user = await prisma.user.create({
      data: {
        companyName,
        companySize,
        industry,
        currentInfrastructure,
        cloudExperience,
        primaryGoal,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error("Error creating user assessment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
