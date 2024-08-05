"use client";
import { IPopup } from "@/model/Popup";
import { Reorder, useDragControls } from "framer-motion";
import Image from "next/image";
import { HiOutlineTrash } from "react-icons/hi2";
import { RiDraggable } from "react-icons/ri";

type SinglePopupProps = {
  data: IPopup;
  onRemove: (popup: IPopup) => void;
};

const SinglePopup = ({ data, onRemove }: SinglePopupProps) => {
  const controls = useDragControls();
  return (
    <Reorder.Item
      value={data}
      whileDrag={{ border: "2px dashed #ccc", scaleX: 1.02 }}
      dragListener={false}
      dragControls={controls}
    >
      <div className="flex bg-white rounded-lg mb-2 items-center p-2 justify-between gap-2 shadow-md relative">
        <RiDraggable
          onPointerDown={(e) => controls.start(e)}
          className="cursor-grab text-gray-500"
          size={24}
        />
        <div>
          <Image src={data.icon} alt={data.heading} width={50} height={50} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">{data.heading}</h3>
          <p className="text-xs text-gray-500">{data.message}</p>
        </div>
        <span className="text-xs text-gray-600">{data.timeago}</span>
        <button
          className="absolute -right-8 rounded-full border border-gray-300 p-1"
          onClick={() => onRemove(data)}
        >
          <HiOutlineTrash />
        </button>
      </div>
    </Reorder.Item>
  );
};

export default SinglePopup;
