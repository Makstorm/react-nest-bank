import { FC, PropsWithChildren } from "react";
import "./index.scss";

interface IAuthErrorProps {
  success?: boolean;
}

const AuthError: FC<PropsWithChildren<IAuthErrorProps>> = ({
  children,
  success,
}) => {
  return (
    <div className={`error-auth ${success ? "error-auth--success" : ""}`}>
      {success ? null : <img src="/svg/error-auth.svg" alt="error-warn" />}{" "}
      {children}
    </div>
  );
};

export default AuthError;
