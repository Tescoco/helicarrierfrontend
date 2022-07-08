import React from "react";
import styles from "./TransactionsContainer.module.css";

type Props = {
  date: string;
};

function TransactionDate({ date }: Props) {
  return <div className={styles.TDContainer}>{date}</div>;
}

export default TransactionDate;
