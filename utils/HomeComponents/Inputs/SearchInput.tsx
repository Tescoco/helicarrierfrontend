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
  const { data, setSortedTransactions } = useContext(TransactionsContext);
  const [combinedData, setCombinedData] = useState<combinedDataType>([]);

  const sortByDate = (data: Transactions[]) => {
    let sort = data.reduce((accumulator, transaction) => {
      let key = transaction.date;
      accumulator[key] = (accumulator[key] || []).concat(transaction);
      return accumulator;
    }, {});

    let sortArray = Object.entries(sort).map((k) => k);
    return sortArray;
  };

  useEffect(() => {
    //combine array of transactions and filter it'
    let combinedData: combinedDataType = [];

    for (let i = 0; i < data.length; i++) {
      const transaction = {
        id: data[i].id,
        search:
          `${data[i].amount} ${data[i].currency} ${data[i].type} ${data[i].status} ${data[i].name}`.toLocaleLowerCase(),
        raw: data[i],
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
