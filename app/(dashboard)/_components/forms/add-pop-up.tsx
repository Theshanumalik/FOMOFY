"use client";
import { BiImageAdd } from "react-icons/bi";
import { ChangeEvent, useState } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { popupSchema } from "@/lib/zod-schema";
import { z } from "zod";
import { HiPlus } from "react-icons/hi2";
import Image from "next/image";
import { cn } from "@/lib/utils";

type PopupForm = z.infer<typeof popupSchema>;

type AddPopupProps = {
  onAdd: (data: PopupForm) => void;
};

const AddPopup = ({ onAdd }: AddPopupProps) => {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register,
    reset,
  } = useForm<PopupForm>({
    resolver: zodResolver(popupSchema),
  });

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const randomName = uuidv4();
      const fileExtension = file.name.split(".").pop();
      const fileName = `${randomName}.${fileExtension}`;

      setLoading(true);

      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageURL(downloadURL);
            setValue("icon", downloadURL); // Set the image URL in the form state
            setLoading(false);
          });
        }
      );
    }
  };

  const onSubmit = async (data: PopupForm) => {
    if (loading) {
      toast.error("Please wait while uploading the image.");
      return;
    }
    onAdd(data);
    setImageURL("");
    reset({
      heading: "",
      message: "",
      icon: "",
      timeago: "",
    });
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-3 flex justify-between items-center gap-3 w-full relative">
      <div
        className={cn(
          "grid place-items-center bg-slate-200 w-14 h-14 rounded-md relative",
          {
            "border border-red-500": errors.icon,
          }
        )}
      >
        <input
          type="file"
          id="icon"
          className="hidden"
          onChange={handleFileUpload}
        />
        <label htmlFor="icon" className={cn("cursor-pointer")}>
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : imageURL ? (
            <Image
              src={imageURL}
              alt="Uploaded"
              width={50}
              height={50}
              className="w-14 h-14 object-cover rounded-md"
            />
          ) : (
            <BiImageAdd />
          )}
        </label>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 gap-1 items-center"
      >
        <div className="flex flex-col flex-1">
          <Controller
            name="heading"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Heading"
                className={`border rounded-md px-3 py-1 text-sm font-semibold outline-none ${
                  errors.heading ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.heading && (
            <span className="text-red-500 text-xs">
              {errors.heading.message}
            </span>
          )}
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Message"
                className={`border rounded-md px-3 py-1 text-sm text-gray-400 resize-none outline-none ${
                  errors.message ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.message && (
            <span className="text-red-500 text-xs">
              {errors.message.message}
            </span>
          )}
        </div>

        <Controller
          name="timeago"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Now"
              className={`w-14 h-6 border rounded-full px-3 py-2 text-xs text-gray-500 text-center outline-none ${
                errors.timeago ? "border-red-500" : ""
              }`}
            />
          )}
        />
        <input type="hidden" value={imageURL} {...register("icon")} />
        <button
          type="submit"
          className="border border-primary flex items-center justify-center p-1 rounded-full my-3 disabled:cursor-not-allowed absolute -right-8 bg-primary"
          disabled={loading}
        >
          <HiPlus />
        </button>
      </form>
    </div>
  );
};

export default AddPopup;
