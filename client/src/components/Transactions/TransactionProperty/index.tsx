import { FC } from "react";

interface ITransactionPropertyProp {
  name: string;
  value: string;
}

const TransactionProperty: FC<ITransactionPropertyProp> = ({ name, value }) => {
  return (
    <div className="transaction-data__property">
      <div className="property-key">{name}</div>
      <div className="property-value">{value}</div>
    </div>
  );
};

export default TransactionProperty;
