import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTitle, DialogContent, DialogFooter, DialogHeader } from "../../components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/useModalStore";
import { updateUsername } from "@/services";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import toast from "react-hot-toast";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
});

export default function UpdateUserNameModal() {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "updateUsername";
  const {user,setUser} = useContext(UserContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      if (user?._id) {
        const updatedUser = await updateUsername(user._id, values.firstName, values.lastName);
        if(updatedUser?.success){
          setUser(updatedUser.data)
          toast.success(updatedUser.message)
        }
      } else {
        console.error("User ID is not available.");
      }
    } catch (error) {
      console.error("Failed to update username:", error);
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
            Change your Username
          </DialogTitle>
        </DialogHeader>
        <div className="mt-3"></div>
        <Form {...form} className="dialog-body m-3 overflow-y-auto overflow-x-hidden bg-neutral lg:m-4 swipe-dialog-scroll-descendant flex flex-col">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-3 px-4">
              <FormField 
                control={form.control} 
                name="firstName" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-my-white-gray">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="input bg-slate-400 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        style={{ background: "white", color: "black" }}
                        placeholder="Enter first name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
              />
              <FormField 
                control={form.control} 
                name="lastName" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-my-white uppercase text-xs font-bold ">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="input border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        style={{ background: "white", color: "black" }}
                        placeholder="Enter last name"
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
                disabled={isLoading}
              >
                Close
              </Button>
              <Button 
                className="btn btn-primary text-my-black hover:bg-my-gold hover:text-my-black" 
                disabled={isLoading}
              >
                Update Username
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}