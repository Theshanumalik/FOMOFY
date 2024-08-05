"use client";
import { IPopup } from "@/model/Popup";
import { AnimatePresence, Reorder } from "framer-motion";
import React from "react";
import SinglePopup from "./single-popup";

type PopupContainerProps = {
  popups: IPopup[];
  setPopups: (popups: IPopup[]) => void;
  handleRemove: (popup: IPopup) => void;
};

const PopupContainer = ({
  popups,
  setPopups,
  handleRemove,
}: PopupContainerProps) => {
  return (
    <Reorder.Group values={popups} onReorder={setPopups} axis="y">
      <AnimatePresence>
        {popups.map((popup) => (
          <SinglePopup
            key={`${popup.icon}-${popup.heading}`}
            data={popup}
            onRemove={handleRemove}
          />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default PopupContainer;
