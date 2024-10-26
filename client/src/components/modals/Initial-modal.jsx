import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { useForm } from "react-hook-form"


export default function IlnitialModal() {
    const form = useForm({
        defaultValues: {
            name: "",
            imageUrl:""
        }
    })
    const isLoading = form.formState.isSubmitting;
    const onSubmit =(values)=> console.log(values)
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline" className="text-black">create server</Button>
            </DialogTrigger>
            <DialogContent className = "bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        create ur server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        give ur server a personality with a name an image. you can always change it later
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className=" space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                TODO: Image Upload
                            </div>
                            <FormField control ={form.control} name="name" render={({field})=>(
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 ">
                                        server name
                                    </FormLabel>
                                    <FormControl >
                                        <Input {...field} className=" bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" placeholder = "Enter server name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>

                                </FormItem>
                            )}/>
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
