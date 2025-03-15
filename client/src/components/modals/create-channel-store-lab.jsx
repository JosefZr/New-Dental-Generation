import { useContext, useState } from "react";
import {Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle} from "@/components/ui/dialog";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} 
from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { useModal, MODAL_TYPE } from "@/hooks/useModalStore";
import { UserContext } from "@/context/UserContext";
import { createStoreAndLabChannel } from "@/services";
import toast from "react-hot-toast";

export default function CreateChannelStoreModal() {
    const { user } = useContext(UserContext);
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === MODAL_TYPE.CREATE_STORE;

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values) => {
        setIsLoading(true);

        const value = {
            title: values.name,
            description: "",
            type: "control",
            allowedUsers: user.role,
            locked: false,
            owner:user._id
        };

        try {
            const response = await createStoreAndLabChannel(value)
            if(response?.success){
                toast.success("Channel created successfully");
                onClose();
            }
            else{
                toast.error(response.message);

            }

        } catch (error) {
            console.error("Error creating channel:", error.message);
        } finally {
            setIsLoading(false); // Hide loading spinner
        }
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center">Create {user?.role}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-8 px-6">
                        {/* Channel Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                                        Channel Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                            placeholder="Enter channel name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Channel Type */}
                        {/* <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Channel Type</FormLabel>
                                    <FormControl>
                                        <select
                                            {...field}
                                            disabled={isLoading}
                                            className="w-full p-2 bg-zinc-300/50 border-0 focus:ring-2 focus:ring-blue-500 text-black rounded-md"
                                        >
                                            <option value="" disabled>
                                                Select an option
                                            </option>
                                            <option value="store">Store</option>
                                            <option value="labe">Labe</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                    </div>
                    {/* Footer with Submit Button */}
                    <DialogFooter className="bg-gray100 px-6 py-4">
                        <Button type="submit" variant="primary" disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg
                                        className="animate-spin h-4 w-4 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Creating...
                                </span>
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
);
}
