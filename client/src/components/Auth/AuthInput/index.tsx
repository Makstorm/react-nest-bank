import React, { FC, useEffect, useState } from "react";

import { InputType } from "./type.enum";

import "./index.scss";

interface IAuthInputProps {
  title: string;
  type: InputType;
  name?: string;
  onInputChange: (name: string, value: string) => void;
}

const AuthInput: FC<IAuthInputProps> = ({
  title,
  type,
  onInputChange,
  name,
}) => {
  const [value, setValue] = useState<string>("");

  const [visibility, setVisibility] = useState<boolean>(
    type === InputType.PASSWORD ? false : true
  );

  const [error, setError] = useState<string>("");

  const regex =
    type === InputType.EMAIL
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  useEffect(() => {
    if (!regex.test(value) && type === InputType.EMAIL && value.length > 0) {
      setError("Please enter a valid email address");
    } else if (
      !regex.test(value) &&
      type === InputType.PASSWORD &&
      value.length > 0
    ) {
      setError("Please enter a valid password");
    } else {
      setError("");
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValue(event.target.value);
    const { name, value } = event.target;
    onInputChange(name, value);
  };

  const togglePasswordVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="input">
      <label className="input__title">{title}</label>
      <div className="input__container">
        <input
          className={`input__field ${error ? "input__field--error" : ""}`}
          type={visibility ? "text" : "password"}
          name={
            name
              ? name
              : type === InputType.EMAIL
              ? "email"
              : type === InputType.PASSWORD
              ? "password"
              : "text"
          }
          placeholder={`Enter you ${title.toLowerCase()}`}
          onChange={handleChange}
          value={value}
        />
        {type === InputType.PASSWORD && value.length > 0 && (
          <button className="input__toggle" onClick={togglePasswordVisibility}>
            <img
              src={
                visibility
                  ? `/svg/eye/${error ? "error-" : ""}close-eye.svg`
                  : `/svg/eye/${error ? "error-" : ""}open-eye.svg`
              }
              alt=""
            />
          </button>
        )}
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default AuthInput;
