"use client"

import { useGetAllAnalyses } from "@/hooks/analyses/useGetAllAnalyses"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { useState, useMemo, useContext } from "react"
import { Input } from "@/components/ui/input"
import { UserContext } from "@/context/UserContext"
import { GiHamburgerMenu } from "react-icons/gi"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUserToChatContext } from "@/context/ToChatUser"
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"
import { Card, CardContent } from "@/components/ui/card"

export default function FreeAnalyses() {
  const { onOpen } = useModal()
  const { data, isLoading, isError, error } = useGetAllAnalyses()
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState("")
  const { setIsDashboardSidebarOpen } = useContext(UserContext)
  const { setJobInfos } = useUserToChatContext()

  const toggleSidebar = () => {
    setIsDashboardSidebarOpen((prev) => !prev)
  }

  const filteredAnalyses = useMemo(() => {
    if (!data) return []
    return data.filter(
      (analysis) =>
        analysis.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (serviceFilter === "" || serviceFilter === "all" || analysis.service === serviceFilter),
    )
  }, [data, searchTerm, serviceFilter])

  const uniqueServices = useMemo(() => {
    return data ? [...new Set(data.map((item) => item.service))] : []
  }, [data])

  const handlePreview = (analysis) => {
    setJobInfos(analysis)
    onOpen(MODAL_TYPE.JOB_DETAILS)
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

      <div className="mx-auto mt-14 p-4 md:p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4 mb-4 max-w-2xl mx-auto">
          <Input
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <div className="w-full sm:w-auto">
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {uniqueServices.map((service) => (
                  <SelectItem key={service} value={service || "unknown"}>
                    {service || "Unknown"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop view - Table */}
        <div className="hidden md:block overflow-x-auto shadow-md rounded-lg mx-2 my-4">
          <table className="w-full max-w-2xl mx-auto table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Company</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Service</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Ad Spend
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 text-white divide-y divide-gray-600">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-2 text-center">
                    Loading...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="px-4 py-2 text-center text-red-500">
                    Error: {error.message}
                  </td>
                </tr>
              ) : filteredAnalyses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-2 text-center">
                    No results found
                  </td>
                </tr>
              ) : (
                filteredAnalyses.map((analysis) => (
                  <tr key={analysis._id}>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <img
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${analysis.name}`}
                          alt={`${analysis.name}'s avatar`}
                          width={32}
                          height={32}
                          className="rounded-full mr-3"
                        />
                        <span>{analysis.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 break-all">{analysis.email}</td>
                    <td className="px-4 py-2">{analysis.company}</td>
                    <td className="px-4 py-2">{analysis.service}</td>
                    <td className="px-4 py-2">{analysis.adSpend}</td>
                    <td className="px-4 py-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-gray-600"
                        onClick={() => handlePreview(analysis)}
                        title="Preview Analysis"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Preview</span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile view - Cards */}
        <div className="md:hidden space-y-4">
          {isLoading ? (
            <div className="text-center p-4 bg-gray-700 text-white rounded-lg">Loading...</div>
          ) : isError ? (
            <div className="text-center p-4 bg-gray-700 text-red-500 rounded-lg">Error: {error.message}</div>
          ) : filteredAnalyses.length === 0 ? (
            <div className="text-center p-4 bg-gray-700 text-white rounded-lg">No results found</div>
          ) : (
            filteredAnalyses.map((analysis) => (
              <Card key={analysis._id} className="bg-gray-700 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${analysis.name}`}
                        alt={`${analysis.name}'s avatar`}
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <h3 className="font-medium">{analysis.name}</h3>
                        <p className="text-sm text-gray-300">{analysis.company}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-gray-600"
                      onClick={() => handlePreview(analysis)}
                      title="Preview Analysis"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="break-all">{analysis.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Service</p>
                      <p>{analysis.service}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Ad Spend</p>
                      <p>{analysis.adSpend}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">phone</p>
                      {!analysis.phone?<p>not Provided</p>:<p>{analysis.phone}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

