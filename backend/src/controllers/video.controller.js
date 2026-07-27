// backend/src/controllers/video.controller.js

import { generateVideoService } from "../services/video.service.js";


export const generateVideoController = async (req,res)=>{

    try{

        const {
            imageUrl,
            audioUrl
        } = req.body;


        if(!imageUrl || !audioUrl){

            return res.status(400).json({
                success:false,
                message:"imageUrl and audioUrl are required"
            });

        }


        const result = await generateVideoService(
            imageUrl,
            audioUrl
        );


        return res.status(200).json(result);


    }catch(error){

        console.error(
            "Video Controller Error:",
            error.message
        );


        return res.status(500).json({
            success:false,
            message:"Failed to generate video"
        });
    }
};