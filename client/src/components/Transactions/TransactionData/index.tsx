import { FC } from "react";
import { ITransaction } from "../../../models/ITransaction";

import "./index.scss";
import TransactionProperty from "../TransactionProperty";
import Divider from "../../Common/Divider";
import { TransactionType } from "../../../models/enums/transaction.enum";
import { useAppSelector } from "../../../hooks/redux";

interface ITransactionDataProp {
  transaction: ITransaction | null;
}

const TransactionData: FC<ITransactionDataProp> = ({ transaction }) => {
  const email = useAppSelector((state) => state.userReduser.user?.email);

  const formatDateTime = (date: Date) => {
    const options = {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
    } as Intl.DateTimeFormatOptions; // Explicitly type the options

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate.replace(/,/g, "");
  };

  if (!transaction) {
    return <div>Ops thre isnt any transaction</div>;
  }

  const getAddres = (transaction: ITransaction) => {
    if (transaction.type === TransactionType.REMPLENISHABLE) {
      return transaction.sender;
    }

    return transaction.type === TransactionType.CONSUMABLE &&
      transaction.senderEmail === email
      ? transaction.receiverEmail
      : transaction.senderEmail;
  };

  const getType = (transaction: ITransaction) => {
    if (transaction.type === TransactionType.REMPLENISHABLE) {
      return "Recive";
    }

    return transaction.type === TransactionType.CONSUMABLE &&
      transaction.senderEmail === email
      ? "Send"
      : "Recive";
  };

  return (
    <div className="transaction-data">
      <TransactionProperty
        name="Date"
        value={formatDateTime(new Date(transaction.date))}
      />
      <Divider />
      <TransactionProperty
        name="Address"
        value={getAddres(transaction) ? getAddres(transaction) : "cool"}
      />
      <Divider />
      <TransactionProperty name="Type" value={getType(transaction)} />
    </div>
  );
};

export default TransactionData;
