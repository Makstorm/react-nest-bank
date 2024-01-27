import "./index.scss";
import PhonePage from "../../components/Phone/PhonePage";
import PhonePageContent from "../../components/Phone/PhonePageContent";
import WalletNavigate from "../../components/Wallet/WalletNavigate";
import Balance from "../../components/Wallet/Balance";
import ReceiveSend from "../../components/Wallet/ReceiveSend";
import TransactionsList from "../../components/Wallet/TransactionsList";

const WalletPage = () => {
  return (
    <PhonePage className="wallet-page">
      <header className="wallet-page__header-container">
        <section style={{ marginTop: "60px", padding: "0 20px" }}></section>
        <PhonePageContent>
          <WalletNavigate />

          <Balance />

          <ReceiveSend />
        </PhonePageContent>
      </header>
      <main>
        <PhonePageContent>
          <TransactionsList />
        </PhonePageContent>
      </main>
    </PhonePage>
  );
};

export default WalletPage;
