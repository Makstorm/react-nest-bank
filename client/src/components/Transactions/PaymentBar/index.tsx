import { FC } from "react";
import "./index.scss";
import { TransactionType } from "../../../models/enums/transaction.enum";

interface IPaymentBarProps {
  type: TransactionType;
  amount: number;
}

const PaymentBar: FC<IPaymentBarProps> = ({ type, amount }) => {
  return (
    <div
      className={`payment-bar ${
        type === TransactionType.CONSUMABLE ? "" : "payment-bar--profitable"
      }`}
    >
      {type === TransactionType.CONSUMABLE ? "- $" : "+ $"}
      {amount}
    </div>
  );
};

export default PaymentBar;
