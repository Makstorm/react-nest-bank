import { FC, PropsWithChildren } from "react";
import "./index.scss";

const AuthError: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="error-auth">
      <img src="/svg/error-auth.svg" alt="error-warn" /> {children}
    </div>
  );
};

export default AuthError;
