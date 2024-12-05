import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';

const valueFormatter = (item) => `${item.value.toFixed(2)}%`;

// present the pie chart
export default function PieChartModule({ data, chartLabel }) {
  console.log(data,chartLabel)
  return (
    // show the main div
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography style={{ fontWeight: "bold", color: "black" }}>
        {chartLabel}
      </Typography>
      <PieChart
        series={[
          {
            data: data,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'black' },
            valueFormatter // Example formatter
            // value:"5%"  
          },
        ]}
        height={200}
      />
      <br />
      <br />
      <br />
    </div>
  );
}
