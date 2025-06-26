import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const lineData = [
  { date: "1 Sep", Envelope: 1000, Pen: 2400, Notebooks: 2400 },
  { date: "5 Sep", Envelope: 3000, Pen: 1398, Notebooks: 2210 },
  { date: "10 Sep", Envelope: 2000, Pen: 9800, Notebooks: 2290 },
  { date: "15 Sep", Envelope: 2780, Pen: 3908, Notebooks: 2000 },
  { date: "20 Sep", Envelope: 1890, Pen: 4800, Notebooks: 2181 },
  { date: "25 Sep", Envelope: 2390, Pen: 3800, Notebooks: 2500 },
  { date: "30 Sep", Envelope: 3490, Pen: 4300, Notebooks: 2100 },
];

export default function SalesLineChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="95%" height="100%">
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Envelope" stroke="#8884d8" />
          <Line type="monotone" dataKey="Pen" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Notebooks" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
