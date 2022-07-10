import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { TransactionsContext } from "../utils/context/TransactionsContext";
import FiltersContainer from "../utils/HomeComponents/FiltersContainer/FiltersContainer";
import SearchInput from "../utils/HomeComponents/Inputs/SearchInput";
import TransactionsContainer from "../utils/HomeComponents/Transactions/TransactionsContainer";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";

export interface Transactions {
  id: number;
  status: string;
  date: string;
  amount: string;
  type: string;
  name: string;
  currency: string;
  currencyIcon: string;
}

export type SortedTransactions = [string, Transactions[]][];

const Home: NextPage = () => {
  const GET_TRANSACTIONS = gql`
    {
      Transaction(limit: $limit) {
        id
        status
        date
        amount
        type
        name
        currency
        currencyIcon
      }
    }
  `;

  const sortByDate = (data: Transactions[]) => {
    let sort = data.reduce((accumulator: any, transaction) => {
      let key = transaction.date;

      // accumulator is used to group arrays with same date together
      // if accumulator[key] is undefined (means that the date is not in the array)
      // we use an empty array instead
      // now we assign accumulator[key] to bundle a transaction (with the same date) using concat
      accumulator[key] = (accumulator[key] || []).concat(transaction);

      return accumulator;
    }, {});

    //turn the sort into an array
    let sortArray: any = Object.entries(sort).map((k) => k);
    return sortArray;
  };

  const [sortedTransactions, setSortedTransactions] =
    useState<SortedTransactions>([]);

  const [transactions, setTransactions] = useState<Transactions[]>([]);

  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    client
      .query({
        query: GET_TRANSACTIONS,
        variables: { limit: 3 },
      })
      .then((result) => {
        setTransactions([result.data.Transaction]);
        setSortedTransactions(sortByDate([result.data.Transaction]));
      });
  }, []);

  const filterByType = (type: string) => {
    let filteredTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === type) {
        filteredTransactions.push(transactions[i]);
      }
    }
    return sortByDate(filteredTransactions);
  };

  const filterByStatus = (status: string) => {
    let filteredTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].status === status) {
        filteredTransactions.push(transactions[i]);
      }
    }
    return sortByDate(filteredTransactions);
  };

  const filterByCurrency = (currency: string) => {
    let filteredTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].currency === currency.toUpperCase()) {
        filteredTransactions.push(transactions[i]);
      }
    }
    return sortByDate(filteredTransactions);
  };

  const filterArray = (filter: string) => {
    switch (filter) {
      case "all":
        setSortedTransactions(sortByDate(transactions));
        break;
      case "credit":
      case "debit":
        setSortedTransactions(filterByType(filter));
        break;
      case "completed":
      case "pending":
      case "canceled":
        setSortedTransactions(filterByStatus(filter));
        break;
      case "usd":
      case "ngn":
        setSortedTransactions(filterByCurrency(filter));
        break;
    }
  };

  return (
    <TransactionsContext.Provider
      value={{ filterArray, transactions, setSortedTransactions, sortByDate }}
    >
      <div className={styles.container}>
        <div className={styles.containerInner}>
          <SearchInput />
          <FiltersContainer />
          {sortedTransactions?.map((sortedTransaction, index) => (
            <TransactionsContainer
              date={sortedTransaction[0]}
              transaction={sortedTransaction[1]}
              key={index}
            />
          ))}
        </div>
      </div>
    </TransactionsContext.Provider>
  );
};

export default Home;
