import { useState } from "react";
import BudgetContext from "./budget-context";

export default function BudgetContextProvider({ children }) {
  const [budget, setBudget] = useState(null)
  const context = { budget, setBudget}

  return <BudgetContext.Provider value= { context }>
    { children }
  </BudgetContext.Provider>
}