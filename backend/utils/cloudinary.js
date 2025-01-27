const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECERT
});

const uploadCloudinary = async (filePath) => {
    try {
        if (!filePath) return res.send({ messag: "no file path found", success: false });

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        });

        fs.unlinkSync(filePath)
        return response;

    } catch (error) {
        fs.unlinkSync(filePath);
        console.log("error while uploading file to cloudinary", error);
    }
}

module.exports = uploadCloudinary;