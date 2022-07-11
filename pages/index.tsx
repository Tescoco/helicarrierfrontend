import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { TransactionsContext } from "../utils/context/TransactionsContext";
import SearchInput from "@Inputs/SearchInput";
import TransactionsContainer from "@Transactions/TransactionsContainer";
import FiltersContainer from "@FiltersContainer/FiltersContainer";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  filterByCurrency,
  filterByStatus,
  filterByType,
  sortByDate,
} from "@Functions/filters";
import { GET_TRANSACTIONS } from "@Querys/transactions";

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
  // create apollo client
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    cache: new InMemoryCache(),
  });

  //set states
  const [sortedTransactions, setSortedTransactions] =
    useState<SortedTransactions>([]);
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  // when the component is mounted, we fetch the transactions
  useEffect(() => {
    client
      .query({
        query: GET_TRANSACTIONS,
        variables: { limit: 3 },
      })
      .then((result) => {
        setTransactions(result.data.allTransactions);
        setSortedTransactions(sortByDate(result.data.allTransactions));
      });
  }, []);

  // A function used by filters to sort out transaction based on the type of filter
  const filterArray = (filter: string) => {
    switch (filter) {
      // fetches all transactions
      case "all":
        setSortedTransactions(sortByDate(transactions));
        break;
      // picks filters that are that are "debit" or "credit" and assign them the function filterByType()
      case "credit":
      case "debit":
        setSortedTransactions(filterByType(filter, transactions));
        break;
      // picks filters that are "completed" "pending" or "canceled" and assign them the function filterByStatus()
      case "completed":
      case "pending":
      case "canceled":
        setSortedTransactions(filterByStatus(filter, transactions));
        break;
      // picks filters that are "usd" or "ngn" and assign them the function filterByCurrency()
      case "usd":
      case "ngn":
        setSortedTransactions(filterByCurrency(filter, transactions));
        break;
    }
  };

  return (
    // we use the transactionscontext to pass the filterArray function to the filters
    // so that the filters can call it to filter the transactions

    // we use the transactionscontext to pass the transactions to the SearchInput container
    // so that the SearchInput can call it to search for transactions

    // we use the transactionscontext to pass setSortedTransactions to SearchInput container
    // so we can update the transactions when the user searches for a transaction

    <TransactionsContext.Provider
      value={{ filterArray, transactions, setSortedTransactions }}
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
