import React from "react";
import { Chart as ChartJS,  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Color,} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,

  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

interface data {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: Color;
    backgroundColor: Color;
    yAxisId: string;
    tension: number;
  }[];
}

export const MultiaxisLineChart: React.FC<data> = (data) => {
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
      <Line options={options} data={data} />
    </Box>
  );
};
