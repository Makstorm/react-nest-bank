import { useLocation, useNavigate } from "react-router-dom";
import AuthInput from "../../components/Auth/AuthInput";
import { InputType } from "../../components/Auth/AuthInput/type.enum";
import BackArrow from "../../components/Navigations/BackwardArrow";
import ChangeAuth from "../../components/Auth/ChangeAuth";
import ConfirmButton from "../../components/Navigations/ConfirmButton";
import PageInfoTitle from "../../components/Phone/PageInfoTitle";
import PhonePage from "../../components/Phone/PhonePage";
import PhonePageContent from "../../components/Phone/PhonePageContent";
import { useState } from "react";
import { login, registration } from "../../http/userAPI";
import { BALANCE_ROUTE, SIGNIN_ROUTE } from "../../components/AppRouter/consts";
import AuthError from "../../components/Auth/AuthErrror";
import { AxiosError } from "axios";

const AuthPage = () => {
  const [error, setError] = useState<string>("");

  const [emailValue, setEmailValue] = useState<string>("");

  const handleEmailChange = (value: string) => {
    setEmailValue(value);
  };

  const [passwordValue, setPasswordValue] = useState<string>("");

  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
  };

  const [textValue, setTextValue] = useState<string>("");

  const handleTextChange = (value: string) => {
    setTextValue(value);
  };

  const location = useLocation();
  const isLogin = location.pathname === SIGNIN_ROUTE;
  const navigate = useNavigate();

  const getTitle = (): { title: string; subtitle: string } => {
    switch (location.pathname) {
      case "/signup": {
        return { title: "Sign up", subtitle: "Choose a registration method" };
      }

      case "/signin": {
        return { title: "Sign in", subtitle: "Select login method" };
      }
      case "/signup-confirm": {
        return {
          title: "Confirm account",
          subtitle: "Write the code you received",
        };
      }
      case "/recovery": {
        return {
          title: "Recover password",
          subtitle: "Choose a recovery method",
        };
      }

      default: {
        return { title: "page", subtitle: "unknown" };
      }
    }
  };

  // const login = async () => {
  //   console.log("login");
  // };

  const auth = async () => {
    try {
      let data;
      if (isLogin) {
        if (emailValue && passwordValue) {
          data = await login(emailValue, passwordValue);
          navigate(BALANCE_ROUTE);
        } else {
          setError("Missing credentials");
        }
      } else {
        if (emailValue && passwordValue && textValue) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          data = await registration(emailValue, passwordValue, textValue);
          navigate(SIGNIN_ROUTE);
        } else {
          setError("Missing credentials");
        }
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e);
        setError(e.response?.data.message);
      }
    }
  };

  const getButton = (): {
    outline: boolean;
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  } => {
    switch (location.pathname) {
      case "/signup": {
        return {
          outline: false,
          onClick: () => {
            auth();
          },
          children: "Continue",
        };
      }

      case "/signin": {
        return {
          outline: false,
          onClick: () => {
            auth();
          },
          children: "Continue",
        };
      }
      case "/signup-confirm": {
        return {
          outline: false,
          onClick: () => {
            navigate(SIGNIN_ROUTE);
          },
          children: "Continue",
        };
      }

      case "/recovery": {
        return {
          outline: false,
          onClick: () => {},
          children: "Change password",
        };
      }

      case "/recovery-confirm": {
        return {
          outline: false,
          onClick: () => {
            navigate(SIGNIN_ROUTE);
          },
          children: "Change password",
        };
      }

      default: {
        return {
          outline: false,
          onClick: () => {},
          children: "Continue",
        };
      }
    }
  };

  return (
    <PhonePage>
      <section style={{ marginTop: "50px" }}>
        <BackArrow />
      </section>
      <PageInfoTitle {...getTitle()} />

      <PhonePageContent>
        {location.pathname === "/signup" && (
          <>
            <AuthInput
              onInputChange={handleEmailChange}
              title="Email"
              type={InputType.EMAIL}
            />
            <AuthInput
              onInputChange={handleEmailChange}
              title="Nickname"
              type={InputType.TEXT}
            />
            <AuthInput
              onInputChange={handlePasswordChange}
              title="Password"
              type={InputType.PASSWORD}
            />{" "}
          </>
        )}

        {location.pathname === "/signin" && (
          <>
            <AuthInput
              onInputChange={handleEmailChange}
              title="Email"
              type={InputType.EMAIL}
            />
            <AuthInput
              onInputChange={handlePasswordChange}
              title="Password"
              type={InputType.PASSWORD}
            />{" "}
          </>
        )}

        {location.pathname === "/signup-confirm" && (
          <>
            <AuthInput
              onInputChange={handleTextChange}
              title="Code"
              type={InputType.TEXT}
            />
          </>
        )}

        {location.pathname === "/recovery" && (
          <>
            <AuthInput
              onInputChange={handleEmailChange}
              title="Email"
              type={InputType.EMAIL}
            />
          </>
        )}

        {(location.pathname === "/signup" ||
          location.pathname === "/signin") && (
          <ChangeAuth
            text={
              location.pathname === "/signup"
                ? "Already have an account?"
                : "Forgot your password?"
            }
          />
        )}

        <ConfirmButton {...getButton()}></ConfirmButton>

        {error && <AuthError>{error}</AuthError>}
      </PhonePageContent>
    </PhonePage>
  );
};

export default AuthPage;
