import { LeadsHeader } from "@/components/admin/leads-header";
import { LeadsDataTable } from "@/components/admin/leads-data-table";

async function getLeads() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/leads`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch leads");
  }
  return res.json();
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="p-8 min-h-screen">
      <LeadsHeader />
      <LeadsDataTable initialLeads={leads} />
    </div>
  );
}
