console.clear();

//people dropping off a form
const createPolicy = (name, amount) => {
  return {
    type: 'CREATE_POLICY',
    payload: { name, amount }  
  };
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: { name }
  };
};

const createClaim = (name, amountToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: { name, amountToCollect }
  };
};

//Reducers
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    return [...oldListOfClaims, action.payload]
  }
  
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountToCollect;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }
  
  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter(name => name !== action.payload.name);
  }
  
  return listOfPolicies;
};

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Will', 60));
store.dispatch(createPolicy('Hannibal', 110));
store.dispatch(createPolicy('Jack', 33));
store.dispatch(createClaim('Will', 20));
store.dispatch(createClaim('BORT', 66));

store.dispatch(deletePolicy('Hannibal'));
console.log(store.getState());
