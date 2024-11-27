import express from 'express'
import multer from "multer"

import {uploadMediaToCloudinary, deleteMediaFromCloudinary} from "../helpers/cloudinary.js"

const router = express.Router();

const upload = multer({dest: 'uploads/'});

router.post('/upload', upload.single('file'), async(req, res)=>{
    try {
        const result = await uploadMediaToCloudinary(req.file.path);
        res.status(200).json({
            success:true,
            data:result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:'error uploading file'})
    }
})

router.delete('/delete/:id', async(req, res)=>{
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({success:false, message:'asset id is required'})
        }
        await deleteMediaFromCloudinary(id)
        res.status(200).json({
            success:true,
            message:"asset deleted succefully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:'error deleting file '})
    }
})

export default router