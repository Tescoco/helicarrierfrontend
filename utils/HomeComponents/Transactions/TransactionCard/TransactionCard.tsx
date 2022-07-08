import React from "react";
import TransactionDetails from "./TransactionDetails";
import TransactionIcon from "./TransactionIcon";
import styles from "./TransactionCard.module.css";

type Props = {};

function TransactionCard({}: Props) {
  return (
    <div className={styles.TCContainer}>
      <div className={styles.TCContainerInner}>
        <div className={styles.TCContent}>
          <TransactionIcon />
          <TransactionDetails />
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;
