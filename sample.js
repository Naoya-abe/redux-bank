console.clear();

// Action Creator
const depositMoney = (name, amount) => {
  return {
    // Action
    type: "DEPOSIT_MONEY",
    payload: {
      name,
      depositAmount: amount,
    },
  };
};

const withdrawMoney = (name, amount) => {
  return {
    type: "WITHDRAW_MONEY",
    payload: {
      name,
      withdrawAmount: amount,
    },
  };
};

const deleteAccount = name => {
  return {
    type: "DELETE_ACCOUNT",
    payload: {
      name,
    },
  };
};

// Reducers
const tradingRecord = (listOfTrading = [], action) => {
  switch (action.type) {
    case "DEPOSIT_MONEY":
    case "WITHDRAW_MONEY":
      return [...listOfTrading, action.payload];
      break;
  }

  return listOfTrading;
};

const allBalance = (sumOfBalance = 10000, action) => {
  switch (action.type) {
    case "DEPOSIT_MONEY":
      return sumOfBalance + action.payload.depositAmount;
      break;

    case "WITHDRAW_MONEY":
      return sumOfBalance - action.payload.withdrawAmount;
      break;
  }

  return sumOfBalance;
};

const account = (listOfAccount = [], action) => {
  switch (action.type) {
    case "DEPOSIT_MONEY":
      const response = listOfAccount.find(
        account => account === action.payload.name
      );
      if (response) {
        break;
      } else {
        return [...listOfAccount, action.payload.name];
      }

    case "DELETE_ACCOUNT":
      return listOfAccount.filter(account => account !== action.payload.name);
      break;
  }

  return listOfAccount;
};

// Store
const {createStore, combineReducers} = Redux;

const ourDepartments = combineReducers({
  tradingRecord: tradingRecord,
  allBalance: allBalance,
  account: account,
});

const store = createStore(ourDepartments);

store.dispatch(depositMoney("Tonpei", 3000));
store.dispatch(withdrawMoney("Tonpei", 1000));
store.dispatch(depositMoney("Shisho", 10000));
store.dispatch(deleteAccount("Tonpei"));

console.log(store.getState());
