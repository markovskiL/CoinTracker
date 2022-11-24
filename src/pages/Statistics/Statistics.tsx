import React, { useContext } from "react";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import { HorizontalBarChart } from "../../components/HorizontalBarChart/HorizontalBarChart";
import { MultiaxisLineChart } from "../../components/MultiaxisLineChart/MultiaxisLineChart";
import { Stack } from "@mui/material";
import { StateContext } from "../../contexts/UserDataContext";

const Statistics: React.FC = () => {
  const state = useContext(StateContext);
  const today = new Date();
  const thisDay = today.getDate();
  const thisMonth = today.getMonth() + 1;
  const thisYear = today.getFullYear();

  const thisMonthEntries = state.user.entries.filter((entry) => {
    const entryDate = new Date(entry.date.split("/").reverse().join("/"));
    const entryDay = entryDate.getDate();
    const entryMonth = entryDate.getMonth() + 1;
    const entryYear = entryDate.getFullYear();
    if (
      entryDay <= thisDay &&
      entryMonth === thisMonth &&
      entryYear === thisYear
    ) {
      return entry;
    }
    return false;
  });
  const thisMonthIncomes = thisMonthEntries.filter(
    (entry) => entry.entry_type === "Income"
  );
  const thisMonthExpenses = thisMonthEntries.filter(
    (entry) => entry.entry_type === "Expense"
  );

  const enabledIncomes = state.user.incomes.filter(
    (income) => income.is_selected === true
  );
  const enabledExpenses = state.user.expenses.filter(
    (expense) => expense.is_selected === true
  );

  const incomeLabels = enabledIncomes.map((income) => income.category_name);
  const expenseLabels = enabledExpenses.map((expense) => expense.category_name);
  const getDatesLabels = () => {
    const arrayOfDaysUntilToday = Array.from(Array(thisDay).keys()).map(
      (day) => day + 1
    );
    const labels = arrayOfDaysUntilToday.map((day) => {
      const date = new Date(
        `${thisYear + "/" + thisMonth + "/" + day}`
      ).toLocaleDateString();
      return date;
    });
    return labels;
  };

  const incomesValues = enabledIncomes.map((income) => {
    const incomeValue = thisMonthIncomes.reduce((acc, curr) => {
      if (income.id === curr.category_id) {
        return (acc += curr.amount);
      } else {
        return acc;
      }
    }, 0);
    return incomeValue;
  });
  const expensesValues = enabledExpenses.map((expense) => {
    const expenseValue = thisMonthExpenses.reduce((acc, curr) => {
      if (expense.id === curr.category_id) {
        return (acc += curr.amount);
      } else {
        return acc;
      }
    }, 0);
    return expenseValue;
  });
  const getExpensesDateData = () => {
    const labels = getDatesLabels();
    const expensesValues = labels.map((label) => {
      const expense = thisMonthExpenses.reduce((acc, curr) => {
        if (label === curr.date) {
          return (acc += curr.amount);
        } else {
          return acc;
        }
      }, 0);
      return expense;
    });
    return expensesValues;
  };
  const getIncomesDateData = () => {
    const labels = getDatesLabels();
    const incomesValues = labels.map((label) => {
      const income = thisMonthIncomes.reduce((acc, curr) => {
        if (label === curr.date) {
          return (acc += curr.amount);
        } else {
          return acc;
        }
      }, 0);
      return income;
    });
    return incomesValues;
  };
  const incomesData = {
    labels: incomeLabels,
    datasets: [
      {
        label: "Monthly Incomes",
        data: incomesValues,
        backgroundColor: "rgba(39, 245, 108, 0.2)",
        borderWidth: 2,
        borderColor: "rgba(39, 245, 108, 0.7)",
      },
    ],
  };

  const expensesData = {
    labels: expenseLabels,
    datasets: [
      {
        label: "Monthly Expenses",
        data: expensesValues,
        backgroundColor: "rgba(248, 206, 206, 0.5)",
        borderWidth: 2,
        borderColor: "rgba(206, 120, 120, 0.84)",
      },
    ],
  };

  const incomesAndExpensesData = {
    labels: getDatesLabels(),
    datasets: [
      {
        label: "Expenses",
        data: getExpensesDateData(),
        borderColor: "rgba(206, 120, 120, 0.84)",
        backgroundColor: "rgba(248, 206, 206, 0.5)",
        yAxisId: "y",
        tension: 0.3,
      },
      {
        label: "Incomes",
        data: getIncomesDateData(),
        borderColor: "rgba(39, 245, 108, 0.7)",
        backgroundColor: "rgba(39, 245, 108, 0.2)",
        yAxisId: "y2",
        tension: 0.3,
      },
    ],
  };

  return (
    <Stack alignItems={"center"} paddingBottom={"5rem"}>
      <ContentContainer title={"Incomes"}>
        <HorizontalBarChart {...incomesData} />
      </ContentContainer>

      <ContentContainer title={"Expenses"}>
        <HorizontalBarChart {...expensesData} />
      </ContentContainer>

      <ContentContainer title="Expenses & Incomes">
        <MultiaxisLineChart {...incomesAndExpensesData} />
      </ContentContainer>
    </Stack>
  );
};

export default Statistics;
