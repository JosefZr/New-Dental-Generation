import { useGetAllWaitlist } from "@/hooks/leads-waitlists/useGetAllWaitlist";
import { Delete, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { useMemo, useState } from "react";
import { renderContent, renderMobileContent } from "../utils/helper";
export default function Waitlist() {
  const [searchTermWaitlist, setSearchTermWaitlist] = useState("")
  const { data: waitList, isLoading: isWaitListLoading, isError: isWaitlistError, error: waitlistError } = useGetAllWaitlist()
  const {onOpen} = useModal()
  const handleDelete = (data) => {
    onOpen(MODAL_TYPE.DELETE_WAITLIST, data)
  }
  const handlePreview = (data) => {
    onOpen(MODAL_TYPE.WAITLIST_DETAILS, data)
  }
  const filteredWaitlist = useMemo(() => (
    waitList?.filter(waitlist => 
      waitlist.email.toLowerCase().includes(searchTermWaitlist.toLowerCase())
    ) || []
  ), [waitList, searchTermWaitlist])

  return (
    <div>
      {/* Waitlist Section */}
      <div className="mx-auto  p-4 md:p-6 rounded-lg shadow-lg">
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
                    <td className="px-4 py-2">
                      <a href={`mailto:${waitlist.email}`} className="text-blue-500 hover:underline">{waitlist.email}</a>
                    </td>
                    <td className="px-4 py-2">{waitlist.number || 'Not provided'}</td>
                    <td className="px-4 py-2">{waitlist.why || 'Not provided'}</td>
                    <td className=" py-2 flex flex-row space-x-1">
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
                  <div className="grid grid-cols-2 gap-2 text-sm">
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
                  <div className="flex justify-center gap-2 mt-4">
                    <Button
                      variant="secondary"
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
