import { LeadsHeader } from "@/components/admin/leads-header";
import { LeadsDataTable } from "@/components/admin/leads-data-table";
import { headers } from "next/headers";
async function getLeads() {
  // Get the host from headers
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // Construct the absolute URL
  const url = `${protocol}://${host}/api/leads`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch leads: ${res.status}`);
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
