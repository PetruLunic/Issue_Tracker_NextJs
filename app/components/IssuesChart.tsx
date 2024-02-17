"use client";

import {Bar} from "react-chartjs-2";
import {StatusProperty, StatusText} from "@/app/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
);

interface Props{
  issuesCount: {
    open: number;
    inProgress: number;
    closed: number;
  }
}

const labels = [StatusText.OPEN, StatusText.IN_PROGRESS, StatusText.CLOSED];

export default function IssuesChart({issuesCount}: Props){

  const data = {
    labels,
    datasets: [
      {
        label: "Number",
        data: Object.values(issuesCount),
        backgroundColor: 'rgba(53, 162, 235, 0.8)'
      }
    ]
  }

 return (
  <Bar data={data} options={{responsive: true}}/>
 );
};