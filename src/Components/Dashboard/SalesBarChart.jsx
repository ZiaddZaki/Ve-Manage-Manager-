import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const barData = [
  { date: "1 Sep", amount: 50000 },
  { date: "2 Sep", amount: 150000 },
  { date: "3 Sep", amount: 700000 },
  { date: "4 Sep", amount: 950000 },
  { date: "5 Sep", amount: 1000000 },
];

export default function SalesBarChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
