import AuthPage from "../../pages/AuthPAge";
import ConfirmPage from "../../pages/ConfirmPage";
import WelcomePage from "../../pages/WelcomePage";
import {
  BALANCE_ROUTE,
  INDEX_ROUTE,
  NOTIFICATIONS_ROUTE,
  RECIEVE_ROUTE,
  RECOVERY_CONFIRM_ROUTE,
  RECOVERY_ROUTE,
  SEND_ROUTE,
  SETTINGS_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_CONFIRM_ROUTE,
  SIGNUP_ROUTE,
  TRANSACTION_ROUTE,
} from "./consts";

export const authRoutes = [
  {
    path: BALANCE_ROUTE,
    Component: WelcomePage,
  },
  {
    path: NOTIFICATIONS_ROUTE,
    Component: WelcomePage,
  },
  {
    path: SETTINGS_ROUTE,
    Component: WelcomePage,
  },
  {
    path: RECIEVE_ROUTE,
    Component: WelcomePage,
  },
  {
    path: SEND_ROUTE,
    Component: WelcomePage,
  },
  {
    path: TRANSACTION_ROUTE,
    Component: WelcomePage,
  },
];

export const publicRoutes = [
  {
    path: SIGNIN_ROUTE,
    Component: AuthPage,
  },
  {
    path: SIGNUP_ROUTE,
    Component: AuthPage,
  },
  {
    path: SIGNUP_CONFIRM_ROUTE,
    Component: ConfirmPage,
  },
  {
    path: RECOVERY_ROUTE,
    Component: AuthPage,
  },
  {
    path: RECOVERY_CONFIRM_ROUTE,
    Component: ConfirmPage,
  },
  {
    path: INDEX_ROUTE,
    Component: WelcomePage,
  },
];
