import { Transactions } from "../../../pages";

// A function used to sort the transactions by date
export const sortByDate = (data: Transactions[]) => {
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

// A function used to filter the transactions by type e.g "debit" or "credit"
export const filterByType = (type: string, transactions: Transactions[]) => {
  let filteredTransactions = [];
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === type) {
      filteredTransactions.push(transactions[i]);
    }
  }

  // then we sort the filtered transactions by date
  return sortByDate(filteredTransactions);
};

// A function used to filter the transactions by status e.g "completed","pending" or "canceled"
export const filterByStatus = (
  status: string,
  transactions: Transactions[]
) => {
  let filteredTransactions = [];
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].status === status) {
      filteredTransactions.push(transactions[i]);
    }
  }

  // then we sort the filtered transactions by date
  return sortByDate(filteredTransactions);
};

// A function used to filter the transactions by status e.g "completed","pending" or "canceled"
export const filterByCurrency = (
  currency: string,
  transactions: Transactions[]
) => {
  let filteredTransactions = [];
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].currency === currency.toUpperCase()) {
      filteredTransactions.push(transactions[i]);
    }
  }

  // then we sort the filtered transactions by date
  return sortByDate(filteredTransactions);
};
