import styled from "styled-components"

const Section = styled.section`
    background-image: url(	https://www.jointherealworld.com/campus/images/new_hero_bg.png);
    background-size: auto;
    background-position: 0px 0px;
`
const Global= styled.section`
    opacity: 1;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
     @media screen and (max-width: ${size.mobileL}) {
        padding-left: .5rem;
    padding-right: .5rem;
      } 
`
const Container= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    position: relative;
`
import "../job.css"
import { useForm } from "react-hook-form"
import { useCreateJob } from "@/hooks/job/useCreateJob"
import { size } from "@/lib/mediaQuerys"
import { useAuthUser } from "@/hooks/jwt/useAuthUser"
import useGetSubscriptionStatus from "@/hooks/limitation/useGetSubscriptionStatus"
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"

export default function Job() {
    const {onOpen} = useModal()
    const userInfo = useAuthUser();
    const userId = userInfo.userId
    const createJob = useCreateJob()
        const {
            register,
            handleSubmit,
            reset, // To reset the form after successful submission
            formState: { errors },
        } = useForm();
        // Check if the user has already submitted in the last 24 hours
        const lastSubmissionTime = localStorage.getItem(`lastJobSubmission_${userId}`);
        const isDisabled = lastSubmissionTime 
        ? Date.now() - Number(lastSubmissionTime) < 24 * 60 * 60 * 1000 
        : false;
        const status = useGetSubscriptionStatus()

        const onSubmit = (data) => {
            if(status ==="off"){
                onOpen(MODAL_TYPE.LIMITATION_MODAL)
            }
            else{
                // Include userId in the submission data
                const formData = { ...data, userId };
                createJob.mutate(formData, {
                    onSuccess: () => {
                        reset(); // Reset form after successful submission
                        localStorage.setItem(`lastJobSubmission_${userId}`, Date.now()); // Store submission time
                    },
                });
            }
            
        };
    return (
    <Section>
        <Global>
            <Container >
                <div 
                    className="hero_component blue-bg-glow crypto"
                    style={{
                        opacity: "1",
                        transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        transformStyle: "preserve-3d"
                    }}  
                ><h1 className="h11 text-color-silver mobile-hidden">
                    Find Your Next Career Opportunity !
                </h1>
                <div className="flex flex-col gap-4 py-8">
                    <div className="text-[1.75rem]" style={{
                            fontFamily: "Urbanist, serif",
                            lineHeight:"1.5rem"
                    }}>
                        Finally, You’ve got your diploma, Now you have to use it. 
                    </div>
                    <div className="text-[1.75rem]" style={{
                            fontFamily: "Urbanist, serif",
                            lineHeight:"1.5rem"
                    }}>
                        Otherwise, <span className="font-bold"> YOUR DIPLOMA HAS NO VALUE</span>. 
                    </div>
                    <div className="text-[1.75rem]" style={{
                            fontFamily: "Urbanist, serif",
                            lineHeight:"1.5rem"
                    }}>
                        If You Want Other Dentist Finds you and hire you 
                    </div>
                </div>
                </div>
                    {isDisabled ? (
                        <p className="h22 is-18-ch mobile-hidden crypto">You have already submitted for a Job. Please try again after 24 hours.</p>
                        ) : createJob.isLoading ? (
                            <div className="flex flex-col items-center">
                            <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-12 h-12"></span>
                            <p className="mt-4 text-gray-400">Submitting your request...</p>
                            </div>
                        ) : (
                        <>
                        <div className="h22 is-18-ch mobile-hidden crypto">Post your Job Listing Now !  </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-2xl">
                        <div>
                        <label htmlFor="name" className="block text-md font-medium text-gray-400 mb-1">
                            Full Name
                        </label>
                        <input
                            id="name"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-3 py-2 mb-1 bg-[#2a2a35] border-[1px] border-gray-600 rounded-lg focus:ring-[1px] focus:ring-black"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>

                        <div>
                        <label htmlFor="gender" className="block text-md font-medium text-gray-400 mb-1">
                            Gender (male | Female)
                        </label>
                        <select
                            id="gender"
                            {...register("gender", { required: "Gender is required" })}
                            className="w-full px-3 py-2 mb-1 bg-[#2a2a35] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select gender</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                        {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
                        </div>

                        <div>
                        <label htmlFor="age" className="block text-md font-medium text-gray-400 mb-1">
                            Your Age
                        </label>
                        <input
                            id="age"
                            type="number"
                            {...register("age")}
                            className="w-full px-3 py-2 mb-1 bg-[#2a2a35] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
                        </div>

                        <div>
                        <label htmlFor="location" className="block text-md font-medium text-gray-400 mb-1">
                            Your Location
                        </label>
                        <input
                            id="location"
                            type="text"
                            {...register("location")}
                            className="w-full px-3 py-2 mb-1 bg-[#2a2a35] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                        </div>

                        <div>
                        <label htmlFor="diploma" className="block text-md font-medium text-gray-400 mb-1">
                            When you&lsquo;ve got your diploma?
                        </label>
                        <input
                            id="diploma"
                            type="text"
                            {...register("diploma")}
                            className="w-full px-3 py-2 mb-1 bg-[#2a2a35] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.diploma && <p className="text-red-500">{errors.diploma.message}</p>}
                        </div>

                        <div>
                        <label htmlFor="experience" className="block text-md font-medium text-gray-400 mb-1">
                            Do you have any experience?
                        </label>
                        <textarea
                            id="experience"
                            {...register("experience")}
                            className="w-full px-3 py-2 mb-1 bg-[#2a2a35] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={3}
                        ></textarea>
                        {errors.experience && <p className="text-red-500">{errors.experience.message}</p>}
                        </div>

                        <div>
                        <label htmlFor="whyJob" className="block text-md font-medium text-gray-400 mb-1">
                            Why you want to apply for a job?
                        </label>
                        <textarea
                            id="whyJob"
                            {...register("whyJob")}
                            className="w-full px-3 py-2 mb-1 bg-[#2a2a35] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={3}
                        ></textarea>
                        {errors.whyJob && <p className="text-red-500">{errors.whyJob.message}</p>}
                        </div>

                        <button
                        type="submit"
                        className={`mt-4 px-4 py-2 rounded-lg text-white flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600`}
                        disabled={createJob.isLoading}
                        >
                        {createJob.isLoading && (
                            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                        )}
                        {createJob.isLoading ? "Sending..." : "Submit"}
                        </button>
                        </form>
                        </>
                        )}

            <div className="p-24 is-opport mobile-hidden text-[2rem] max-md:text-[1.3rem]" 
                style={{
                    fontFamily:"Urbanist, serif"
                }}>
                    Now, You Just did The First Step towards your success, 
                    You gotta do the second step “ Go to the local chats and Build New connections yourself, and try to get connected with many other dentists’’ 
            </div>
            <h3 className="h3-timeline text-[2rem] text-center">‘’Luck Isn’t Real… Make Your OWN Luck’’ Dr.Truth </h3>
            <h3 className="h3-timeline text-[2rem] text-center">What about The 3rd Step !? </h3>
            <div className="p-24 is-opport mobile-hidden text-[2rem] max-md:text-[1.3rem]" 
                style={{
                    fontFamily:"Urbanist, serif"
                }}>
                    Be LoYAL To The Platform that changed your life, after 3 months you’ll unlock The Business Secrets Module and once you do that, You will Be The Guy That Makes Money from The Sky. 
            </div>
            </Container>
            
        </Global>
    </Section>
  )
}
