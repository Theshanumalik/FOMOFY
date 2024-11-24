"use client";
import PopupContainer from "@/app/(dashboard)/_components/dnd/popup-container";
import AddPopup from "@/app/(dashboard)/_components/forms/add-pop-up";
import PopupPreview from "@/app/(dashboard)/_components/popup-preview";
import { IPopup } from "@/model/Popup";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft, FaClipboard, FaSave } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

const ManagePopups = () => {
  const params = useParams<{ id: string }>();
  const [popups, setPopups] = useState<IPopup[]>([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [embedCode, setEmbedCode] =
    useState(`<script type="module" data-popup-id="${params.id}" crossorigin src="https://popup-embed.vercel.app/assets/index-c5ae2c2e.js"></script>
   `);
  const router = useRouter();

  const handleAddPopup = (popup: IPopup) => {
    setPopups((prev) => [...prev, popup]);
  };
  const handleRemovePopup = (popup: IPopup) => {
    setPopups((prev) => prev.filter((p) => p.icon !== popup.icon));
  };

  useEffect(() => {
    axios
      .get("/api/pop-up/", {
        params: { projectId: params.id },
      })
      .then((res) => {
        setPopups(res.data.data.popups);
        setProjectTitle(res.data.data.title);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [params.id]);

  const handlePopupUpdate = () => {
    toast.promise(
      (async () => {
        const res = await axios.put("/api/pop-up/", popups, {
          params: { projectId: params.id },
        });

        return res.data;
      })(),
      {
        error: "Failed to update popups.",
        success: "Popups updated successfully.",
        loading: "Saving changes..",
      }
    );
  };

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    toast.success("Embed code copied to clipboard.");
  };
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between bg-white shadow-sm mb-3 p-2 border rounded-md">
        <button
          className="p-3 rounded-full"
          onClick={() => {
            router.back();
          }}
        >
          <FaArrowLeft />
        </button>
        <h3 className="text-md font-semibold flex-1">{projectTitle}</h3>
        <Link href={"/project/edit/" + params.id} className="px-4">
          <FaGear />
        </Link>
      </div>
      <PopupContainer
        popups={popups}
        handleRemove={handleRemovePopup}
        setPopups={(popups) => setPopups(popups)}
      />
      <AddPopup onAdd={handleAddPopup} />
      <div className="flex gap-2 w-full">
        <button
          onClick={handlePopupUpdate}
          className="btn btn-primary my-3 disabled:opacity-50"
        >
          <FaSave /> Save Changes
        </button>
        <PopupPreview projectId={params.id} />
      </div>
      <div>
        <div className="mockup-code bg-white shadow-sm border relative">
          <button
            type="button"
            className="absolute top-3 right-3"
            onClick={copyEmbedCode}
          >
            <FaClipboard />
          </button>
          <pre>
            <code>{embedCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ManagePopups;
