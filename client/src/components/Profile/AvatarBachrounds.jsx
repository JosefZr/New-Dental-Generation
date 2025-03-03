/* eslint-disable react/prop-types */
import { UserContext } from "@/context/UserContext";
import { uploadAvatar } from "@/services"
import { useContext, useState } from "react"
import { BsPen } from "react-icons/bs"
import styled from "styled-components";
const Logo = styled.div`
    background-position: center center;
    background-size: cover;
`;

export default function AvatarBachrounds({userInfo}) {
    const [image, setImage]= useState()
    const {user,setUser} = useContext(UserContext);
    
    const submitImage = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        const result = await uploadAvatar(formData)
        console.log(result)
        }
        
const onAvatarChange = async (e) => {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', selectedFile); // Append the file
    // formData.append('id', userInfo._id); // Append the user ID

    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/upload/avatar?id=${user._id}`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: localStorage.getItem('token'), // Add the Authorization header
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to upload avatar: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data.data)
        setUser(data.data)
        return data;
    } catch (error) {
        console.error("Error uploading avatar:", error);
    }
};
const onBackgroundChange = async (e)=>{
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', selectedFile); // Append the file
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/upload/background?id=${user._id}`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: localStorage.getItem('token'), // Add the Authorization header
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to upload avatar: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data.data)
        setUser(data.data)
        return data;
    } catch (error) {
        console.error("Error uploading avatar:", error);
    }
}


    return (
        <div>
        <section className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-shrink-0 flex-col items-center">
            <h3 className="mb-1 w-full p-2 font-bold text-md">Avatar</h3>
            <label
            htmlFor="fileInput"
            className="rounded-full p-[2px]  cursor-pointer"
            style={{
                backgroundImage:
                "linear-gradient(94.38deg, #ECC879 -14.69%, #D46B32 210%)",
            }}
            >
            <div className="group relative h-[92px] w-[92px] cursor-pointer rounded-full">
                <div className="h-[92px] w-[92px] rounded-full">
                {user.avatar === import.meta.env.VITE_DEFAULT_AVATAR?
                (<Logo
                    className="h-full w-full rounded-full"
                    style={{ backgroundImage: `url(${import.meta.env.VITE_DEFAULT_AVATAR})` }}
                />):(
                    (<Logo
                        className="h-full w-full rounded-full"
                        style={{ backgroundImage: `url(${import.meta.env.VITE_UPLOAD_AVATAR_URL}${user.avatar}` }}
                    />)

                )}
                <div className="absolute inset-0 hidden items-center justify-center rounded-full bg-black bg-opacity-30 group-hover:flex">
                    <BsPen style={{ width: "30px", height: "30px" }} />
                </div>
                </div>
                <form onSubmit={submitImage}>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={onAvatarChange}
                />
                </form>
            </div>
            </label>
        </div>
        <div className="flex-1">
            <div className="flex items-center justify-between">
                <h3 className="mb-1 p-2 font-bold text-md">Custom Background</h3>
            </div>
            <div className="rounded-md  p-[1px]" style={{
                backgroundImage:
                "linear-gradient(94.38deg, #ECC879 -14.69%, #D46B32 210%)",
            }}>
                <div className="group relative h-[180px] w-full cursor-pointer overflow-hidden rounded-md bg-settings-background">
               { user.background ===import.meta.env.VITE_DEFAULT_BG ?(
                <Logo
                    className="h-full w-full "
                    style={{ backgroundImage: `url(${user.background})`}}
                />):(
                    <Logo
                    className="h-full w-full "
                    style={{ backgroundImage: `url(${import.meta.env.VITE_UPLOAD_AVATAR_URL}${user.background})`}}
                />
                )}
                <div className="absolute inset-0 hidden items-center justify-center  bg-black bg-opacity-30 group-hover:flex">
                    <BsPen style={{ width: "30px", height: "30px" }} />
                </div>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={onBackgroundChange}

                />
                </div>
            </div>
        </div>
        </section>
    </div>
    )
}
