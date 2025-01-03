import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { recoverPassword, updatePassword } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { z } from "zod";

const Back = styled.div`
    background-image: url("https://app.jointherealworld.com/assets/matrix-bg-bw-hYk5JvoA.jpg");
`;
const formSchema = z
    .object({
        newPassword: z.string().min(6, { message: "New password is required" }),
        copyNewPassword: z.string().min(6, { message: "Password confirmation is required" }),
    })
    .refine((data) => data.newPassword === data.copyNewPassword, {
        path: ["copyNewPassword"], // Point to the field where the error should be shown
        message: "Passwords don't match",
    });

export default function ResetPassword() {
const {token} = useParams();
const navigate = useNavigate()
const user = jwtDecode(token);

const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        newPassword: "",
        copyNewPassword: "",
        },
    });
    const onSubmit = async (values) => {
        try {
            console.log("Submitted data:", values);
            console.log(user.id)
        if (user?.id) {
            const updatedUserEmail = await recoverPassword(user.id, values.newPassword);
            if(updatedUserEmail?.success){
                toast.success(updatedUserEmail.message)
                navigate("/login")
            }
            else // Show the error message if the success flag is false
            toast.error(updatedUserEmail.message || "Failed to update password");
        }
        } catch (error) {
        console.error("Error occurred during submission:", error);
        } 
    };
    return (
        <section className="absolute inset-0 flex flex-col">
        <div className="relative flex-1">
        <div className="absolute inset-0 bg-black">
            <Back
            style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
            className="pointer-events-none absolute inset-0 opacity-40 grayscale"
            ></Back>
            <div className="absolute inset-0 max-h-[100vh] overflow-y-auto pt-inset-top pb-inset-bottom flex flex-col items-center justify-between">
            <div className="flex flex-col items-center">
                <img
                src="https://app.jointherealworld.com/icons/logo-512.png"
                alt="logo"
                className="mx-auto mt-[30%] h-[256px] max-h-[35vh] w-auto"
                />
                <h2 className="mt-[10%] text-center font-bold text-[30px] text-white uppercase">
                The Real World
                </h2>
            </div>
            <div className="w-full max-w-[500px] p-8">
                <div className="relative z-10 mx-auto mt-2 flex max-w-[500px] flex-col overflow-auto rounded-xl bg-base-100 p-6 shadow-lg ">
                <div className="w-full max-w-[95vw] text-center md:max-w-md">
                    
                    <Form {...form} className="dialog-body m-3 overflow-y-auto overflow-x-hidden bg-neutral lg:m-4 swipe-dialog-scroll-descendant flex flex-col">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-2 px-2 text-left">
                        
                        <FormField 
                            control={form.control} 
                            name="newPassword" 
                            type="password"  // Ensure this is set to "password"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase text-xs font-bold text-my-white-gray">
                                new password
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
                                retype password
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
                        {/*  */}
                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button
                        type="submit"
                        className="btn btn-no-effects hover:bg-my-gold hover:opacity-80 relative  btn-primary w-full"
                      >
                        Send 
                      </button>
                    </div>
                    </form>
                    </Form>
                </div>
               
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
    )
}
