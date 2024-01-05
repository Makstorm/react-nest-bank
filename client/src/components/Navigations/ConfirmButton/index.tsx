import React, { FC, PropsWithChildren } from "react";
import "./index.scss";

interface IConfirmButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  outline: boolean;
}

const ConfirmButton: FC<PropsWithChildren<IConfirmButtonProps>> = ({
  children,
  onClick,
  outline,
}) => {
  return (
    <button
      className={`button ${outline ? "button--outline" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ConfirmButton;
