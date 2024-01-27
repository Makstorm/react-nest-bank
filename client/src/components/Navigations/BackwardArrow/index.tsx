import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { INDEX_ROUTE } from "../../AppRouter/consts";
import { FC } from "react";

interface IBackArrowProps {
  title?: string;
}

const BackArrow: FC<IBackArrowProps> = ({ title }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="back-arrow">
      <button
        className="back-arrow__button"
        onClick={
          location.pathname !== "/signin" && location.pathname !== "/signup"
            ? () => navigate(-1)
            : () => navigate(INDEX_ROUTE)
        }
      >
        <img src="/svg/arrow-back.svg" alt="back-arrow" />
      </button>
      {title && <h2 className="back-arrow__text">{title}</h2>}
    </div>
  );
};

export default BackArrow;
