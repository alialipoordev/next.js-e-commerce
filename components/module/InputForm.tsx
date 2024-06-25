import * as React from "react";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { IoAlertCircle } from "react-icons/io5";

interface InputFormProps {
  name: string;
  label: string;
  type: string;
  icon: JSX.Element;
  placeholder: string;
  value: string;
  onChange: any;
  error: any;
  disabled: boolean;
  passwordScore?: number;
  touched?: boolean;
}

const InputForm: React.FunctionComponent<InputFormProps> = ({
  name,
  label,
  type,
  icon,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  passwordScore,
  touched
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="mt-3 w-[100%]">
      <label htmlFor={name}>{label}</label>
      <div className="relative mt-1 rounded-md">
        <div
          className="pointer-event-none absolute left-0 top-0.5 inset-y-0
            flex items-center pl-3"
          style={error && touched && { transform: "translateY(-12px)" }}
        >
          <span className="text-gray-500 text-sm">{icon}</span>
        </div>
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          className={`w-full py-2 pr-7 pl-8 block rounded-md border
         border-gray-300 outline-offset-2 outline-transparent text-sm
         focus:border-blue-500 focus:ring-blue-700 focus:ring-2
          ${
            type === "password" &&
            passwordScore &&
            (passwordScore <= 2
              ? "bg-red-400"
              : passwordScore < 4
              ? "bg-yellow-400"
              : "bg-green-500")
          }`}
          value={value}
          onChange={onChange(name)}
          style={error && touched && { borderColor: "#ed4337" }}
        />
        {/* Show and Hide Password */}
        {(name == "password" || name == "confirmPassword") && (
          <div
            style={error && touched && { right: "2rem" }}
            className="absolute top-2.5 right-2 text-lg text-gray-700 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <ImEye /> : <ImEyeBlocked />}
          </div>
        )}
        {error && touched && (
          <div className="fill-red-500 absolute right-2 top-2.5 text-xl flex">
            <IoAlertCircle fill="#ed4337" />
          </div>
        )}
        {error && touched && (
          <p className="text-sm text-[#ed4337] mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export default InputForm;
