import { useContext, useState } from "react";
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
import { useCreateChannel } from "@/hooks/channels/userCreateChannel";
import EmojiPicker from "emoji-picker-react"; // Emoji Picker Library

export default function CreateChannelModal() {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === MODAL_TYPE.CREATE_CHANNEL;
  const { channelType } = useContext(UserContext);
  const [selectedEmoji, setSelectedEmoji] = useState("💬");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    setShowEmojiPicker(false); // Close emoji picker after selection
  };

  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const createChannel = useCreateChannel();

  const onSubmit = async (values) => {
    setIsLoading(true);

    const value = {
      title: `${selectedEmoji}| ${values.name}`,
      description: "This is a general discussion channel",
      type: "room",
      allowed: channelType, // Use the context value
      locked: false,
    };

    createChannel.mutate(value);
    handleClose(); // Close modal
    setIsLoading(false);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center">
            Create Your Channel
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              {/* Emoji Selector */}
              <div className="relative h-[300px]">
                <label className="uppercase text-xs font-bold text-zinc-500">
                  Choose an Emoji
                </label>
                <div className="flex items-center gap-4">
                  <span
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    {selectedEmoji}
                  </span>
                  <span className="text-sm text-gray-500">
                    Click to choose an emoji
                  </span>
                </div>
                {showEmojiPicker && (
                  <div className="absolute z-10 mt-2">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>

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
