import { FC, PropsWithChildren } from "react";

import "./index.scss";

interface IPhonePageProps {
  className?: string;
}

const PhonePage: FC<PropsWithChildren<IPhonePageProps>> = ({
  children,
  className,
}) => {
  return (
    <div className={`phone-page ${className ? className : ""}`}>{children}</div>
  );
};

export default PhonePage;
