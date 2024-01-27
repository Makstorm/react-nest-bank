import { FC } from "react";
import { ITransaction } from "../../../models/ITransaction";
import "./index.scss";
import { TransactionType } from "../../../models/enums/transaction.enum";
import { useNavigate } from "react-router-dom";
import { TRANSACTION_ROUTE } from "../../AppRouter/consts";

interface ITransactionCardProp {
  transaction: ITransaction;
  userEmail?: string;
}

const TransactionCard: FC<ITransactionCardProp> = ({
  transaction,
  userEmail,
}) => {
  const navigate = useNavigate();

  const getImage = (sender: string) => {
    switch (sender) {
      case "Stripe": {
        return "/transactions/stripeIcon.svg";
        break;
      }

      case "Coinbase": {
        return "/transactions/coinbaseIcon.svg";
        break;
      }

      default: {
        return "/transactions/userIcon.svg";
      }
    }
  };

  const getTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}`;

    return formattedTime;
  };

  return (
    <div
      className="transaction-card"
      onClick={() => navigate(TRANSACTION_ROUTE + `/${transaction.id}`)}
    >
      <div className="transaction-card__title">
        <div className="circle">
          <img src={getImage(transaction.sender)} alt="transaction_icon" />
        </div>
        <div className="text">
          <h4 className="text__name">
            {transaction.type === TransactionType.REMPLENISHABLE
              ? transaction.sender
              : transaction.type === TransactionType.PROFITABLE
              ? transaction.senderEmail
              : transaction.receiverEmail}
          </h4>
          <p className="text__time-type">
            {getTime(new Date(transaction.date))} *{" "}
            {transaction.type === TransactionType.REMPLENISHABLE ||
            transaction.type === TransactionType.PROFITABLE
              ? "Receipt"
              : "Sending"}
          </p>
        </div>
      </div>
      <div
        className={`transaction-card__amount ${
          transaction.type === TransactionType.CONSUMABLE &&
          transaction.senderEmail === userEmail
            ? ""
            : "transaction-card__amount--profitable"
        }`}
      >
        <span>
          {transaction.type === TransactionType.CONSUMABLE &&
          transaction.senderEmail === userEmail
            ? "- $"
            : "+ $"}
          {transaction.amount}
        </span>
      </div>
    </div>
  );
};

export default TransactionCard;
