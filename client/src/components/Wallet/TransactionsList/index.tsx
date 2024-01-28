import { FC, useEffect } from "react";
import "./index.scss";
import { transactionsAPI } from "../../../store/services/TransactionsService";
import TransactionSkeleton from "../TransactionsSceleton";
import TransactionCard from "../TransactionCard";
import { useAppSelector } from "../../../hooks/redux";

const TransactionsList: FC = () => {
  const { data, isLoading, refetch } =
    transactionsAPI.useFetchUserTransactionsQuery("");

  const email = useAppSelector((state) => state.userReduser.user?.email);

  useEffect(() => {
    // Refetch data when the component mounts or when the page gains focus
    refetch();

    const onFocus = () => {
      refetch();
    };

    const intervalId = setInterval(() => refetch(), 10000);

    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
      clearInterval(intervalId);
    };
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="transactions-list">
        <TransactionSkeleton number={8} />
      </div>
    );
  }

  if (!data || data.length < 1) {
    return (
      <div className="transactions-list">
        <h1>No transactions</h1>
        {/* <TransactionCard
          transaction={{
            id: 3,
            amount: 20,
            sender: "Stripe",
            type: TransactionType.REMPLENISHABLE,
            receiver: "me",
            date: new Date(),
            category: "food",
          }}
        /> */}
      </div>
    );
  }

  return (
    <div className="transactions-list">
      {data.map((transaction) => {
        return (
          <TransactionCard
            userEmail={email ? email : undefined}
            key={transaction.id}
            transaction={transaction}
          />
        );
        // return <div key={index}></div>;
      })}
    </div>
  );
};

export default TransactionsList;
