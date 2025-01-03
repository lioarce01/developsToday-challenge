"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PopulationCount {
  year: number;
  value: number;
}

interface PopulationChartProps {
  data: PopulationCount[];
}

export default function PopulationChart({ data }: PopulationChartProps) {
  const formatPopulation = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const sortedData = [...data].sort((a, b) => a.year - b.year);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={sortedData}
        margin={{
          top: 10,
          right: 30,
          left: 60,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="year"
          angle={-45}
          textAnchor="end"
          height={70}
          className="text-xs"
          tickFormatter={(year) => year.toString()}
        />
        <YAxis
          tickFormatter={formatPopulation}
          width={80}
          className="text-xs"
        />
        <Tooltip
          formatter={(value: number) => [formatPopulation(value), "Population"]}
          labelFormatter={(year) => `Year: ${year}`}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
