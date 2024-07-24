import { twMerge } from "tailwind-merge";

type ColorPickerProps = {
  colors: string[];
  selectedColor: string | undefined;
  onChange: (color: string) => void;
};

const ColorPicker = ({ colors, selectedColor, onChange }: ColorPickerProps) => {
  return (
    <div>
      <div className="flex gap-2 w-full border rounded-md my-2 p-1">
        <span
          className="block rounded-md px-3 py-1 text-gray-700"
          style={{
            backgroundColor: selectedColor,
          }}
        >
          #
        </span>
        <input
          type="text"
          className="w-full outline-none border-none"
          placeholder="Select color px-2 py-2"
          onChange={(e) => onChange("#" + e.target.value)}
          value={selectedColor?.replace("#", "")}
        />
      </div>
      <div className="flex gap-1">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={twMerge(
              "rounded-md w-8 h-8 border",
              selectedColor === color ? "border-black" : "border-gray-400"
            )}
            type="button"
            style={{ backgroundColor: color }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
