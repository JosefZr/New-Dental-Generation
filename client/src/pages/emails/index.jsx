import { useState, useMemo, useContext } from "react"
import { useGetAllLeads } from "@/hooks/leads-waitlists/useGetAllLeads"
import { useGetAllWaitlist } from "@/hooks/leads-waitlists/useGetAllWaitlist"
import { UserContext } from "@/context/UserContext"
import { useModal } from "@/hooks/useModalStore"
import { MODAL_TYPE } from "@/hooks/useModalStore"
import { GiHamburgerMenu } from "react-icons/gi"
import { Delete, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Emails() {
  const { onOpen } = useModal()
  const { data: leads, isLoading, isError, error } = useGetAllLeads()
  const { data: waitList, isLoading: isWaitListLoading, isError: isWaitlistError, error: waitlistError } = useGetAllWaitlist()
  
  const [searchTerm, setSearchTerm] = useState("")
  const [searchTermWaitlist, setSearchTermWaitlist] = useState("")
  const { setIsDashboardSidebarOpen } = useContext(UserContext)

  const toggleSidebar = () => setIsDashboardSidebarOpen((prev) => !prev)

  const filteredLeads = useMemo(() => (
    leads?.filter(lead => 
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []
  ), [leads, searchTerm])

  const filteredWaitlist = useMemo(() => (
    waitList?.filter(waitlist => 
      waitlist.email.toLowerCase().includes(searchTermWaitlist.toLowerCase())
    ) || []
  ), [waitList, searchTermWaitlist])

  const handlePreview = (data) => {
    onOpen(MODAL_TYPE.EMAIL_DETAILS, data)
  }

  const handleDelete = (data) => {
    onOpen(MODAL_TYPE.DELETE_EMAIL, data)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Invalid date'
    return new Intl.DateTimeFormat('en-GB').format(date)
  }

  return (
    <div className="w-full pt-5 m-auto">
      <button
        className="top-2 left-2 cursor-pointer z-50 p-2 hover:bg-gray-800 rounded-md transition-colors"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <GiHamburgerMenu className="text-2xl text-white" />
      </button>

      {/* Leads Section */}
      <div className="mx-auto mt-14 p-4 md:p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Leads</h2>
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
                    <td className="px-4 py-2 break-all">{lead.email}</td>
                    <td className="px-4 py-2">{formatDate(lead.date)}</td>
                    <td className="px-4 py-2 space-x-2">
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

      {/* Waitlist Section */}
      <div className="mx-auto mt-14 p-4 md:p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Waitlist</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4 max-w-2xl mx-auto">
          <Input
            placeholder="Search waitlist by email..."
            value={searchTermWaitlist}
            onChange={(e) => setSearchTermWaitlist(e.target.value)}
            className="flex-grow"
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto shadow-md rounded-lg mx-2 my-4">
          <table className="w-full max-w-2xl mx-auto table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Reason</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 text-white divide-y divide-gray-600">
              {renderContent({
                isLoading: isWaitListLoading,
                isError: isWaitlistError,
                error: waitlistError,
                data: filteredWaitlist,
                renderRow: (waitlist) => (
                  <tr key={waitlist._id}>
                    <td className="px-4 py-2">{waitlist.name}</td>
                    <td className="px-4 py-2">{waitlist.location}</td>
                    <td className="px-4 py-2">{waitlist.email}</td>
                    <td className="px-4 py-2">{waitlist.phone || 'Not provided'}</td>
                    <td className="px-4 py-2">{waitlist.why}</td>
                    <td className="px-4 py-2 space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePreview(waitlist)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(waitlist)}
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
            isLoading: isWaitListLoading,
            isError: isWaitlistError,
            error: waitlistError,
            data: filteredWaitlist,
            renderItem: (waitlist) => (
              <Card key={waitlist._id} className="bg-gray-700 text-white">
                <CardContent className="p-4">
                  <div className="grid gap-2 text-sm">
                    <div>
                      <p className="text-gray-400">Name</p>
                      <p>{waitlist.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Location</p>
                      <p>{waitlist.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p>{waitlist.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <p>{waitlist.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Reason</p>
                      <p>{waitlist.why}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="ghost"
                      onClick={() => handlePreview(waitlist)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(waitlist)}
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

// Helper components for rendering states
function renderContent({ isLoading, isError, error, data, renderRow }) {
  if (isLoading) return (
    <tr>
      <td colSpan={6} className="px-4 py-2 text-center">
        Loading...
      </td>
    </tr>
  )
  
  if (isError) return (
    <tr>
      <td colSpan={6} className="px-4 py-2 text-center text-red-500">
        Error: {error.message}
      </td>
    </tr>
  )

  if (!data.length) return (
    <tr>
      <td colSpan={6} className="px-4 py-2 text-center">
        No results found
      </td>
    </tr>
  )

  return data.map(renderRow)
}

function renderMobileContent({ isLoading, isError, error, data, renderItem }) {
  if (isLoading) return <div className="text-center p-4 bg-gray-700 text-white rounded-lg">Loading...</div>
  
  if (isError) return (
    <div className="text-center p-4 bg-gray-700 text-red-500 rounded-lg">
      Error: {error.message}
    </div>
  )

  if (!data.length) return (
    <div className="text-center p-4 bg-gray-700 text-white rounded-lg">
      No results found
    </div>
  )

  return data.map(renderItem)
}