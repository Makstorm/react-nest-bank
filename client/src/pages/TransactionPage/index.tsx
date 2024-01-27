// import { useLocation, useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import BackArrow from "../../components/Navigations/BackwardArrow";

import PhonePage from "../../components/Phone/PhonePage";
import PhonePageContent from "../../components/Phone/PhonePageContent";
import { transactionsAPI } from "../../store/services/TransactionsService";
import PaymentBar from "../../components/Transactions/PaymentBar";
import { TransactionType } from "../../models/enums/transaction.enum";
import TransactionData from "../../components/Transactions/TransactionData";

const TransactionPage = () => {
  // const dispatch = useAppDispatch();

  // const navigate = useNavigate();

  const { id } = useParams();

  const { data } = transactionsAPI.useFetchOneTransactionQuery(String(id));

  const transaction = {
    id: 3,
    amount: 20,
    sender: "Stripe",
    type: TransactionType.REMPLENISHABLE,
    receiver: "me",
    date: new Date(),
    category: "food",
  };

  return (
    <PhonePage className="grey-bg">
      <section style={{ marginTop: "50px", padding: "0 20px" }}>
        <BackArrow title="Transaction" />
      </section>

      <PhonePageContent>
        <PaymentBar
          type={data ? data.type : TransactionType.CONSUMABLE}
          amount={data ? data.amount : 0}
        />

        <TransactionData transaction={transaction ? transaction : null} />
      </PhonePageContent>
    </PhonePage>
  );
};

export default TransactionPage;
