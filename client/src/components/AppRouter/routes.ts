import AuthPage from "../../pages/AuthPAge";
import ConfirmPage from "../../pages/ConfirmPage";
import NotificationPage from "../../pages/NotificationsPage";
import ReceivePage from "../../pages/ReceivePage";
import SendPage from "../../pages/SendPage";
import SettingsPage from "../../pages/SettingsPage";
import TransactionPage from "../../pages/TransactionPage";
import WalletPage from "../../pages/WalletPage";
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
    Component: WalletPage,
  },
  {
    path: NOTIFICATIONS_ROUTE,
    Component: NotificationPage,
  },
  {
    path: SETTINGS_ROUTE,
    Component: SettingsPage,
  },
  {
    path: RECIEVE_ROUTE,
    Component: ReceivePage,
  },
  {
    path: SEND_ROUTE,
    Component: SendPage,
  },
  {
    path: TRANSACTION_ROUTE + "/:id",
    Component: TransactionPage,
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
