import { FC } from "react";
import "./index.scss";
import { PaymentSysytemsType } from "../../../models/enums/payment-system.enum";
import { AccountRemplenishmentDto } from "../../../models/dto/account-replenishment.dto";
import { Remplenishments } from "../../../models/enums/account-replenishments.enum";

interface IPaymentSystemCardProp {
  amount: number;
  type: PaymentSysytemsType;
  onClickApi: (dto: AccountRemplenishmentDto) => void;
}

const PaymentSystemCard: FC<IPaymentSystemCardProp> = ({
  type,
  onClickApi,
  amount,
}) => {
  const getImage = () => {
    switch (type) {
      case PaymentSysytemsType.STRIPE: {
        return "/transactions/stripeIcon.svg";
        break;
      }

      case PaymentSysytemsType.COINBASE: {
        return "/transactions/coinbaseIcon.svg";
        break;
      }

      default: {
        return "/transactions/userIcon.svg";
      }
    }
  };

  const onClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.preventDefault();
    type === PaymentSysytemsType.COINBASE
      ? onClickApi(
          new AccountRemplenishmentDto(Remplenishments.COINBASE, amount)
        )
      : onClickApi(
          new AccountRemplenishmentDto(Remplenishments.STRIPE, amount)
        );
  };

  return (
    <div className="payment-card" onClick={onClick}>
      <div className="payment-card__title">
        <div className="circle">
          <img src={getImage()} alt="transaction_icon" />
        </div>
        <div className="text">
          {type === PaymentSysytemsType.STRIPE ? "Stripe" : "Coinbase"}
        </div>
      </div>
      <div className={`payment-card__amount`}>
        <img className="svg" src="/payments/systems.svg" alt="payments" />
      </div>
    </div>
  );
};

export default PaymentSystemCard;
