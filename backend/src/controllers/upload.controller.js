import fs from "fs";
import  { uploadFile } from "../services/storage.service.js";

const uploadImageController = async(req, res) => {
    try{
    const result = await uploadFile(req.file.path);

    fs.unlinkSync(req.file.path);
    res.status(200).json({
        success: true,
        imageUrl: result.secure_url,
        publicId: result.public_id
    })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {uploadImageController};