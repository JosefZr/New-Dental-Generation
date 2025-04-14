/* eslint-disable react/prop-types */
import { UserContext } from "@/context/UserContext";
import { uploadAvatar } from "@/services"
import { useContext, useState } from "react"
import { BsPen } from "react-icons/bs"
import styled from "styled-components"
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
const Logo = styled.div`
    background-position: center center;
    background-size: cover;
`;
const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
  border-radius: inherit;
`;
const LoadingSpinner = () => (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="animate-spin rounded-full border-4 border-solid border-gray-300 border-t-blue-600"
        style={{ width: '2.5rem', height: '2.5rem' }}
      >
        <span className="sr-only">Loading...</span>
      </div>
      <span className="absolute bottom-[-2rem] text-sm text-white">Uploading...</span>
    </div>
  );
export default function AvatarBachrounds({userInfo}) {
    const [image, setImage]= useState()
    const {user,setUser} = useContext(UserContext);
    const [isUploading, setIsUploading] = useState(false);
    const [isBackUploading, setIsBackUploading] = useState(false);


    const submitImage = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        const result = await uploadAvatar(formData)
        console.log(result)
        }
        const optimizedImageCompression = async (file) => {
            try {
              if (file.size < 200 * 1024) return file;
          
              // Compression Configuration
              const compressionOptions = {
                maxSizeMB: 0.9,
                maxWidthOrHeight: 400,
                useWebWorker: true,
                fileType: 'image/webp',
                webp: { quality: 0.75 },
                exifOrientation: true, // Keep orientation handling
                initialQuality: 0.8,
                alwaysKeepResolution: false
              };
          
              let compressedFile = await imageCompression(file, compressionOptions);
              
              // Secondary compression if needed
              if (compressedFile.size > 200 * 1024) {
                compressedFile = await imageCompression(compressedFile, {
                  ...compressionOptions,
                  maxSizeMB: 0.15,
                  webp: { quality: 0.65 }
                });
              }
          
              return compressedFile;
          
            } catch (error) {
              console.error('Compression error:', error);
              throw new Error('Image processing failed. Please try with a smaller image.');
            }
          };
          
        const onAvatarChange = async (e) => {
            if (!e.target.files?.length) return;

            try {
                setIsUploading(true);
                const originalFile = e.target.files[0];
                
                const compressedFile = await optimizedImageCompression(originalFile);
                const formData = new FormData();
                
                formData.append('image', compressedFile, `av_${Date.now()}.webp`);

        
                const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/upload/avatar?id=${user._id}`, {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
        
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Upload failed');
                  }
        
                  const data = await response.json();
                  setUser(prev => ({
                    ...prev,
                    avatar: `${data.data.avatar}?v=${Date.now()}`
                  }));
                  toast.success('Avatar updated successfully!');
        
            } catch (error) {
                console.error("Upload error:", error);
                toast.error(error.message);
            } finally {
                setIsUploading(false);
                e.target.value = ''; // Reset input

            }
        };
const onBackgroundChange = async (e)=>{
    if (!e.target.files?.length) return;

    // const selectedFile = e.target.files[0];
    // const formData = new FormData();
    // formData.append('image', selectedFile); // Append the file
    try {
        setIsBackUploading(true);
        const originalFile = e.target.files[0];
        
        const compressedFile = await optimizedImageCompression(originalFile);
        const formData = new FormData();

        formData.append('image', compressedFile, `av_${Date.now()}.webp`);

        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/upload/background?id=${user._id}`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: localStorage.getItem('token'), // Add the Authorization header
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Upload failed');
          }

        const data = await response.json();
        console.log(data.data)
        setUser(data.data)
        return data;
    } catch (error) {
        console.error("Upload error:", error);
        toast.error(error.message);
    } finally {
        setIsBackUploading(false);
        e.target.value = ''; // Reset input

    }
}
    return (
        <div>
        <section className="flex flex-col gap-4 lg:flex-row">
          {/* Avatar Section */}
          <div className="flex flex-shrink-0 flex-col items-center">
            <h3 className="mb-1 w-full p-2 font-bold text-md">Avatar</h3>
            <label
              htmlFor="avatarInput"
              className="rounded-full p-[2px] cursor-pointer"
              style={{
                backgroundImage: "linear-gradient(94.38deg, #ECC879 -14.69%, #D46B32 210%)",
              }}
            >
              <div className="group relative h-[92px] w-[92px] cursor-pointer rounded-full">
                {isUploading && (
                  <LoadingOverlay>
                    <LoadingSpinner />
                  </LoadingOverlay>
                )}
                <div className="h-[92px] w-[92px] rounded-full">
                  {user.avatar === "/default-avatar.webp" ? (
                    <Logo
                      className="h-full w-full rounded-full"
                      style={{ backgroundImage: 'url(/default-avatar.webp)' }}
                    />
                  ) : (
                    <Logo
                      className="h-full w-full rounded-full"
                      style={{ 
                        backgroundImage: `url(${import.meta.env.VITE_UPLOAD_AVATAR_URL}${user.avatar})`
                      }}
                    />
                  )}
                  <div className="absolute inset-0 hidden items-center justify-center rounded-full bg-black bg-opacity-30 group-hover:flex">
                    <BsPen style={{ width: "30px", height: "30px" }} />
                  </div>
                </div>
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={onAvatarChange}
                  disabled={isUploading}
                />
              </div>
            </label>
          </div>
  
          {/* Background Section */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="mb-1 p-2 font-bold text-md">Custom Background</h3>
            </div>
            <div className="rounded-md p-[1px]" style={{
              backgroundImage: "linear-gradient(94.38deg, #ECC879 -14.69%, #D46B32 210%)",
            }}>
              <div className="group relative h-[180px] w-full cursor-pointer overflow-hidden rounded-md bg-settings-background">
                {isBackUploading && (
                  <LoadingOverlay>
                    <LoadingSpinner />
                  </LoadingOverlay>
                )}
                {user.background === import.meta.env.VITE_DEFAULT_BG ? (
                  <Logo
                    className="h-full w-full"
                    style={{ backgroundImage: `url(${user.background})` }}
                  />
                ) : (
                  <Logo
                    className="h-full w-full"
                    style={{ 
                      backgroundImage: `url(${import.meta.env.VITE_UPLOAD_AVATAR_URL}${user.background})`
                    }}
                  />
                )}
                <div className="absolute inset-0 hidden items-center justify-center bg-black bg-opacity-30 group-hover:flex">
                  <BsPen style={{ width: "30px", height: "30px" }} />
                </div>
                <input
                  id="backgroundInput"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={onBackgroundChange}
                  disabled={isBackUploading}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }