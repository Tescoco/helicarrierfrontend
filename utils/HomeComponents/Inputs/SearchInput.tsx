import React, { useContext, useEffect, useState } from "react";
import { Transactions } from "../../../pages";
import { TransactionsContext } from "../../context/TransactionsContext";
import styles from "./SearchInput.module.css";

type combinedDataType = {
  id: any;
  search: string;
  raw: Transactions;
}[];

function SearchInput({}) {
  const { transactions, setSortedTransactions, sortByDate } =
    useContext(TransactionsContext);
  const [combinedData, setCombinedData] = useState<combinedDataType>([]);

  useEffect(() => {
    //combine array of transactions and filter it'
    let combinedData: combinedDataType = [];

    for (let i = 0; i < transactions.length; i++) {
      const transaction = {
        id: transactions[i].id,
        search:
          `${transactions[i].currency} ${transactions[i].currencyIcon} ${transactions[i].amount} ${transactions[i].type} ${transactions[i].name} ${transactions[i].status}`.toLocaleLowerCase(),
        raw: transactions[i],
      };
      combinedData.push(transaction);
    }
    setCombinedData(combinedData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchResult = combinedData.filter((transaction) =>
      transaction.search.includes(e.target.value.toLocaleLowerCase())
    );
    const transactions = searchResult.map((transaction) => transaction.raw);
    setSortedTransactions(sortByDate(transactions));
  };

  return (
    <div className={styles.SIContainer}>
      <div className={styles.SIContainerInner}>
        <input
          onChange={(e) => handleChange(e)}
          className={styles.SIInput}
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
}

export default SearchInput;
