import { gql } from "@apollo/client";

// get all transactions query
export const GET_TRANSACTIONS = gql`
  {
    allTransactions {
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
