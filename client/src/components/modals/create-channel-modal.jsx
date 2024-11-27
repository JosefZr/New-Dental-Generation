import React, { useState } from "react";
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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/Select";

import { useForm } from "react-hook-form";
import { useModal, MODAL_TYPE } from "@/hooks/useModalStore";

export default function CreateChannelModal() {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === MODAL_TYPE.CREATE_CHANNEL;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      type: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    console.log(values);
    const value = {
      title: "nbi3lk w bi3li sel3a",
      description: "This is a general discussion channel",
      type: "room",
      allowed: "store",
      locked: false,
    };

    try {
      const response = await fetch("http://localhost:3000/api/v1/channels/", {
        method: "POST",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzM4ZDM0MzA4ZmY5ZTczM2VmNjJmZDciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzE3Nzc0NTAsImV4cCI6MTczMTg2Mzg1MH0.dHIhAILTwIb3qA6KWFRMz4ZJBtjVLYCVxM4MXPR6cDw",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      if (!response.ok) {
        throw new Error("Failed to create channel");
      }

      const data = await response.json();
      console.log("Channel created:", data);

      handleClose(); // Close modal
      window.location.reload(); // Refresh the page
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
          <DialogTitle className="text-2xl text-center">
            Create Your Channel
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
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Channel Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-my-black ring-offset-0 capitalize outline-none">
                          <SelectValue placeholder="Select a channel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
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
