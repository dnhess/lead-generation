import { NextResponse } from "next/server"

const leads: any[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    country: "USA",
    linkedIn: "https://linkedin.com/in/johndoe",
    visaCategory: "H-1B",
    additionalInfo: "Looking for software engineering positions",
    resume: "john_doe_resume.pdf",
    status: "PENDING",
    submittedAt: "2024-03-01T12:00:00Z",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    country: "Canada",
    linkedIn: "https://linkedin.com/in/janesmith",
    visaCategory: "TN",
    additionalInfo: "Seeking opportunities in data science",
    resume: "jane_smith_resume.pdf",
    status: "REACHED_OUT",
    submittedAt: "2024-03-02T14:30:00Z",
  },
  {
    id: 3,
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@example.com",
    country: "UK",
    linkedIn: "https://linkedin.com/in/alexjohnson",
    visaCategory: "O-1",
    additionalInfo: "Experienced in AI and machine learning",
    resume: "alex_johnson_resume.pdf",
    status: "PENDING",
    submittedAt: "2024-03-03T09:15:00Z",
  },
]

export async function GET() {
  return NextResponse.json(leads)
}

export async function POST(request: Request) {
  const data = await request.json()

  if (!data.firstName || !data.lastName || !data.email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const newLead = {
    id: leads.length + 1,
    ...data,
    status: "PENDING",
    submittedAt: new Date().toISOString(),
  }

  leads.push(newLead)

  return NextResponse.json({ success: true, message: "Lead submitted successfully", id: newLead.id })
}

export async function PUT(request: Request) {
  const { id, status } = await request.json()

  const leadIndex = leads.findIndex((lead) => lead.id === id)
  if (leadIndex === -1) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 })
  }

  leads[leadIndex].status = status

  return NextResponse.json({ success: true, message: "Lead status updated successfully" })
}

