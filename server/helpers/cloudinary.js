import cloudianry from "cloudinary"

// configure it 

cloudianry.config({
    cloud_name:"dmbqu5vfl",
    api_key:"394158479463128",
    api_secret:"BN9jqvr7bJ7mi1jUBG9zpVxohPs"
});

export const uploadMediaToCloudinary=async(filePath)=>{
    try {
        const result = await cloudianry.uploader.upload(filePath,{
            resource_type:"auto",
        })
        return result
    } catch (error) {
        console.log(error)
        throw new Error("Error uploading to cloudinary")
    }
}
export const deleteMediaFromCloudinary = async(publicId)=>{
    try {
        await cloudianry.uploader.destroy(publicId)
    } catch (error) {
        console.log(error)
        throw new Error("failed to delete assets from cloudinary")
    } 
}

