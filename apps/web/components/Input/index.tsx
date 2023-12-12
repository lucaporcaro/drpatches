type Props = {
  disabled?: boolean;
  value?: string;
  label?: string;
  onChange(value: string): void;
};
export default function Input({
  disabled = false,
  onChange,
  label,
  value,
}: Props) {
  return (
    <div className="w-full h-max flex flex-col items-start justify-start gap-2">
      <span className="font-semibold text-black text-xl">{label}</span>
      <input
        type="{{$this->type}}"
        value={value}
        disabled={disabled}
        className="w-full h-10 text-black outline-none bg-white flex items-center justify-start px-3 rounded-xl"
        onChange={({ currentTarget: { value } }) => onChange(value)}
      />
    </div>
  );
}
