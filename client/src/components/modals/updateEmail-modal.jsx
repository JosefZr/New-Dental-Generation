import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTitle, DialogContent, DialogFooter, DialogHeader } from "../../components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/useModalStore";
import { updateEmail } from "@/services";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import toast from "react-hot-toast";

const formSchema = z.object({
    email: z.string().email("Invalid email address").min(1, {
      message: "Email is required",
    }),
  });

export default function UpdateEmailModal() {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "updateEmail";
  const {user,setUser} = useContext(UserContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "", // Make sure this matches the input name
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      if (user?._id) {
        const updatedUserEmail = await updateEmail(user._id,values.email);
        if(updatedUserEmail?.success){
          setUser(updatedUserEmail.data)
          toast.success(updatedUserEmail.message)
        }
        else // Show the error message if the success flag is false
        toast.error(updatedUserEmail.message || "Failed to update email");
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
            Change your Email
          </DialogTitle>
        </DialogHeader>
        <div className="mt-3"></div>
        <Form {...form} className="dialog-body m-3 overflow-y-auto overflow-x-hidden bg-neutral lg:m-4 swipe-dialog-scroll-descendant flex flex-col">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-3 px-4">
              <FormField 
                control={form.control} 
                name="email" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-my-white-gray">
                      email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="input bg-slate-400 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        style={{ background: "white", color: "black" }}
                        placeholder="Enter new email"
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
                Update Email
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}