import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import BottomAppBar from "./AppBar/BottomAppBar";
import AddButtonsModal from "../../components/Modals/AddButtonsModal";
import TopAppBar from "./AppBar/TopAppBar";
import { DispatchContext, StateContext } from "../../contexts/UserDataContext";
import EntryModal from "../../components/Modals/EntryModal";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import CategoryModal from "../../components/Modals/CategoryModal";
import iconOptionNames from "../../data/iconOptions.json";
import { CategoryProps } from "../../pages/WelcomeWizard/CategoriesList/CategoriesList";

const MainLayout: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [showButtons, setShowButtons] = useState(false);
  const [buttonsModal, setButtonsModal] = useState(false);
  const [entryModal, setEntryModal] = useState<boolean>(
    state.addEntryModalEnabled
  );
  const [type, setType] = useState<"Expense" | "Income" | null>(null);
  const [updatingEntryIndex, setUpdatingEntryIndex] = useState(
    state.updatingEntryIndex
  );
  const [deleteConfirmation, setDeleteConfirmation] = useState(
    state.deleteEntryConfirmation
  );
  const [duplicateIndex, setDuplicateIndex] = useState(
    state.duplicateEntryIndex
  );
  const iconNames = iconOptionNames;
  const [categoryModal, setCategoryModal] = useState<boolean>(
    state.categoryModalEnabled
  );
  const [updatingCategory, setUpdatingCategory] =
    useState<null | CategoryProps>(null);

  const toggleShowButtonsModal = () => {
    if (entryModal) {
      dispatch({ type: "TOGGLE-ADD-ENTRY-MODAL" });
    }
    if (updatingEntryIndex !== null) {
      dispatch({ type: "DISABLE-UPDATING-ENTRY" });
    }
    if (duplicateIndex !== null) {
      dispatch({ type: "SET-DUPLICATE-ENTRY-INDEX", payload: null });
    }
    if (categoryModal) {
      dispatch({ type: "TOGGLE-CATEGORY-MODAL" });
    }
    if (updatingCategory !== null) {
      dispatch({ type: "DISABLE-UPDATING-CATEGORY" });
    }
    setButtonsModal(!buttonsModal);
    setTimeout(() => {
      // buttons transition to take effect
      setShowButtons(!showButtons);
    }, 1);
  };

  const openEntryModal = () => {
    setButtonsModal(false);
    setShowButtons(false);
    setTimeout(() => {
      dispatch({ type: "TOGGLE-ADD-ENTRY-MODAL" });
    }, 100);
  };

  const closeEntryModal = () => {
    dispatch({ type: "TOGGLE-ADD-ENTRY-MODAL" });
    setType(null);
  };

  const closeUpdateEntryModal = () => {
    dispatch({ type: "DISABLE-UPDATING-ENTRY" });
  };

  const closeCategoryModal = () => {
    dispatch({ type: "TOGGLE-CATEGORY-MODAL" });
  };

  const closeUpdateCategoryModal = () => {
    dispatch({ type: "DISABLE-UPDATING-CATEGORY" });
  };

  useEffect(() => {
    setUpdatingEntryIndex(state.updatingEntryIndex);
  }, [state.updatingEntryIndex]);

  useEffect(() => {
    setEntryModal(state.addEntryModalEnabled);
  }, [state.addEntryModalEnabled]);

  useEffect(() => {
    setDeleteConfirmation(state.deleteEntryConfirmation);
  }, [state.deleteEntryConfirmation.show, state.deleteEntryConfirmation]);

  useEffect(() => {
    setDuplicateIndex(state.duplicateEntryIndex);
  }, [state.duplicateEntryIndex]);

  useEffect(() => {
    setCategoryModal(state.categoryModalEnabled);
  }, [state.categoryModalEnabled]);

  useEffect(() => {
    const id = state.updatingCategory?.id;
    const type = state.updatingCategory?.type;
    if (id && type) {
      if (type === "Expense") {
        const category = state.user.expenses.find((cat) => cat.id === id);
        category && setUpdatingCategory(category);
      } else if (type === "Income") {
        const category = state.user.incomes.find((cat) => cat.id === id);
        category && setUpdatingCategory(category);
      }
    } else {
      setUpdatingCategory(null);
    }
    // eslint-disable-next-line
  }, [state.updatingCategory?.id]);

  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <TopAppBar />
      <Box sx={{ height: "65px" }}></Box>
      <Outlet />
      <BottomAppBar handleClick={toggleShowButtonsModal} />
      {buttonsModal && (
        <AddButtonsModal
          isMounted={buttonsModal}
          showButtons={showButtons}
          toggleEntryModal={openEntryModal}
          setEntryType={setType}
        />
      )}
      {entryModal && (
        <EntryModal
          isMounted={entryModal}
          action={{
            type: "ADD",
            index: duplicateIndex !== null ? duplicateIndex : null,
          }}
          handleClose={closeEntryModal}
          type={type}
        />
      )}
      {updatingEntryIndex !== null && (
        <EntryModal
          isMounted={true}
          handleClose={closeUpdateEntryModal}
          action={{ type: "UPDATE", index: updatingEntryIndex }}
        />
      )}
      {deleteConfirmation.show && deleteConfirmation.index !== null && (
        <ConfirmDialog />
      )}
      {categoryModal && (
        <CategoryModal
          actionType={"ADD"}
          handleClose={closeCategoryModal}
          iconNames={iconNames}
        />
      )}
      {updatingCategory !== null && (
        <CategoryModal
          actionType={{
            type: "UPDATE",
            updatingCategory: updatingCategory,
          }}
          handleClose={closeUpdateCategoryModal}
          iconNames={iconNames}
        />
      )}
    </Box>
  );
};

export default MainLayout;
