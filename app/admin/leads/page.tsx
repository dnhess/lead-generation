import { LeadsHeader } from "@/components/admin/leads-header"
import { LeadsDataTable } from "@/components/admin/leads-data-table"

async function getLeads() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch leads")
  }
  return res.json()
}

export default async function LeadsPage() {
  const leads = await getLeads()

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <LeadsHeader />
      <LeadsDataTable initialLeads={leads} />
    </div>
  )
}

