"use client";

import React from "react";
import "@uploadthing/react/styles.css";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

export function FileUpload({
  onChange,
  value,
}: FileUploadProps) {
  if (value) {
    return (
      <div className="relative h-60 w-full">
        <Image fill src={value} alt="Upload" className="object-cover rounded-md"/>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={"image"}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => console.error(error.message)}
    />
  );
}