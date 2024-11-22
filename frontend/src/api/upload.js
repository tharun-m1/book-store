import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";

export const Upload = async (newFile) => {
  try {
    const cld = new Cloudinary({ cloud: { cloudName: "dmluk04z5" } });
    if (!newFile) return;

    const formData = new FormData();
    formData.append("file", newFile);
    formData.append("upload_preset", "new_preset"); // Replace with your upload preset
    formData.append("cloud_name", "dmluk04z5");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dmluk04z5/image/upload",
      formData
    );
    const imageUrl = res.data.secure_url;
    return imageUrl;
  } catch (error) {
    throw error;
  }
};
