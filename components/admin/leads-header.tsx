"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQueryState } from "nuqs"

export function LeadsHeader() {
  const [search, setSearch] = useQueryState("search")
  const [status, setStatus] = useQueryState("status", { defaultValue: "all" })

  return (
    <div className="mb-8 space-y-4">
      <h1 className="text-2xl font-bold">Leads</h1>
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search" 
            className="pl-9 border-gray-200 rounded-lg focus-visible:ring-gray-200"
            value={search || ""}
            onChange={(e) => setSearch(e.target.value || null)}
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-40 border-gray-200 rounded-lg focus:ring-gray-200">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="REACHED_OUT">Reached Out</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

