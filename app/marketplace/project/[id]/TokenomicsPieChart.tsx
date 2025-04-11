"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TokenDistribution {
  category: string;
  percentage: number;
}

const COLORS = [
  "#3B82F6", // Public Sale - Blue
  "#8B5CF6", // Team & Advisors - Purple
  "#F59E0B", // Foundation - Amber
  "#10B981", // Ecosystem Growth - Green
  "#06B6D4", // Strategic Partners - Cyan
  "#E11D48", // Others - Rose
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { category, percentage } = payload[0].payload;
    return (
      <div className="bg-gray-800 text-white p-2 rounded-md shadow-lg text-sm">
        <p>{category}</p>
        <p className="text-blue-400">{percentage}%</p>
      </div>
    );
  }

  return null;
};

export default function TokenomicsPieChart({
  data,
}: {
  data: TokenDistribution[];
}) {
  return (
    <div className="w-full mt-10 bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-inner space-y-2">
      {/* Chart */}
      <div className="h-[300px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="percentage"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#1F2937"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-gray-300">{entry.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
