import { useGetAllLeads } from "@/hooks/leads-waitlists/useGetAllLeads"
import { Delete} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"
import { useMemo, useState } from "react"
import { renderContent, renderMobileContent } from "../utils/helper"
export default function Lead() {
  const [searchTerm, setSearchTerm] = useState("")

    const { data: leads, isLoading, isError, error } = useGetAllLeads()
      const {onOpen} = useModal()
    
    const handleDelete = (data) => {
      onOpen(MODAL_TYPE.DELETE_LEAD, data)
    }
    
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Invalid date'
    return new Intl.DateTimeFormat('en-GB').format(date)
  }
  const filteredLeads = useMemo(() => (
    leads?.filter(lead => 
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []
  ), [leads, searchTerm])


  return (
    <div>
      {/* Leads Section */}
      <div className="mx-auto p-4 md:p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4 mb-4 max-w-2xl mx-auto">
          <Input
            placeholder="Search leads by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto shadow-md rounded-lg mx-2 my-4">
          <table className="w-full max-w-2xl mx-auto table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 text-white divide-y divide-gray-600">
              {renderContent({
                isLoading,
                isError,
                error,
                data: filteredLeads,
                renderRow: (lead) => (
                  <tr key={lead._id}>
                    <td className="px-4 py-2 break-all">
                    <a href={`mailto:${lead.email}`} className="text-blue-500 hover:underline">{lead.email}</a>
                    </td>
                    <td className="px-4 py-2">{formatDate(lead.date)}</td>
                    <td className="px-7 py-2 space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(lead)}
                      >
                        <Delete className="h-4 w-4 text-my-red" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {renderMobileContent({
            isLoading,
            isError,
            error,
            data: filteredLeads,
            renderItem: (lead) => (
              <Card key={lead._id} className="bg-gray-700 text-white">
                <CardContent className="p-4">
                  <div className="grid gap-2 text-sm">
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="break-all">{lead.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Date</p>
                      <p>{formatDate(lead.date)}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(lead)}
                    >
                      <Delete className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
