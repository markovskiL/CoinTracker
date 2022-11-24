import { emptyUser, userContextProps } from "./UserDataContext";

type ActionTypes =
  | "SIGN-IN"
  | "SIGN-IN-SUCCESS"
  | "SIGN-UP"
  | "SIGN-UP-SUCCESS"
  | "SIGN-OUT"
  | "SET-USERNAME"
  | "SET-PASSWORD"
  | "UPDATE-EXPENSES"
  | "UPDATE-INCOMES"
  | "INCREMENT-ENTRIES-COUNT"
  | "TOGGLE-ADD-ENTRY-MODAL"
  | "ADD-ENTRY"
  | "ENABLE-ADDING-ENTRIES"
  | "DISABLE-ADDING-ENTRIES"
  | "SET-UPDATING-ENTRY-INDEX"
  | "DISABLE-UPDATING-ENTRY"
  | "UPDATE-ENTRY"
  | "TOGGLE-CONTEXT-MENU"
  | "SET-DELETE-ENTRY-CONFIRMATION"
  | "SET-DUPLICATE-ENTRY-INDEX"
  | "TOGGLE-CATEGORY-MODAL"
  | "ADD-INCOME-CATEGORY"
  | "ADD-EXPENSE-CATEGORY"
  | "INCREMENT-CATEGORIES-COUNT"
  | "SET-UPDATING-CATEGORY"
  | "DISABLE-UPDATING-CATEGORY"
  | "UPDATING-CATEGORY-FINISHED"
  | "UPDATE-SAVED-USER"
  | "SET-AVATAR-URL";

interface actionInterface {
  type: ActionTypes;
  payload?: any;
}
function updateUserReducer(
  state: userContextProps,
  action: actionInterface
): userContextProps {
  switch (action.type) {
    case "SIGN-UP": {
      return {
        ...state,
        redirectToWizardEnabled: true,
      };
    }
    case "SIGN-UP-SUCCESS": {
      return {
        ...state,
        signedIn: true,
        redirectToWizardEnabled: false,
      };
    }
    case "SIGN-IN-SUCCESS": {
      return {
        ...state,
        signedIn: true,
      };
    }
    case "SIGN-OUT": {
      return {
        ...emptyUser,
      };
    }
    case "SET-USERNAME": {
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
      };
    }
    case "SET-PASSWORD": {
      return {
        ...state,
        user: {
          ...state.user,
          password: action.payload,
        },
      };
    }
    case "UPDATE-EXPENSES": {
      return {
        ...state,
        user: {
          ...state.user,
          expenses: action.payload,
        },
      };
    }
    case "UPDATE-INCOMES": {
      return {
        ...state,
        user: {
          ...state.user,
          incomes: action.payload,
        },
      };
    }
    case "INCREMENT-ENTRIES-COUNT": {
      return {
        ...state,
        entriesChangesCount: state.entriesChangesCount + 1,
      };
    }
    case "TOGGLE-ADD-ENTRY-MODAL": {
      return {
        ...state,
        addEntryModalEnabled: !state.addEntryModalEnabled,
      };
    }
    case "ADD-ENTRY": {
      return {
        ...state,
        user: {
          ...state.user,
          entries: [action.payload, ...state.user.entries],
        },
      };
    }
    case "ENABLE-ADDING-ENTRIES": {
      return {
        ...state,
        addingEntriesEnabled: true,
      };
    }
    case "DISABLE-ADDING-ENTRIES": {
      return {
        ...state,
        addingEntriesEnabled: false,
      };
    }
    case "SET-UPDATING-ENTRY-INDEX": {
      return {
        ...state,
        updatingEntryIndex: action.payload,
      };
    }
    case "DISABLE-UPDATING-ENTRY": {
      return {
        ...state,
        updatingEntryIndex: null,
        updatingEntryEnabled: false,
        updatedEntry: null,
      };
    }
    case "UPDATE-ENTRY": {
      const updatedEntry = action.payload.updatedEntry;
      return {
        ...state,
        updatingEntryEnabled: true,
        updatedEntry: updatedEntry,
      };
    }
    case "TOGGLE-CONTEXT-MENU": {
      return {
        ...state,
        contextMenuOpen: !state.contextMenuOpen,
      };
    }
    case "SET-DELETE-ENTRY-CONFIRMATION": {
      const payload = action.payload;
      return {
        ...state,
        deleteEntryConfirmation: {
          show: payload.show,
          index: payload.index,
          confirmed: payload.confirmed,
        },
      };
    }
    case "SET-DUPLICATE-ENTRY-INDEX": {
      return {
        ...state,
        duplicateEntryIndex: action.payload,
      };
    }
    case "TOGGLE-CATEGORY-MODAL": {
      return {
        ...state,
        categoryModalEnabled: !state.categoryModalEnabled,
      };
    }
    case "ADD-INCOME-CATEGORY": {
      return {
        ...state,
        addCategoryEnabled: true,
        user: {
          ...state.user,
          incomes: [action.payload, ...state.user.incomes],
        },
      };
    }
    case "ADD-EXPENSE-CATEGORY": {
      return {
        ...state,
        addCategoryEnabled: true,
        user: {
          ...state.user,
          expenses: [action.payload, ...state.user.expenses],
        },
      };
    }
    case "INCREMENT-CATEGORIES-COUNT": {
      return {
        ...state,
        categoryChangesCount: state.categoryChangesCount + 1,
      };
    }
    case "SET-UPDATING-CATEGORY": {
      return {
        ...state,
        updatingCategory: { id: action.payload.id, type: action.payload.type },
      };
    }
    case "DISABLE-UPDATING-CATEGORY": {
      return {
        ...state,
        updatingCategory: null,
      };
    }
    case "UPDATING-CATEGORY-FINISHED": {
      return {
        ...state,
        updatingCategoryFinished: true,
      };
    }
    case "UPDATE-SAVED-USER": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "SET-AVATAR-URL": {
      return {
        ...state,
        user: {
          ...state.user,
          avatarURL: action.payload,
        },
      };
    }
  }

  return state;
}

export default updateUserReducer;
