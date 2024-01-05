import React, { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RECOVERY_ROUTE, SIGNIN_ROUTE } from "../../AppRouter/consts";

import "./index.scss";

interface IChangeAuthProps {
  text: string;
}

const ChangeAuth: FC<IChangeAuthProps> = ({ text }) => {
  const location = useLocation();

  return (
    <div className="change">
      <p className="change__text">{text}</p>
      <NavLink
        className="change__link"
        to={location.pathname === "/signup" ? SIGNIN_ROUTE : RECOVERY_ROUTE}
      >
        {location.pathname === "/signup" ? "Sign in" : "Restore"}
      </NavLink>
    </div>
  );
};

export default ChangeAuth;
