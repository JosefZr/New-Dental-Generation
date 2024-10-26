import {Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Select,SelectItem, SelectTrigger, SelectContent, SelectValue} from "@/components/ui/Select"

import { useForm } from "react-hook-form"

import { useModal,MODAL_TYPE } from "@/hooks/useModalStore"


export default function CreateChannelModal() {
    const {isOpen, onClose, type} = useModal();
    const isModalOpen = isOpen && type === MODAL_TYPE.CREATE_CHANNEL;



    const form = useForm({
        defaultValues: {
            name: "",
            Channeltype:"",
        }
    })
    const isLoading = form.formState.isSubmitting;
    const onSubmit =(values)=> console.log(values)

    const handleClose = ()=>{
        form.reset()
        onClose()
    }
    return (
        <Dialog open ={isModalOpen} onOpenChange={handleClose}>
            <DialogTrigger asChild>
                {/* <Button variant="outline" className="text-black">create server</Button> */}
            </DialogTrigger>
            <DialogContent className = "bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        create ur channel
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className=" space-y-8 px-6">
                            <FormField control ={form.control} name="name" render={({field})=>(
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 ">
                                        channel name
                                    </FormLabel>
                                    <FormControl >
                                        <Input {...field} className=" bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" placeholder = "Enter channel name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="type" render={({field})=>(
                                <FormItem>
                                    <FormLabel>Channel Type</FormLabel>
                                    <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-my-black ring-offset-0 capitalize outline-none">
                                                <SelectValue placeholder="Select a channel type"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* here we will fetch all the channel types we have  */}
                                            {/* {object.value(Channeltype).map((type)=>(
                                                <SelectItem key={type} value={type} className="capitalize">
                                                    {type.toLowerCase()}
                                                </SelectItem>
                                            ))} */}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )} />
                        </div>
                        <DialogFooter className="bg-gray100 px-6 py-4">
                            <Button variant="primary" disabled={isLoading}>create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
