"use client";

import { useEffect } from "react";

type PopupScriptProps = {
  projectId: string;
  isAppend: boolean;
  replayKey: number;
  setLoading?: (isLoading: boolean) => void;
};

const PopupScript = ({
  projectId,
  isAppend,
  replayKey,
  setLoading,
}: PopupScriptProps) => {
  useEffect(() => {
    if (!isAppend || !projectId) return;

    const existingScript = document.querySelectorAll(
      `script[data-popup-id="${projectId}"]`
    );
    if (existingScript.length) {
      existingScript.forEach((script) => {
        script.remove();
      });
    }

    const script = document.createElement("script");
    script.src = `${process.env.NEXT_PUBLIC_SCRIPT_POPUP}?v=${replayKey}`;
    script.crossOrigin = "";
    script.type = "module";
    script.dataset.popupId = projectId;

    if (setLoading) {
      setLoading(true);
    }

    script.onload = () => {
      if (setLoading) {
        setLoading(false);
      }
    };
    script.onerror = () => {
      if (setLoading) {
        setLoading(false);
      }
      console.error("Failed to load the popup script.");
    };

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [isAppend, projectId, replayKey]);

  return null;
};

export default PopupScript;
