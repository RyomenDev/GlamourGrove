import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import conf from "../conf/conf.js";

cloudinary.config({
  cloud_name: conf.CLOUDINARY_NAME,
  api_key: conf.CLOUDINARY_KEY,
  api_secret: conf.CLOUDINARY_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // console.log("uploading");

    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
