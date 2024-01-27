import "./index.scss";
import { NOTIFICATIONS_ROUTE, SETTINGS_ROUTE } from "../../AppRouter/consts";
import { useNavigate } from "react-router-dom";

const WalletNavigate = () => {
  const navigate = useNavigate();

  return (
    <div className="wallet-navigate">
      <img
        className="wallet-navigate__button"
        src="/balance/bell-ringing.svg"
        alt="time"
        onClick={() => navigate(SETTINGS_ROUTE)}
      />
      <h3 className="wallet-navigate__text">Main wallet</h3>
      <img
        className="wallet-navigate__button"
        src="/balance/bell-ringing2.svg"
        alt="time"
        onClick={() => navigate(NOTIFICATIONS_ROUTE)}
      />
    </div>
  );
};

export default WalletNavigate;
