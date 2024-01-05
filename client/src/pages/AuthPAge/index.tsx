import { useLocation, useNavigate } from "react-router-dom";
import AuthInput from "../../components/Auth/AuthInput";
import { InputType } from "../../components/Auth/AuthInput/type.enum";
import BackArrow from "../../components/Navigations/BackwardArrow";
import ChangeAuth from "../../components/Auth/ChangeAuth";
import ConfirmButton from "../../components/Navigations/ConfirmButton";
import PageInfoTitle from "../../components/Phone/PageInfoTitle";
import PhonePage from "../../components/Phone/PhonePage";
import PhonePageContent from "../../components/Phone/PhonePageContent";
import { useEffect, useState } from "react";
import { registration } from "../../http/userAPI";
import { BALANCE_ROUTE, SIGNIN_ROUTE } from "../../components/AppRouter/consts";
import AuthError from "../../components/Auth/AuthErrror";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchUser } from "../../store/reducers/ActionCreators";
import { setUserError } from "../../store/reducers/UserSlice";

const AuthPage = () => {
  const dispatch = useAppDispatch();

  const { error, isAuth } = useAppSelector((state) => state.userReduser);

  // Email field
  // const [emailValue, setEmailValue] = useState<string>("");

  // const handleEmailChange = (value: string) => {
  //   setEmailValue(value);
  // };

  // // Password field
  // const [passwordValue, setPasswordValue] = useState<string>("");

  // const handlePasswordChange = (value: string) => {
  //   setPasswordValue(value);
  // };

  // // Usernam field
  // const [textValue, setTextValue] = useState<string>("");

  // const handleTextChange = (value: string) => {
  //   setTextValue(value);
  // };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    text: "",
  });

  const onChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // Utils functions
  const location = useLocation();
  const isLogin = location.pathname === SIGNIN_ROUTE;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate(BALANCE_ROUTE);
  }, [isAuth]);

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

  const auth = async () => {
    if (isLogin) {
      //  //
      if (formData.email && formData.password) {
        dispatch(
          fetchUser({ email: formData.email, password: formData.password })
        );
        // navigate(BALANCE_ROUTE);
      } else {
        dispatch(setUserError("Missing credentials"));
      }
      //  //
    } else {
      if (formData.email && formData.password && formData.text) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await registration(formData.email, formData.password, formData.text);
      } else {
        dispatch(setUserError("Missing credentials"));
      }
      // navigate(SIGNIN_ROUTE);
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
              onInputChange={onChange}
              title="Email"
              type={InputType.EMAIL}
            />
            <AuthInput
              onInputChange={onChange}
              title="Nickname"
              type={InputType.TEXT}
            />
            <AuthInput
              onInputChange={onChange}
              title="Password"
              type={InputType.PASSWORD}
            />{" "}
          </>
        )}

        {location.pathname === "/signin" && (
          <>
            <AuthInput
              onInputChange={onChange}
              title="Email"
              type={InputType.EMAIL}
            />
            <AuthInput
              onInputChange={onChange}
              title="Password"
              type={InputType.PASSWORD}
            />{" "}
          </>
        )}

        {location.pathname === "/signup-confirm" && (
          <>
            <AuthInput
              onInputChange={onChange}
              title="Code"
              type={InputType.TEXT}
            />
          </>
        )}

        {location.pathname === "/recovery" && (
          <>
            <AuthInput
              onInputChange={onChange}
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

        {error ? <AuthError>{error}</AuthError> : null}
      </PhonePageContent>
    </PhonePage>
  );
};

export default AuthPage;
