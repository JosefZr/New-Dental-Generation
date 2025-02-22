import { UserContext } from "@/context/UserContext";
import { useContext } from "react";


export default function useGetSubscriptionStatus() {
    const {user} = useContext(UserContext)

        const currentDate = new Date();
        const endDate = new Date(
        user.subscriptionPlan === "freeTrial" ? user.trialEndDate : user.subscriptionEndDate
        );
        return currentDate > endDate ? "off" : "on";

}
