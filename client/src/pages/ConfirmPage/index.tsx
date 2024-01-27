import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PhonePage from "../../components/Phone/PhonePage";
import BackArrow from "../../components/Navigations/BackwardArrow";
import PageInfoTitle from "../../components/Phone/PageInfoTitle";
import { useEffect, useState } from "react";
import AuthInput from "../../components/Auth/AuthInput";
import { InputType } from "../../components/Auth/AuthInput/type.enum";
import ConfirmButton from "../../components/Navigations/ConfirmButton";
import { confirmAPI } from "../../store/services/ConfirmService";
import PhonePageContent from "../../components/Phone/PhonePageContent";
import { BallTriangle } from "react-loader-spinner";
import { SIGNIN_ROUTE } from "../../components/AppRouter/consts";
import AuthError from "../../components/Auth/AuthErrror";

const ConfirmPage = () => {
  const [confirmPassword, { isLoading: Loader1, isSuccess: Success1 }] =
    confirmAPI.useConfirmPasswordChangeMutation();
  const [confirmSignUp, { isLoading: Loader2, isSuccess: Success2 }] =
    confirmAPI.useConfirmSignUpMutation();

  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
  });

  const onChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (Success1 || Success2) {
      setTimeout(() => {
        navigate(SIGNIN_ROUTE);
      }, 3000);
    }
  }, [Success1, Success2]);

  return (
    <PhonePage>
      <section style={{ marginTop: "50px", padding: "0 20px" }}>
        <BackArrow />
      </section>

      <PhonePageContent>
        {location.pathname === "signup-confirm" ? (
          <>
            <PageInfoTitle
              title="Confirm account"
              subtitle="press button to continue"
            />

            <ConfirmButton
              disable
              onClick={() => {
                if (token) {
                  confirmSignUp({ token });
                }
              }}
              outline={false}
            ></ConfirmButton>

            {Loader2 && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <BallTriangle
                  height={100}
                  width={100}
                  radius={5}
                  color="#5b94e9"
                  ariaLabel="ball-triangle-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <PageInfoTitle
              title="Recover password"
              subtitle="write your new password"
            />

            <AuthInput
              onInputChange={onChange}
              title="New password"
              type={InputType.PASSWORD}
              name="password"
            />

            <ConfirmButton
              disable
              onClick={() => {
                if (token) {
                  confirmPassword({ token, password: formData.password });
                }
              }}
              outline={false}
            >
              Recover password
            </ConfirmButton>

            {Loader1 && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <BallTriangle
                  height={100}
                  width={100}
                  radius={5}
                  color="#5b94e9"
                  ariaLabel="ball-triangle-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            )}
          </>
        )}
        {(Success1 || Success2) && (
          <AuthError success>
            Successfull! Redirecting to Sign in page!
          </AuthError>
        )}
      </PhonePageContent>
    </PhonePage>
  );
};

export default ConfirmPage;
