import { useUserToChatContext } from "@/context/ToChatUser"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"
import { User, Mail, Building2, Phone, HelpCircle, DollarSign, Globe, Briefcase, ExternalLink } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

// Utility function to format currency
const formatCurrency = (value) => {
  if (!value) return "$0"

  // Remove any existing formatting and convert to number
  const numericValue = typeof value === "string" ? Number.parseFloat(value.replace(/[$,]/g, "")) : value

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue || 0)
}

// Utility function to format phone number
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return ""

  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "")

  // Format as (XXX) XXX-XXXX if it's a 10-digit US number
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }

  // Otherwise return as is
  return phoneNumber
}

export default function JobDetailedModal() {
  const { isOpen, onClose, type } = useModal()
  const isModalOpen = isOpen && type === MODAL_TYPE.JOB_DETAILS
  const { jobInfos } = useUserToChatContext()

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-my-dark-blue p-0 text-white border-[1px] border-my-gold">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-my-gold flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            Job Request Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-4">
          {/* Contact Information Section */}
          <div className="mb-6">
            <h3 className="text-my-gold text-lg font-semibold mb-3 border-b border-my-gold/30 pb-1">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-my-gold mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/70">Full Name</p>
                  <p className="text-white font-medium">{jobInfos.name || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-my-gold mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/70">Email Address</p>
                  <p className="text-white font-medium">{jobInfos.email || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-my-gold mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/70">Company</p>
                  <p className="text-white font-medium">{jobInfos.company || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-my-gold mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/70">Phone Number</p>
                  <p className="text-white font-medium">{formatPhoneNumber(jobInfos.phone) || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details Section */}
          <div className="mb-6">
            <h3 className="text-my-gold text-lg font-semibold mb-3 border-b border-my-gold/30 pb-1">Service Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-my-gold mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/70">Requested Service</p>
                  <Badge className="mt-1 bg-my-gold text-my-dark-blue hover:bg-my-gold/90">
                    {jobInfos.service || "Not specified"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-my-gold mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/70">Monthly Ad Spend</p>
                  <p className="text-green-400 font-medium text-lg">
                    {formatCurrency(jobInfos.adSpend) || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:col-span-2">
                <Globe className="h-5 w-5 text-my-gold mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white/70">Website</p>
                  {jobInfos.website ? (
                    <a
                      href={jobInfos.website.startsWith("http") ? jobInfos.website : `https://${jobInfos.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
                    >
                      {jobInfos.website}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <p className="text-white/80">Not provided</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div>
            <h3 className="text-my-gold text-lg font-semibold mb-3 border-b border-my-gold/30 pb-1">
              Additional Information
            </h3>
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-my-gold mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white/70">Most Important Question</p>
                <p className="text-white bg-my-dark-blue/50 p-3 rounded-md border border-my-gold/20 mt-1">
                  {jobInfos.question || "No question provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-my-gold text-my-tin hover:bg-my-gold hover:text-my-dark-blue "
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

