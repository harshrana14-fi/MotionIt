import cloudinary from "../config/cloudinary.js";

export const uploadFile = async (
    filePath,
    folder,
    resourceType = "auto"
) => {

    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder,
            resource_type: resourceType,
        });

        return result;

    } catch (error) {

        throw new Error("Cloudinary upload failed.");

    }

};