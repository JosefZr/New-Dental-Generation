import { useContext, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { useModal, MODAL_TYPE } from "@/hooks/useModalStore";
import { UserContext } from "@/context/UserContext";
import { useUpdateChannel } from "@/hooks/channels/useUpdateChannel";

export default function UpdateChannelModal() {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === MODAL_TYPE.EDIT_CHANNEL;
  const { updateChannel } = useContext(UserContext);

  const [isModified, setIsModified] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const editChannel = useUpdateChannel();

  useEffect(() => {
    // Set the input field's default value when the modal opens
    if (updateChannel?.title) {
      form.setValue("name", updateChannel.title);
      setIsModified(false); // Reset the modification state
    }
  }, [updateChannel, form]);

  const onSubmit = async (values) => {
    const value = {
      title: values.name,
    };
console.log(updateChannel._id,value.title)
    // Trigger mutation to update the channel
    editChannel.mutate({
      id: updateChannel._id,
      title: value.title,
    });

    handleClose(); // Close modal
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    form.setValue("name", newValue);

    // Check if the input value differs from the original title
    setIsModified(newValue !== updateChannel.title);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center">
            Update {updateChannel?.title} Channel
          </DialogTitle>
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
                        onChange={handleInputChange}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Footer with Submit Button */}
            <DialogFooter className="bg-gray100 px-6 py-4">
              <Button type="submit" variant="primary" disabled={!isModified}>
                {editChannel.isLoading ? (
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
                    Updating...
                  </span>
                ) : (
                  "Update"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
