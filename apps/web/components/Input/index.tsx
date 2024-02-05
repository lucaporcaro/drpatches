/** @format */

"use client";

type Props = {
  disabled?: boolean;

  value?: string;
  label?: string;
  onChange?: (value: string) => void;
  name?: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
  }[];
  containerClassName?: string;
  style?: Record<string, any>;
};

export default function Input({
  disabled = false,
  onChange,
  label,
  value,
  name,
  defaultValue = "",
  required = false,
  type = "text",
  placeholder,
  options = [],
  containerClassName = "",
  style = {},
}: Props) {
  return (
    <div
      className={[
        "w-full h-max flex flex-col items-start justify-start gap-2 text-black",
        containerClassName,
      ].join(" ")}>
      <span className='font-semibold md:text-xl'>{label}</span>
      {type === "textarea" ? (
        <textarea
          value={value}
          disabled={disabled}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className='w-full h-32 p-3 outline-none bg-white flex items-center justify-start px-3 rounded-xl'
          required={required}
          onChange={
            onChange
              ? ({ currentTarget: { value } }) => onChange(value)
              : undefined
          }
        />
      ) : type === "select" ? (
        <select
          className='w-full h-8 text-black font-semibold px-4 rounded-md text-sm'
          name={name}
          disabled={disabled}
          defaultValue={defaultValue}
          required={required}
          value={value}
          onChange={
            onChange
              ? ({ currentTarget: { value } }) => onChange(value)
              : undefined
          }>
          {options.map((option) => (
            <option
              key={`option_${label ?? ""}_${option.value}`}
              value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          disabled={disabled}
          name={name}
          style={style}
          defaultValue={defaultValue}
          className='w-full h-10 outline-none  border-4 bg-white flex items-center justify-start px-3 rounded-xl'
          required={required}
          onChange={
            onChange
              ? ({ currentTarget: { value } }) => onChange(value)
              : undefined
          }
        />
      )}
    </div>
  );
}
