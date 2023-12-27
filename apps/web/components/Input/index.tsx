type Props = {
  disabled?: boolean;
  value?: string;
  label?: string;
  onChange?: (value: string) => void;
  name?: string;
  required?: boolean;
  type?: string;
};

export default function Input({
  disabled = false,
  onChange,
  label,
  value,
  name,
  required = false,
  type = "text",
}: Props) {
  return (
    <div className="w-full h-max flex flex-col items-start justify-start gap-2">
      <span className="font-semibold text-black text-xl">{label}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        name={name}
        className="w-full h-10 text-black outline-none bg-white flex items-center justify-start px-3 rounded-xl"
        required={required}
        onChange={
          onChange
            ? ({ currentTarget: { value } }) => onChange(value)
            : undefined
        }
      />
    </div>
  );
}
