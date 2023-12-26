import { useLocation } from "react-router-dom";
import "./index.scss";
import { BALANCE_ROUTE, INDEX_ROUTE } from "../../AppRouter/consts";

const PhoneCelular = () => {
  const location = useLocation();

  const isLight =
    location.pathname === INDEX_ROUTE || location.pathname === BALANCE_ROUTE;

  return (
    <div className="celular-panel">
      <img src={isLight ? "/svg/time.svg" : "/svg/time-black.svg"} alt="time" />
      <img
        src={isLight ? "/svg/celular.svg" : "/svg/celular-black.svg"}
        alt="celular"
      />
    </div>
  );
};

export default PhoneCelular;
