import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useContext, useState } from "react";
import { useAddSubscription } from "@/hooks/user/useAddSubscription";
import { UserContext } from "@/context/UserContext";

export default function ExtendSubscription() {
    const [days, setDays] = useState(30);
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useContext(UserContext)
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === MODAL_TYPE.EXTEND_SUBSCRIPTION

    const addSub = useAddSubscription()
    // Function to remove a role
    const handleSubmit = async () => {
            setIsLoading(true);
            addSub.mutate({userId:user._id,days})
            setIsLoading(false);
            // onClose()
    };
  // Helper function to determine subscription status
  const getSubscriptionStatus = () => {
    const currentDate = new Date();
    const endDate = new Date(
      user?.subscriptionPlan === "freeTrial" ? user?.trialEndDate : user?.subscriptionEndDate
    );
    return currentDate > endDate ? "renew now" : "on going";
  };
    // Helper function to format dates
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      };
      const endDate = user?.subscriptionPlan === "freeTrial" ? user?.trialEndDate : user?.subscriptionEndDate;

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} className="border-none border-black">
        <DialogContent className="border-none rounded-none text-white p-0 overflow-hidden bg-my-dark-blue">
            <DialogHeader className="bg-slate-800 flex flex-row px-10 h-[50px] flex-shrink-0 items-center justify-between border-b border-slate-700 capitalize">
                <DialogTitle className="flex flex-1 items-center font-bold text-my-white">Extend Subscription for {user?.firstName} {user?.lastName}</DialogTitle>
            </DialogHeader >
                  <button className="flex items-center gap-3 p-3 text-left text-sm last:border-0 tracking-[0.015em] w-full cursor-auto px-0 pb-0">
                    <div className="flex-1">
                      <div className="mb-1 font-medium text-xs uppercase px-3 opacity-1">
                        <div className="flex items-center gap-2 ">
                          <img src="/bg-black-logo.png" alt="logo" width="32" height="32" className="rounded-full"/>
                          TRW Hero&apos;s Year Monthly
                        </div>
                      </div>
                      <div className="form-control px-3 py-3 text-xl">
                        {/* <div>Started: {formatDate(startDate)}</div> */}
                        <div>Renews: {formatDate(endDate)}</div>
                      </div>
                      <div className="flex flex-col rounded-md border border-gray-800 mt-3 rounded-t-none border-x-0 border-b-0">
                        <button className="flex items-center gap-3 border-gray-800 border-b p-3 text-left text-sm last:border-0 active:bg-info tracking-[0.015em] hover:bg-white hover:bg-opacity-10">
                          <div className="flex-1 text-xl font-bold">Overdue since {formatDate(endDate)}</div>
                          <span
                        //   onClick={()=>onOpen("subscription")}
                            className={`px-3 py-2 rounded-sm text-xl font-semibold text-center ${
                              getSubscriptionStatus() === "renew now" ? "bg-red-700" : "bg-green-700"
                            }`}
                          >
                            {getSubscriptionStatus()}
                          </span>
                        </button>
                        {
                        getSubscriptionStatus() === "renew now" ?(
                          <div className="alert !rounded-t-none flex w-full items-center justify-center rounded-md text-center text-xl">
                            Your payment is overdue since  {formatDate(endDate)}
                            <br />
                            <br />
                            Press &ldquo;Renew Now&ldquo; to pay before your subscription ends.
                          </div>
                        ):""
                      }
                      </div>
                    </div>
                  </button>
            <div className="space-y-3 px-4">
                <Input
                type="number"
                value={days}
                className="input bg-slate-400 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                min="1"
                placeholder="Number of days"
                />
                <DialogFooter className="flex flex-shrink-0 justify-end gap-3 border-slate-800 border-t p-2 md:p-4">
                    <Button 
                        className="btn btn-ghost text-my-black" 
                        disabled={isLoading}
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button 
                        className="btn btn-primary text-my-black hover:bg-my-gold hover:text-my-black" 
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        {isLoading ? 'Extending...' : 'Extend'}
                    </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
        );
    };