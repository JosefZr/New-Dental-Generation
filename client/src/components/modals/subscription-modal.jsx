import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "../../components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";


import PaymentCardV1 from "../signup/paymentCard-v1";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

const formSchema = z
  .object({
    previewsPassword: z.string().min(6, { message: "Previous password is required" }),
    newPassword: z.string().min(6, { message: "New password is required" }),
    copyNewPassword: z.string().min(6, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.newPassword === data.copyNewPassword, {
    path: ["copyNewPassword"], // Point to the field where the error should be shown
    message: "Passwords don't match",
  });
  export const getCardData = () => {
  
    const transformDescriptionToTable = (description) => {
      // Split the description by '.' and filter out any empty strings
      return description
        .split(".")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    };
    return [
      {
        name: "Cadet",
        amount: 14.5,
        monthType: "cadet",
        monthButton: "",
        monthTitle: "A first step towards breaking free",
        month: transformDescriptionToTable(
          "Access to all TRW Campuses. Daily live broadcasts. Daily course updates."
        ),
      },
      {
        name: "Challenger",
        amount: 55,
        threeMonthsType: "challenger",
        threeMonthsButton: "Most Popular",
        threeMonthsTitle: "Three months to harness your power.",
        threeMonths: transformDescriptionToTable(
          "All of Cadet. Daily coin bonus. Power level boost"
        ),
      },
      {
        name: "Hero",
        amount: 150,
        yearType: "hero",
        yearButton: "save €24",
        yearTitle: "One year of complete commitment",
        year: transformDescriptionToTable(
            "Maximum daily coin bonus. Big power level boost. Exclusive chats and lessons."
            ),
        },

        ];
    };
export default function SubscriptionModal() {
  const { user } = useContext(UserContext);
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "subscription";
  const data = getCardData();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        previewsPassword: "",
        newPassword: "",
        copyNewPassword: "",
        },
    });

const handleClose = () => {
    form.reset();
    onClose();
};
return (
    <Dialog open={isModalOpen} onOpenChange={handleClose} className="border-none border-black">
    <DialogContent className="border-none rounded-none text-white p-0 overflow-hidden bg-my-dark-blue">
        <DialogHeader className="bg-slate-800 flex flex-row px-10 h-[50px] flex-shrink-0 items-center justify-between border-b border-slate-700 capitalize">
        <DialogTitle className="flex flex-1 items-center font-bold text-my-white">
            Change your Email
        </DialogTitle>
        </DialogHeader>
        <div className="mt-3 scroll-auto"></div>
            <PaymentCardV1
                isModal ={true}
                cardData={data}
                role={user.role}
                userData={user}
            />
    </DialogContent>
    </Dialog>
);
}