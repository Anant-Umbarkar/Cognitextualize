import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';

// Forward ref here
const PieChartModule = React.forwardRef(({ data, chartLabel }, ref) => {
  const valueFormatter = (item) => `${item.value.toFixed(2)}%`;

  return (
    // Attach ref to main div
    <div ref={ref} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography style={{ fontWeight: "bold", color: "black" }}>
        {chartLabel}
      </Typography>
      <PieChart
        series={[
          {
            data: data,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'black' },
            valueFormatter
          },
        ]}
        height={200}
      />
      <br />
      <br />
      <br />
    </div>
  );
});

export default PieChartModule;
