import { useCreateAnalysis } from "@/hooks/analyses/useCreateAnalysis"
import { useAuthUser } from "@/hooks/jwt/useAuthUser"
import { useForm } from "react-hook-form"
import styled from "styled-components"

const Text = styled.div`
  font-family: "Montserrat", sans-serif;
`

const FormContainer = styled.div`
  background-color: var(--dark-blue);
  border: 2px solid var(--dark-blue);
  box-shadow: 0 12px 400px 50px rgba(20, 35, 59, 0.3);
  border-radius: 1rem;
`

export default function FreeMarketingAnalysis() {
    const userInfo = useAuthUser();
  const userId = userInfo.userId;
  const createAnalysis = useCreateAnalysis();

  const {
    register,
    handleSubmit,
    reset, // To reset the form after successful submission
    formState: { errors },
  } = useForm();

  // Check if the user has already submitted in the last 24 hours
  const lastSubmissionTime = localStorage.getItem(`lastSubmission_${userId}`);
  const isDisabled = lastSubmissionTime 
    ? Date.now() - Number(lastSubmissionTime) < 24 * 60 * 60 * 1000 
    : false;

  const onSubmit = (data) => {
    if (isDisabled) {
      alert("You can only submit this form once every 24 hours.");
      return;
    }
    // Include userId in the submission data
    const formData = { ...data, userId };

    createAnalysis.mutate(formData, {
      onSuccess: () => {
        reset(); // Reset form after successful submission
        localStorage.setItem(`lastSubmission_${userId}`, Date.now()); // Store submission time
      },
    });
  };

  return (
    <Text className="min-h-screen bg-my-dark-blue text-gray-100 flex items-center justify-center p-4">
      <FormContainer className="w-full max-w-2xl p-8">

        {isDisabled ? (
          <p className="text-gray-400 text-xl text-center">You have already submitted the form. Please try again after 24 hours.</p>
        ) : createAnalysis.isLoading ? (
          <div className="flex flex-col items-center">
            <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-12 h-12"></span>
            <p className="mt-4 text-gray-400">Submitting your request...</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2">Receive A Free Marketing Analysis</h2>
            <p className="text-gray-400 mb-6">Fill out the form below and we will contact you within 48 hours for a free analysis.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-md font-medium text-gray-400 mb-">
                Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-full px-3 py-2 mb-1 bg-[#2a2a35] border-[1px] border-gray-600 rounded-lg focus:ring-[1px] focus:ring-black "
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-md font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-3 py-2 mb-1 bg-[#2a2a35] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500">{errors.email.message }</p>}
            </div>

            <div>
              <label htmlFor="company" className="block text-md font-medium text-gray-400 mb-1">
                Company Name
              </label>
              <input
                id="company"
                {...register("company", { required: "Company name is required" })}
                className="w-full px-3 mb-1 py-2 bg-[#2a2a35] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.company && <p className="text-red-500">{errors.company.message }</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-md font-medium text-gray-400 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                {...register("phone", { 
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone number must contain only numbers"
                  }
                })}
                className="w-full px-3 mb-1 py-2 bg-[#2a2a35] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="question" className="block text-md font-medium text-gray-400 mb-1">
                What is your most important question?
              </label>
              <textarea
                id="question"
                {...register("question", { required: "This field is required" })}
                className="w-full px-3 mb-1 py-2 bg-[#2a2a35] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              ></textarea>
              {errors.question && <p className="text-red-500">{errors.question.message}</p>}
            </div>

            <div>
              <label htmlFor="adSpend" className="block text-md font-medium text-gray-400 mb-1">
                How much are you spending on advertising / month?
              </label>
              <input
                id="adSpend"
                {...register("adSpend", { required: "This field is required" })}
                className="w-full px-3 mb-1 py-2 bg-[#2a2a35] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.adSpend && <p className="text-red-500">{errors.adSpend.message}</p>}
            </div>

            <div>
              <label htmlFor="website" className="block text-md font-medium text-gray-400 mb-1">
                What&apos;s your website?
              </label>
              <input
                id="website"
                type="url"
                {...register("website", { required: "Website is required" })}
                className="w-full px-3 mb-1 py-2 bg-[#2a2a35] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.website && <p className="text-red-500">{errors.website.message }</p>}
            </div>

            <div>
              <label htmlFor="service" className="block text-md font-medium text-gray-400 mb-1">
                Which service do you need the most?
              </label>
              <select
                id="service"
                {...register("service", { required: "Please select a service" })}
                className="w-full px-3 mb-1 py-2 bg-[#2a2a35] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a service</option>
                <option value="website">Website</option>
                <option value="marketing">Marketing</option>
                <option value="advertising">Advertising</option>
              </select>
              {errors.service && <p className="text-red-500">{errors.service.message }</p>}
            </div>

            <button
              type="submit"
              className={`mt-4 px-4 py-2 rounded-lg text-white flex items-center justify-center gap-2 ${
                isDisabled || createAnalysis.isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isDisabled || createAnalysis.isLoading} // Disable button while submitting
            >
              {createAnalysis.isLoading && (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
              )}
              {createAnalysis.isLoading ? "Sending..." : "Submit"}
            </button>
          </form>
          </>
          )}
      </FormContainer>
    </Text>
  )
}
