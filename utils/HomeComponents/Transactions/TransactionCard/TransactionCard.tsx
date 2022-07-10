import React from "react";
import TransactionDetails from "./TransactionDetails";
import TransactionIcon from "./TransactionIcon";
import styles from "./TransactionCard.module.css";
import { Transactions } from "../../../../pages";

type Props = {
  data: Transactions;
};

function TransactionCard({ data }: Props) {
  return (
    <div className={styles.TCContainer}>
      <div className={styles.TCContainerInner}>
        <div className={styles.TCContent}>
          <TransactionIcon type={data.type} />
          <TransactionDetails data={data} />
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;
