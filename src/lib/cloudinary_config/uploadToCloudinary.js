import cloudinary from "./cloudinary.js";
export const uploadToCloudinary = (buffer, folder = "archive/posts") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            folder,
            resource_type: "auto",
        }, (error, result) => {
            if (error) {
                console.error("CLOUDINARY UPLOAD ERROR:", error);
                reject(error);
                return;
            }
            if (!result) {
                reject(new Error("Cloudinary upload failed"));
                return;
            }
            console.log("CLOUDINARY UPLOAD SUCCESS:", result.secure_url);
            resolve(result.secure_url);
        });
        stream.end(buffer);
    });
};
