import React from "react";
import { Transactions } from "../../../pages";
import TransactionCard from "./TransactionCard/TransactionCard";
import TransactionDate from "./TransactionDate";
import styles from "./TransactionsContainer.module.css";

type Props = {
  date: string;
  transaction: any; //Transactions[];
};

function TransactionsContainer({ date, transaction }: Props) {
  return (
    <div className={styles.TCContainer}>
      <TransactionDate date={date} />
      <div className={styles.TCRow}>
        {transaction.map((data, i) => (
          <TransactionCard data={data} key={i} />
        ))}
      </div>
    </div>
  );
}

export default TransactionsContainer;
