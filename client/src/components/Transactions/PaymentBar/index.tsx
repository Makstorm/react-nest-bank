import React, { FC } from "react";
import "./index.scss";
import { TransactionType } from "../../../models/enums/transaction.enum";

interface IPaymentBarProps {
  src?: string;
  username: string;
  date: Date;
  type: TransactionType;
  amount: number;
}

const PaymentBar: FC<IPaymentBarProps> = ({
  src,
  username,
  date,
  type,
  amount,
}) => {
  return <div>PaymentBar</div>;
};

export default PaymentBar;
