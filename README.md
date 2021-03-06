## Content

1. Fetching transactions
2. Sorting each transactions by date
3. Search Container
4. Filters

## Fetching transactions

- We use our Appllo Client to make a request to our mock GraphQl Api,

- We store the transactions with set state

- After we sort 'this' transactions and we group transactions having the same dates together, then we store with set state which in turn is mapped and the lists of transactions is displayed

- The task doesn't mention if the transactions are retured in an

      * orderly fashion eg. 7-11-2022 -> 7-12-2022 -> 7-13-2022 -> 7-14-2022

      * or are scattered eg. 7-13-202 -> 7-11-2022 -> 7-14-2022 -> 7-12-2022

      * So we assume the response from the api in an orderly fashion.

## Sorting each transaction by date

- We created a function called sortByDate, in this function, we pass an array of transactions as a parameter

- Then we call a reduce() method which executes a reducer function for the array element
  we then have 2 callbacks

       * accumulator

       * transaction

- We use accumulator to group arrays with same date together, using each date as a key so each array has a title of a date, stick with me

       * Now in the function, we call accumulator[key], key being date, eg. accumulator[7-12-2022] it either return the array with the title `7-12-2022`, if the date doesn't exit we just use an empty array instead.

       * So with this we can collate transactions with same dates together.

## Search Container

- A key feature that would make user experience better is adding a drop down so as a user can specify what they are searching for eg.

       * either searching by name
       * searching by currency
       * or transaction status

- A user can either type `credit` or `pending`, we cannot really differentiate if `pending` is someone's name or a user is trying to find pending transactions. So this is what I did

       * In the search container, i created an object, this object consists of an id, string, raw

       * id is the unique identifier for the object
       * string is all the properties of that transaction passed in a string form eg. `USD $ 2000 credit Teslim Akinremi completed`
       * raw is the transaction in its unfiltered form.

- So this what happens

      * when a user inputs `credit`, `amount` or even `transaction status`, we check our array of strings,
      * we check if it's in the string, if true, we return the raw form, then we push this result into an array, call the `sortByDate` function
      * this function sorts our `filtered` transactions by date and we display to the client

## Filters

- We created a function that consists of a switch statement, we are able to detect the type of filter that is passing through the function

- If the user click on the credit filter, it goes to our function then check which function is available to the credit filter then calls the function and return our data to the client

- Now we have the following filter functions

      * filterByType -- called when either credit or debit filters are clicked

      * filterByStatus -- called when either pending,canceled or completed filters are clicked

      * filterByCurrency -- called when either USD or NGN filters are clicked
