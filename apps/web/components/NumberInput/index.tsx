import { FaMinus, FaPlus } from "react-icons/fa6";

type Props = {
  step?: number;
  label: string;
  unit?: string;
  min?: number;
  max?: number;
  onUpdate(v: number): void;
  value: number;
  disabled?: boolean;
};

export default function NumberInput({
  step = 1,
  label,
  unit = "",
  min = 2.5,
  max = 20,
  value,
  disabled = false,
  onUpdate,
}: Props) {
  return (
    <div className="w-full h-max flex flex-col gap-3">
      {unit || label ? (
        <div className="w-full flex items-center justify-between font-medium text-base">
          <span>{label}</span>
          <span className="text-white">{unit}</span>
        </div>
      ) : null}
      <div className="w-full h-10 flex flex-row items-center justify-center rounded-md overflow-hidden">
        <div
          className="p-2 h-full flex items-center justify-center bg-black cursor-pointer"
          onClick={() => (value - step < min ? null : onUpdate(value - step))}
        >
          <FaMinus className="text-white w-5 aspect-auto" />
        </div>
        <div className="h-full flex-auto">
          <input
            className="w-full h-full bg-white text-center outline-none border-none"
            value={value}
            type="number"
            step={step}
            min={min}
            max={max}
            onChange={({ currentTarget: { value: v } }) =>
              onUpdate(parseFloat(v))
            }
            disabled={disabled}
          />
          {/* <span className="font-medium text-base">{value}</span> */}
        </div>
        <div
          className="p-2 h-full flex items-center justify-center bg-black cursor-pointer"
          onClick={() => (value + step > max ? null : onUpdate(value + step))}
        >
          <FaPlus className="text-white w-5 aspect-auto" />
        </div>
      </div>
    </div>
  );
}
