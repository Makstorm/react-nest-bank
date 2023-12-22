import { FC, PropsWithChildren } from "react";

import "./index.scss";

interface IPhonePageProps {
  className?: string;
}

const PhonePageContent: FC<PropsWithChildren<IPhonePageProps>> = ({
  children,
  className,
}) => {
  return (
    <div className={`phone-page-content ${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default PhonePageContent;
