const CLOUD_NAME = "dlrg2iwh2"; // ✅ your Cloudinary cloud name
const UPLOAD_PRESET = "unsigned_preset"; // ✅ your upload preset
// 🔼 Upload image to Cloudinary

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    return data.secure_url;
  } catch (err) {
    console.log("Upload error:", err);

    return "";
  }
};
