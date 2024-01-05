import { FC } from "react";
import ConfirmButton from "../../components/Navigations/ConfirmButton";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { SIGNIN_ROUTE, SIGNUP_ROUTE } from "../../components/AppRouter/consts";

const WelcomePage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <header className="welcome-page__header">
        {/* <PhoneCelular /> */}
        <div className="welcome-page__text">
          <h1 className="text-title">Hello!</h1>
          <h2 className="text-subtitle">Welcome to bank app</h2>
        </div>
        <img
          src="/homepage/home-page-img.png"
          alt="welcome-page-img"
          className="welcome-page__image"
        />
      </header>

      <section className="welcome-page__buttons">
        <ConfirmButton outline={false} onClick={() => navigate(SIGNUP_ROUTE)}>
          Sign Up
        </ConfirmButton>
        <ConfirmButton outline={true} onClick={() => navigate(SIGNIN_ROUTE)}>
          Sign In
        </ConfirmButton>
      </section>

      {/* <HomeBar /> */}
    </div>
  );
};

export default WelcomePage;
