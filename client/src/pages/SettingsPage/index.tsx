// import { useLocation, useNavigate } from "react-router-dom";

import BackArrow from "../../components/Navigations/BackwardArrow";
import PhonePage from "../../components/Phone/PhonePage";
import PhonePageContent from "../../components/Phone/PhonePageContent";
import { useState } from "react";
import ConfirmButton from "../../components/Navigations/ConfirmButton";
import AuthInput from "../../components/Auth/AuthInput";
import { InputType } from "../../components/Auth/AuthInput/type.enum";
import SectioTitle from "../../components/Common/SectionTitle/SectionTitle";
import Divider from "../../components/Common/Divider";
import { userAPI } from "../../store/services/UserService";
import { UpdateUserDto } from "../../models/dto/update-user.dto";
import AuthError from "../../components/Auth/AuthErrror";
import { useAppDispatch } from "../../hooks/redux";
import { logOut } from "../../store/reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import { INDEX_ROUTE } from "../../components/AppRouter/consts";

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [updateUser, { error, isSuccess }] =
    userAPI.useUpdateUserDataMutation();

  const [changeEmailFormData, setEmailFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeEmail = (name: string, value: string) => {
    setEmailFormData({ ...changeEmailFormData, [name]: value });
  };

  const [changePasswordFormData, setPasswordFormData] = useState({
    passwordOld: "",
    passwordNew: "",
  });

  const onChangePassword = (name: string, value: string) => {
    setPasswordFormData({ ...changePasswordFormData, [name]: value });
  };

  // const navigate = useNavigate();

  return (
    <PhonePage>
      <section style={{ marginTop: "50px", padding: "0 20px" }}>
        <BackArrow title="Settings" />
      </section>

      <PhonePageContent>
        <SectioTitle>Change email</SectioTitle>

        <AuthInput
          onInputChange={onChangeEmail}
          title="Email"
          type={InputType.EMAIL}
        />

        <AuthInput
          onInputChange={onChangeEmail}
          title="Old password"
          type={InputType.PASSWORD}
        />

        <ConfirmButton
          outline={true}
          onClick={() => {
            const dto = new UpdateUserDto();
            dto.email = changeEmailFormData.email;
            dto.password = changeEmailFormData.password;

            updateUser(dto);
          }}
        >
          Save Email
        </ConfirmButton>

        <Divider />

        <SectioTitle>Change password</SectioTitle>

        <AuthInput
          onInputChange={onChangePassword}
          name="passwordOld"
          title="Old password"
          type={InputType.PASSWORD}
        />

        <AuthInput
          onInputChange={onChangePassword}
          name="passwordNew"
          title="New password"
          type={InputType.PASSWORD}
        />

        <ConfirmButton
          outline={true}
          onClick={() => {
            const dto = new UpdateUserDto();

            dto.oldPassword = changePasswordFormData.passwordOld;
            dto.password = changePasswordFormData.passwordNew;

            updateUser(dto);
          }}
        >
          Save Password
        </ConfirmButton>

        <Divider />

        <ConfirmButton
          danger={true}
          outline={true}
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(logOut());
            navigate(INDEX_ROUTE);
          }}
        >
          Log out
        </ConfirmButton>

        {error ? <AuthError>Something went wrong</AuthError> : null}
        {isSuccess ? <AuthError success>Data changed</AuthError> : null}
      </PhonePageContent>
    </PhonePage>
  );
};

export default SettingsPage;
