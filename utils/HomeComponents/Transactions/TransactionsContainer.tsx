import React from "react";
import TransactionCard from "./TransactionCard/TransactionCard";
import TransactionDate from "./TransactionDate";
import styles from "./TransactionsContainer.module.css";

type Props = {};

function TransactionsContainer({}: Props) {
  return (
    <div className={styles.TCContainer}>
      <TransactionDate />
      <div className={styles.TCRow}>
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </div>
    </div>
  );
}

export default TransactionsContainer;
