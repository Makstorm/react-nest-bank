import { FC } from "react";
import "./index.scss";
import PhoneCelular from "../../components/Phone/PhoneCelular";
import HomeBar from "../../components/Navigations/HomeBar";
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
