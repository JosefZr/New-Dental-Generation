import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"
import { User, Mail, Building2, Phone, HelpCircle, DollarSign, Globe, Briefcase, ExternalLink } from "lucide-react"
import { Button } from "../ui/button"
import {  Clock } from "lucide-react";

// Utility function to format phone number
const formatPhoneNumber = (phoneNumber) => {
// Handle null/undefined and non-string values
  if (!phoneNumber) return "Not provided"
  // Remove all non-numeric characters
  const phoneString = String(phoneNumber)

  const cleaned = phoneString.replace(/\D/g, "")

 // Format as (XXX) XXX-XXXX if it's a 10-digit US number
 if (cleaned.length === 10) {
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
}

// Return original if it doesn't match expected format
return phoneString
}
// Add this utility function with the existing format functions
const formatDateTime = (dateString) => {
  if (!dateString) return "Not provided";
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short"
    }).format(date);
  } catch (error) {
    return "Invalid date";
  }
};
export default function WailistPreviewModal() {
  const { isOpen, onClose, type, data } = useModal()
  const isModalOpen = isOpen && type === MODAL_TYPE.WAITLIST_DETAILS

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
              <Clock className="h-5 w-5 text-my-gold mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white/70">Date & Time</p>
                <p className="text-white font-medium">
                  {formatDateTime(data?.date) || "Not provided"}
                </p>
              </div>
            </div>
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-my-gold mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/70">Full Name</p>
                  <p className="text-white font-medium">{data?.name || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-my-gold mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/70">Email Address</p>
                  <p className="text-white font-medium">{data?.email || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-my-gold mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/70">Location</p>
                  <p className="text-white font-medium">{data?.location || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-my-gold mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white/70">Phone Number</p>
                  <p className="text-white font-medium">{formatPhoneNumber(data?.number) || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details Section */}

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
                  {data?.why || "No question provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={onClose}
              className="border-my-gold text-my-black hover:bg-my-gold hover:text-my-dark-blue "
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

