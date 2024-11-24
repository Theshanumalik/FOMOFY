"use client";
import PopupScript from "@/app/(landing-page)/_components/popup-script";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

type PopupPreviewProps = {
  projectId: string;
  className?: ClassValue;
};

const PopupPreview = ({ projectId, className }: PopupPreviewProps) => {
  const [showPopups, setShowPopups] = useState(false);
  const [replayCounter, setReplayCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const togglePopups = () => {
    if (showPopups) {
      setReplayCounter((prev) => prev + 1);
    } else {
      setShowPopups(true);
    }
  };

  return (
    <>
      <button
        onClick={togglePopups}
        className={cn("btn btn-secondary my-3 disabled:opacity-50", className)}
      >
        {isLoading ? (
          <div className="loading loading-spinner loading-md"></div>
        ) : (
          <FaPlay />
        )}{" "}
        {showPopups ? "Replay" : "Preview"}
      </button>
      {showPopups && (
        <PopupScript
          isAppend={showPopups}
          projectId={projectId}
          replayKey={replayCounter}
          setLoading={(state) => setIsLoading(state)}
        />
      )}
    </>
  );
};

export default PopupPreview;
