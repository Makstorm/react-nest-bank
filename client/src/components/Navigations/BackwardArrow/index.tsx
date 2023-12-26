import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { INDEX_ROUTE } from "../../AppRouter/consts";

const BackArrow = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <button
      className="back-arrow"
      onClick={
        location.pathname !== "/signin" && location.pathname !== "/signup"
          ? () => navigate(-1)
          : () => navigate(INDEX_ROUTE)
      }
    >
      <img src="/svg/arrow-back.svg" alt="back-arrow" />
    </button>
  );
};

export default BackArrow;
