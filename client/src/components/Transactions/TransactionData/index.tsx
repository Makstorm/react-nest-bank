import { FC } from "react";
import { ITransaction } from "../../../models/ITransaction";

import "./index.scss";
import TransactionProperty from "../TransactionProperty";
import Divider from "../../Common/Divider";
import { TransactionType } from "../../../models/enums/transaction.enum";

interface ITransactionDataProp {
  transaction: ITransaction | null;
}

const TransactionData: FC<ITransactionDataProp> = ({ transaction }) => {
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

  return (
    <div className="transaction-data">
      <TransactionProperty
        name="Date"
        value={formatDateTime(transaction.date)}
      />
      <Divider />
      <TransactionProperty
        name="Address"
        value={
          transaction.type === TransactionType.PROFITABLE ||
          transaction.type === TransactionType.REMPLENISHABLE
            ? transaction.sender
            : transaction.receiver
        }
      />
      <Divider />
      <TransactionProperty
        name="Type"
        value={
          transaction.type === TransactionType.PROFITABLE ||
          transaction.type === TransactionType.REMPLENISHABLE
            ? "Recive"
            : "Send"
        }
      />
    </div>
  );
};

export default TransactionData;
