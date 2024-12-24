import { UserContext } from "@/context/UserContext";
import { updateDescription } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


const formSchema = z.object({
    description: z.string().describe("Invalid email address").max(200, {
      message: "max 200 characters",
    }),
  });
  

export default function Bio() {
    const { user, setUser } = useContext(UserContext);
    const [bio, setBio] = useState(user?.bio || ""); // Initial bio state
    const [isEditing, setIsEditing] = useState(false);
    const [isModified, setIsModified] = useState(false); // Tracks if the bio is modified
    const handleInputChange = (e) => {
        setBio(e.target.value);
        setIsModified(e.target.value !== user?.bio); // Compare with initial value
      };
      
       // Handle form submission
      const onSubmit = async () => {
        try {
          const updatedUserDescription = await updateDescription(user._id, bio);
          if (updatedUserDescription?.success) {
            setUser(prevUser => ({
              ...prevUser,
              bio: updatedUserDescription.data.description,
            }));
            setIsModified(false); // Reset modification state
            toast.success(updatedUserDescription.message);
          } else {
            toast.error(updatedUserDescription.message || "Failed to update bio");
          }
          setIsEditing(false);
        } catch (error) {
          console.error("Failed to update bio", error);
          toast.error("An error occurred while updating your bio.");
        }
      };
         // Initialize form with user's existing description
  const { 
    reset, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: user.bio
    }
  });
  // Update default values if the user's bio changes
useEffect(() => {
    if (user?.bio) {
      reset({ description: user.bio });
    }
  }, [user.bio, reset]);
    return (
        <div>
            <div
        className="rounded-md p-[1px]"
        style={{
          backgroundImage:
            "linear-gradient(94.38deg, #ECC879 -14.69%, #D46B32 210%)",
        }}
      >
        <div
          className="w-full rounded-md"
          style={{
            backgroundColor: "rgb(7 13 20)",
          }}
        >
              <textarea
                maxLength={200}
                defaultValue={bio}
                onChange={handleInputChange}

                placeholder="Write something about yourself..."
                className="w-full h-[134px] border-none resize-none rounded-md p-3 bg-black text-white border border-gray-700 outline-none"
              />
              {errors.description && (
                <p className="text-red-500 p-2">
                  {errors.description.message}
                </p>
              )}
              
              </div>
          
      </div>
      <p>
        <button 
          className={`btn ${
            isModified
              ? "bg-my-gold text-my-black hover:opacity-80 hover:bg-amber-300"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          onClick={onSubmit}
          disabled={!isModified} // Disable if not modified
          >save</button>
      </p>
        </div>
    )
    }
