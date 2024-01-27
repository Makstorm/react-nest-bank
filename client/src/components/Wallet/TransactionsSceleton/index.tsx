import { FC } from "react";
import "./index.scss";
import Skeleton from "react-loading-skeleton";

interface ISceletonPrpo {
  number: number;
}

const TransactionSkeleton: FC<ISceletonPrpo> = ({ number }) => {
  return (
    <>
      {Array(number)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="transaction-sceleton">
            <Skeleton circle width={48} height={48} />

            <div className="transaction-sceleton__text">
              <Skeleton style={{ marginBottom: ".6rem" }} />
              <Skeleton />
            </div>
          </div>
        ))}
    </>
  );
};

export default TransactionSkeleton;
