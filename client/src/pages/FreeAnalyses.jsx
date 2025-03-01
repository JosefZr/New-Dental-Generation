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

export default function FreeAnalyses() {
  const {onOpen }= useModal()
  const { data, isLoading, isError, error } = useGetAllAnalyses()
  console.log(data)
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState("")
  const { setIsDashboardSidebarOpen } = useContext(UserContext)
  const { setJobInfos} = useUserToChatContext()

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
    console.log("Preview analysis:", analysis)
    setJobInfos(analysis)
    onOpen(MODAL_TYPE.JOB_DETAILS)
    // Add your preview logic here
  }

  return (
    <div className="fixed w-full pt-5 m-auto">
      <button
        className="absolute top-2 left-2 cursor-pointer z-50 p-2 hover:bg-gray-800 rounded-md transition-colors"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu className="text-2xl text-white" />
      </button>
      <div className="mx-auto mt-14 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Input
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <div className="flex flex-col sm:flex-row gap-4">
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

        <div className="overflow-x-hidden shadow-md rounded-lg mx-2 my-4">
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
                    <td className="px-4 py-2 whitespace-nowrap">
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
                    <td className="px-4 py-2 whitespace-nowrap">{analysis.email}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{analysis.company}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{analysis.service}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{analysis.adSpend}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
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
      </div>
    </div>
  )
}

