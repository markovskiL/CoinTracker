import React, { ReactNode, createContext, useEffect, useReducer } from "react";
import { auth, db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

import { CategoryProps } from "../pages/WelcomeWizard/CategoriesList/CategoriesList";
import { EntryProps } from "../components/EntryItem/EntryItem";
import updateUserReducer from "./UserDataReducer";

const updateCategoryCurrentAmount = (
  state: userContextProps,
  entryType: "Expense" | "Income",
  entryId: string,
  entryAmount: number,
  action: "ADD" | "SUBTRACT"
) => {
  if (entryType === "Expense") {
    const expense = state.user.expenses.find(
      (expense) => expense.id === entryId
    );
    if (expense) {
      if (action === "ADD") {
        expense.current_amount += entryAmount;
      } else {
        expense.current_amount -= entryAmount;
      }
    }
  } else if (entryType === "Income") {
    const income = state.user.incomes.find((income) => income.id === entryId);
    if (income) {
      if (action === "ADD") {
        income.current_amount += entryAmount;
      } else {
        income.current_amount -= entryAmount;
      }
    }
  }
  return;
};
export interface userDataProps {
  username: string;
  password: string;
  expenses: CategoryProps[];
  incomes: CategoryProps[];
  entries: EntryProps[];
  avatarURL: string;
}
export interface userContextProps {
  user: userDataProps;
  redirectToOverviewEnabled: boolean;
  redirectToWizardEnabled: boolean;
  signedIn: boolean;
  entriesChangesCount: number;
  addEntryModalEnabled: boolean;
  addingEntriesEnabled: boolean;
  updatingEntryIndex: number | null;
  updatingEntryEnabled: boolean;
  updatedEntry: EntryProps | null;
  contextMenuOpen: boolean;
  deleteEntryConfirmation: {
    show: boolean;
    index: number | null;
    confirmed: boolean;
  };
  duplicateEntryIndex: number | null;
  categoryModalEnabled: boolean;
  categoryChangesCount: number;
  addCategoryEnabled: boolean;
  updatingCategory: null | { id: string; type: "Expense" | "Income" };
  updatingCategoryFinished: boolean;
}

export const emptyUser = {
  user: {
    username: "",
    password: "",
    expenses: [] as CategoryProps[],
    incomes: [] as CategoryProps[],
    entries: [] as EntryProps[],
    avatarURL: "",
  },
  redirectToOverviewEnabled: false,
  redirectToWizardEnabled: false,
  signedIn: false,
  entriesChangesCount: 0,
  addEntryModalEnabled: false,
  addingEntriesEnabled: false,
  updatingEntryIndex: null,
  updatingEntryEnabled: false,
  updatedEntry: null,
  contextMenuOpen: false,
  deleteEntryConfirmation: { show: false, index: null, confirmed: false },
  duplicateEntryIndex: null,
  categoryModalEnabled: false,
  categoryChangesCount: 0,
  addCategoryEnabled: false,
  updatingCategory: null,
  updatingCategoryFinished: false,
};

const initialState = emptyUser as userContextProps;

export const StateContext = createContext(initialState);

export const DispatchContext = createContext(null as any);

const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(updateUserReducer, initialState);
  const userId = auth.currentUser?.uid;
  
  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => data.results[0].picture.thumbnail)
      .then((data) => dispatch({ type: "SET-AVATAR-URL", payload: data }))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (state.addingEntriesEnabled && userId) {
      const entry = state.user.entries[0];
      const userRef = doc(db, "users", userId);

      updateCategoryCurrentAmount(
        state,
        entry.entry_type,
        entry.category_id,
        entry.amount,
        "ADD"
      );

      dispatch({ type: "DISABLE-ADDING-ENTRIES" });

      updateDoc(userRef, {
        ...state.user,
      }).catch(() => {
        alert("Error occurred");
        window.location.reload();
      });
    }
    // eslint-disable-next-line
  }, [state.entriesChangesCount]);

  useEffect(() => {
    if (
      state.updatingEntryEnabled &&
      state.updatingEntryIndex !== null &&
      state.updatedEntry &&
      userId
    ) {
      const index = state.updatingEntryIndex;
      const oldEntry = state.user.entries[index];
      const newEntry = state.updatedEntry;
      const userRef = doc(db, "users", userId);

      state.user.entries[index] = newEntry;

      updateCategoryCurrentAmount(
        state,
        oldEntry.entry_type,
        oldEntry.category_id,
        oldEntry.amount,
        "SUBTRACT"
      );
      updateCategoryCurrentAmount(
        state,
        newEntry.entry_type,
        newEntry.category_id,
        newEntry.amount,
        "ADD"
      );

      dispatch({ type: "DISABLE-UPDATING-ENTRY" });

      updateDoc(userRef, {
        ...state.user,
      }).catch(() => {
        alert("Error occurred");
        window.location.reload();
      });
    }
    // eslint-disable-next-line
  }, [state.updatingEntryEnabled]);

  useEffect(() => {
    const { index, confirmed } = state.deleteEntryConfirmation;
    if (index !== null && confirmed && userId) {
      const entry = state.user.entries[index];
      const initialState = { show: false, index: null, confirmed: false };
      const userRef = doc(db, "users", userId);

      state.user.entries.splice(index, 1);

      updateCategoryCurrentAmount(
        state,
        entry.entry_type,
        entry.category_id,
        entry.amount,
        "SUBTRACT"
      );

      dispatch({
        type: "SET-DELETE-ENTRY-CONFIRMATION",
        payload: initialState,
      });

      updateDoc(userRef, {
        ...state.user,
      }).catch(() => {
        alert("Error occurred");
        window.location.reload();
      });
    }
    // eslint-disable-next-line
  }, [state.deleteEntryConfirmation.confirmed]);

  useEffect(() => {
    if (state.addCategoryEnabled && userId) {
      const userRef = doc(db, "users", userId);

      updateDoc(userRef, {
        ...state.user,
      }).catch(() => {
        alert("Error occurred");

        updateDoc(userRef, {
          ...state.user,
        }).catch(() => {
          alert("Error occurred");
          window.location.reload();
        });
      });
    }
    // eslint-disable-next-line
  }, [state.addCategoryEnabled]);

  useEffect(() => {
    if (state.updatingCategoryFinished && userId) {
      const userRef = doc(db, "users", userId);

      updateDoc(userRef, {
        ...state.user,
      }).catch(() => {
        alert("Error occurred");
        window.location.reload();
      });
    }
    // eslint-disable-next-line
  }, [state.updatingCategoryFinished]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default UserContextProvider;
