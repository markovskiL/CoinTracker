import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Color } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  indexAxis: "y" as const,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

interface data {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: Color;
    borderWidth: number;
    borderColor: Color;
  }[];
}

export const HorizontalBarChart: React.FC<data> = (data) => {
  return (
    <Box
      sx={{
        height: {
          xxs: "150px",
          xs: "200px",
          sm: "250px",
          md: "300px",
          xl: "350px",
        },
      }}
    >
      <Bar options={options} data={data} />
    </Box>
  );
};
