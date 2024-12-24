import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTitle, DialogContent, DialogFooter, DialogHeader } from "../../components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/useModalStore";

import toast from "react-hot-toast";
import { updatePassword } from "@/services";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

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

export default function UpdatePasswordModal() {
const { isOpen, onClose, type } = useModal();
const isModalOpen = isOpen && type === "updatePassword";
const {user} = useContext(UserContext);

const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        previewsPassword: "",
        newPassword: "",
        copyNewPassword: "",
        },
    });

const isLoading = form.formState.isSubmitting;
const onSubmit = async (values) => {
    try {
        console.log("Submitted data:", values);
    if (user?._id) {
        const updatedUserEmail = await updatePassword(user._id,values.previewsPassword, values.newPassword);
        if(updatedUserEmail?.success){
            toast.success(updatedUserEmail.message)
        }
        else // Show the error message if the success flag is false
        toast.error(updatedUserEmail.message || "Failed to update password");
    }
    } catch (error) {
    console.error("Error occurred during submission:", error);
    } finally {
    onClose();
    }
};

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
        <div className="mt-3"></div>
        <Form {...form} className="dialog-body m-3 overflow-y-auto overflow-x-hidden bg-neutral lg:m-4 swipe-dialog-scroll-descendant flex flex-col">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-3 px-4">
            <FormField 
                control={form.control} 
                name="previewsPassword" 
                type="password"  // Ensure this is set to "password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-my-white-gray">
                    previews password
                    </FormLabel>
                    <FormControl>
                    <Input
                        {...field}
                        type="password"
                        className="input bg-slate-400 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        style={{ background: "white", color: "black" }}
                        placeholder="Enter previews password"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} 
            />
            <FormField 
                control={form.control} 
                name="newPassword" 
                type="password"  // Ensure this is set to "password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-my-white-gray">
                    current Email
                    </FormLabel>
                    <FormControl>
                    <Input
                        {...field}
                        type="password"
                        className="input bg-slate-400 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        style={{ background: "white", color: "black" }}
                        placeholder="Enter new password"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} 
            />
            <FormField 
                control={form.control} 
                name="copyNewPassword"  // Corrected the name to match the schema
                type="password"  // Ensure this is set to "password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-my-white-gray">
                    password
                    </FormLabel>
                    <FormControl>
                    <Input
                        {...field}
                        type="password"
                        className="input bg-slate-400 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        style={{ background: "white", color: "black" }}
                        placeholder="retype your new password"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} 
            />
            
            </div>
            <DialogFooter className="flex flex-shrink-0 justify-end gap-3 border-slate-800 border-t p-2 md:p-4">
            <Button 
                className="btn btn-ghost text-my-black" 
                onClick={handleClose} 
            >
                Close
            </Button>
            <Button 
                className="btn btn-primary text-my-black hover:bg-my-gold hover:text-my-black" 
            >
                Update password
            </Button>
            </DialogFooter>
        </form>
        </Form>
    </DialogContent>
    </Dialog>
);
}