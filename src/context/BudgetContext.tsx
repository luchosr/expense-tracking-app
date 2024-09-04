import { createContext, useReducer } from 'react';
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from '../reducers/budget-reducer';

type BudgetContextProps = {
  state: BudgetState;
  dispatch: React.Dispatch<BudgetActions>;
};

type BudgetProviderProps = {
  children: React.ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};
