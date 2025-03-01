"use client"

import { useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

type Lead = {
  id: number
  firstName: string
  lastName: string
  email: string
  country: string
  linkedIn: string
  visaCategory: string
  additionalInfo: string
  resume: string
  status: "PENDING" | "REACHED_OUT"
  submittedAt: string
}

type SortConfig = {
  key: keyof Lead
  direction: "asc" | "desc"
} | null

interface LeadsDataTableProps {
  initialLeads: Lead[]
}

export function LeadsDataTable({ initialLeads }: LeadsDataTableProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [sortConfig, setSortConfig] = useState<SortConfig>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  const handleSort = (key: keyof Lead) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return current.direction === "asc" ? { key, direction: "desc" } : null
      }
      return { key, direction: "asc" }
    })
  }

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig) return 0

    const { key, direction } = sortConfig
    const aValue = a[key]
    const bValue = b[key]

    if (aValue < bValue) return direction === "asc" ? -1 : 1
    if (aValue > bValue) return direction === "asc" ? 1 : -1
    return 0
  })

  const handleStatusChange = async (id: number) => {
    try {
      const response = await fetch("/api/leads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: "REACHED_OUT" }),
      })

      if (!response.ok) {
        throw new Error("Failed to update lead status")
      }

      // Update the local state
      setLeads(leads.map((lead) => (lead.id === id ? { ...lead, status: "REACHED_OUT" } : lead)))

      toast({
        title: "Status Updated",
        description: "Lead status has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating lead status:", error)
      toast({
        title: "Error",
        description: "Failed to update lead status. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl font-semibold">No leads found</p>
        <p className="text-gray-500 mt-2">There are currently no leads in the system.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-100">
            <TableHead onClick={() => handleSort("firstName")} className="cursor-pointer font-medium text-gray-600">
              Name
              <ChevronDown className="ml-2 h-4 w-4 inline-block text-gray-400" />
            </TableHead>
            <TableHead onClick={() => handleSort("email")} className="cursor-pointer font-medium text-gray-600">
              Email
              <ChevronDown className="ml-2 h-4 w-4 inline-block text-gray-400" />
            </TableHead>
            <TableHead onClick={() => handleSort("country")} className="cursor-pointer font-medium text-gray-600">
              Country
              <ChevronDown className="ml-2 h-4 w-4 inline-block text-gray-400" />
            </TableHead>
            <TableHead onClick={() => handleSort("visaCategory")} className="cursor-pointer font-medium text-gray-600">
              Visa Category
              <ChevronDown className="ml-2 h-4 w-4 inline-block text-gray-400" />
            </TableHead>
            <TableHead onClick={() => handleSort("submittedAt")} className="cursor-pointer font-medium text-gray-600">
              Submitted
              <ChevronDown className="ml-2 h-4 w-4 inline-block text-gray-400" />
            </TableHead>
            <TableHead onClick={() => handleSort("status")} className="cursor-pointer font-medium text-gray-600">
              Status
              <ChevronDown className="ml-2 h-4 w-4 inline-block text-gray-400" />
            </TableHead>
            <TableHead className="font-medium text-gray-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLeads.map((lead) => (
            <TableRow key={lead.id} className="border-gray-100">
              <TableCell className="font-medium">{`${lead.firstName} ${lead.lastName}`}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.country}</TableCell>
              <TableCell>{lead.visaCategory}</TableCell>
              <TableCell>{new Date(lead.submittedAt).toLocaleString()}</TableCell>
              <TableCell>{lead.status}</TableCell>
              <TableCell>
                <Button onClick={() => handleStatusChange(lead.id)} disabled={lead.status === "REACHED_OUT"}>
                  {lead.status === "PENDING" ? "Mark as Reached Out" : "Reached Out"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination controls */}
      <div className="flex items-center justify-end gap-1 py-4 px-6 border-t border-gray-100">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-600"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {[1, 2, 3].map((page) => (
          <Button
            key={page}
            variant="ghost"
            size="sm"
            className={cn("h-8 w-8", currentPage === page && "bg-gray-100")}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-600"
          onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

