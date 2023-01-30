import { useEffect, useState } from "react";
import { fetchAvatarData, uploadAvtarData } from "@lib/avatar_fns";

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path) => {
    try {
      const { data, error } = await fetchAvatarData(path);
      if (error) {
        throw error;
      }
      console.log("downloadImage_data: ", data);
      const url = URL.createObjectURL(data);
      console.log("downloadImage_url: ", url);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await uploadAvtarData(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      console.log("uploadAvatar_filePath: ", filePath);

      onUpload(filePath);
    } catch (error) {
      console.log("Error uploading image: ", error.message);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="relative flex flex-col justify-start items-center p-4 mx-auto"
      aria-live="polite"
    >
      <label className="cursor-pointer w-32 h-32" htmlFor="single">
        <img
          src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
          alt={avatarUrl ? "Avatar" : "No image"}
          className="rounded-full"
        />
      </label>

      {uploading ? (
        <p className="mt-2 mb-6">Uploading...</p>
      ) : (
        <>
          <label
            className="cursor-pointer block my-4 font-medium"
            htmlFor="single"
          >
            <span className="sr-only">Choose profile photo</span>
            Upload an avatar
          </label>
          <div className="relative invisible">
            <input
              type="file"
              id="single"
              className="w-1 h-1 absolute"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </div>
        </>
      )}
    </div>
  );
}
