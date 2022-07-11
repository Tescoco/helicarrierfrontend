import React, { useContext, useEffect, useState } from "react";
import { Transactions } from "../../../pages";
import { TransactionsContext } from "../../context/TransactionsContext";
import { sortByDate } from "../functions/filters";
import styles from "./SearchInput.module.css";

type combinedDataType = {
  id: any;
  string: string;
  raw: Transactions;
}[];

function SearchInput({}) {
  // consuming context Api
  const { transactions, setSortedTransactions } =
    useContext(TransactionsContext);

  // set state, to combine each transaction into a string
  // eg "currency: USD, status: pending, type: credit"
  // is converted to "USD, pending, credit"
  const [combinedData, setCombinedData] = useState<combinedDataType>([]);

  useEffect(() => {
    // an empty array is used to store the combined data
    let combinedData: combinedDataType = [];

    // loop through each transaction
    for (let i = 0; i < transactions.length; i++) {
      const transaction = {
        id: transactions[i].id,
        // we create a searchable string from the transaction
        string:
          `${transactions[i].currency} ${transactions[i].currencyIcon} ${transactions[i].amount} ${transactions[i].type} ${transactions[i].name} ${transactions[i].status}`.toLocaleLowerCase(),
        // we store the raw transaction (object form)
        raw: transactions[i],
      };
      // we push into our empty array
      combinedData.push(transaction);
    }
    // set state which reflects on client side
    setCombinedData(combinedData);
  }, []);

  // this function runs when the user types in the search input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // this searches the combinedData for the value of the input
    let searchResult = combinedData.filter((transaction) =>
      // if the search string is found in the transaction string
      // it returns an array of type combinedDataType
      transaction.string.includes(e.target.value.toLocaleLowerCase())
    );
    // lastly we map the array to obtain the raw transaction
    const transactions = searchResult.map((transaction) => transaction.raw);

    // then we sort the transactions by date
    // then set state to reflect on client side
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
