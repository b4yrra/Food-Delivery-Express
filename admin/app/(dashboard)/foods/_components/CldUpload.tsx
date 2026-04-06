"use client";

import { useState, useEffect } from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

const preset = "food-image";

type CldUploadProps = {
  onUpload: (url: string) => void;
  currentImage?: string;
};

export const CldUpload = ({ onUpload, currentImage }: CldUploadProps) => {
  const [preview, setPreview] = useState(currentImage || "");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setPreview(currentImage || "");
    setIsUploading(false);
  }, [currentImage]);

  const onUploadImage = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info;

    if (typeof info === "object" && typeof info.secure_url === "string") {
      setPreview(info.secure_url);
      onUpload(info.secure_url);
      setIsUploading(false);
    }
  };

  return (
    <CldUploadWidget
      uploadPreset={preset}
      onSuccess={onUploadImage}
      onClose={() => setIsUploading(false)}
      options={{
        styles: {
          palette: { window: "#FFFFFF", tabIcon: "#EF4444", link: "#EF4444" },
        },
      }}
    >
      {({ open }) => (
        <div className="flex flex-col gap-2">
          {preview && !isUploading && (
            <div className="relative w-full h-55">
              <img
                src={preview}
                alt="food preview"
                className="w-full h-full object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsUploading(true);
                  document.body.style.pointerEvents = "";
                  open();
                }}
                className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-md text-white text-sm font-medium"
              >
                Change Image
              </button>
            </div>
          )}

          {(!preview || isUploading) && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                document.body.style.pointerEvents = "";
                open();
              }}
              className="border border-dashed border-gray-300 rounded-md px-4 py-2 text-sm hover:border-red-500 hover:text-red-500 transition-colors"
            >
              Upload an Image
            </button>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};
