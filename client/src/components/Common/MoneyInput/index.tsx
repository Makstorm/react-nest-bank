import { ChangeEvent, FC, useState } from "react";

import "./index.scss";

interface IMoneyInputProps {
  title: string;

  onInputChange: (name: string, value: string) => void;
}

const MoneyInput: FC<IMoneyInputProps> = ({ title, onInputChange }) => {
  const [amount, setAmount] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Remove non-numeric characters from the input
    const numericValue = inputValue.replace(/[^0-9.]/g, "");

    // Split the value into integer and decimal parts
    const [integerPart, decimalPart] = numericValue.split(".");

    // Format the integer part as currency
    const formattedIntegerPart = integerPart
      ? parseFloat(integerPart).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
        })
      : "";

    // Combine the formatted integer part and the decimal part
    const formattedValue = decimalPart
      ? `${formattedIntegerPart}.${decimalPart}`
      : formattedIntegerPart;

    setAmount(formattedValue);

    const { name } = e.target;
    onInputChange(name, numericValue);
  };

  const [error] = useState<string>("");

  return (
    <div className="input">
      <label className="input__title">{title}</label>
      <div className="input__container">
        <input
          className={`input__field ${error ? "input__field--error" : ""}`}
          type="text"
          name="money"
          placeholder="$"
          onChange={handleChange}
          value={amount}
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default MoneyInput;
