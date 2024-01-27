import React, { FC, PropsWithChildren, useState } from "react";
import "./index.scss";

interface IConfirmButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  outline: boolean;
  danger?: boolean;
  disable?: boolean;
}

const ConfirmButton: FC<PropsWithChildren<IConfirmButtonProps>> = ({
  children,
  onClick,
  outline,
  danger,
  disable,
}) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const onClickHandle: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onClick(event);

    if (disable) {
      setButtonDisabled(true);
    }
  };

  return (
    <button
      disabled={isButtonDisabled}
      className={`button ${
        outline && danger
          ? "button--outline-danger"
          : outline
          ? "button--outline"
          : ""
      }`}
      onClick={onClickHandle}
    >
      {children}
    </button>
  );
};

export default ConfirmButton;
