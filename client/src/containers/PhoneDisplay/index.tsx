import { FC } from "react";
import "./index.scss";
import PhoneCelular from "../../components/PhoneCelular";
import HomeBar from "../../components/HomeBar";
import { Outlet } from "react-router-dom";

const PhoneDisplay: FC = () => {
  return (
    <div className="phone-display">
      <div className="phone-screen">
        <PhoneCelular />
        <Outlet />
        <HomeBar />
      </div>
    </div>
  );
};

export default PhoneDisplay;
